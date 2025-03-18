import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
/*import { Router } from 'express';
import aiRoutes from './routes/ai.routes.js';*/
connect();
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import projectRoutes from './routes/project.routes.js';
const app = express();

app.use(cors());
app.use (morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/users', userRoutes); /*
app.use('/api/users' , userRoutes);*/


app.use('/projects', projectRoutes);      /*
app.use("/ai", aiRoutes)*/
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/', (req, res) => {
    res.json({ message: "POST request received!" }); // Handles POST requests
});
export default app;
