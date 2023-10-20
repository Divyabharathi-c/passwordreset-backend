import express, { Router, json } from 'express';
import bcrypt from 'bcrypt';
import { generateToken, getUserMail } from "../controller/usercontroler.js";
import { User } from '../models/user.js';
import { addNewTodo, deleteNotes, getAllUserTodo, updatedNotes } from '../controller/todocontroller.js';

const route=express.Router();

//getall todo
route.get('/all',async (req,res)=>{
    try {
        const todo=await getAllUserTodo();

        if(!todo || todo.length <= 0){
            return res.status(404).json({error:'No Content available'});
        }
        res.status(200).json({data:todo});
    } catch (error) {
        console.log(error);res.status(500).json({error:'Internal server error'})
    }
});
//new todo
route.post('/user/add',async (req,res)=>{
    try {
        const newPost= await addNewTodo(req);
        if(!newPost){
            return res.status(400).json({
                error:'Error Occured while Adding'
            });
        }
        res.status(201).json({message:'Added Done',data:newPost})
    } catch (error) {
        console.log(error);res.status(500).json({error:'Internal server error'});       
    }
});
//edit todo
route.put('/user/edit/:id',async (req,res)=>{
    try {
        const editedNotes = await updatedNotes(req);
        if(!editedNotes){
            return res.status(400).json({
                error:'Error Occured while Adding'
            });
        }
        res.status(201).json({message:'Updating Done',data:editedNotes})
    } catch (error) {
        console.log(error);res.status(500).json({error:'Internal server error'});        
    }
});
//delete todo
route.delete('/user/delete/:id',async (req,res)=>{
    try {
        const delnotes = await deleteNotes(req);
        if(!delnotes){
            return res.status(400).json({
                error:'Error Occured while Deleting'
            });
        }
        res.status(201).json({message:'Deleted Done'});
    } catch (error) {
        console.log(error);res.status(500).json({error:'Internal server error'});
    }
});

export const todoRouter=route;