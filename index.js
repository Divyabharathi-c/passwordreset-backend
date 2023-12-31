import express from 'express';
import dotenv from 'dotenv';    
import cors from 'cors';    
import { databaseConnection } from './db.js';
import { userRouter } from './routers/userroute.js';
import { todoRouter } from './routers/todoroute.js';
import { isAuth } from './middleware/auth.js';
import { resetroute } from './routers/forgetroute.js';

dotenv.config();
const app=express();
const PORT=process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//dbconnect
databaseConnection();

//routes
app.use('/',userRouter);
app.use('/todo',isAuth,todoRouter);
app.use('/repass', resetroute)

//listen port
app.listen(PORT,()=>{console.log('Server running in port',PORT);})