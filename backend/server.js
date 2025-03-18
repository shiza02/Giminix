import 'dotenv/config.js'; 
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
        const projectId = socket.handshake.query.projectId;
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }
        socket.project = await projectModel.findById(projectId);        
        if (!token) {
            return next(new Error('Authentication error'))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new Error('Authentication error'))
        }
        socket.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
})
io.on('connection', socket => {

    console.log('a user connected');  
    socket.join(socket.roomId); 

    socket.on('project-message', async data => {
        console.log(data)
        socket.broadcast.to(socket.project._id).emit('project_message', data)})

        socket.on('disconnect',()=> {
            console.log('a user disconnected');
            socket.leave(socket.roomId)
        });
            
});

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);

})
