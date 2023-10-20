import { Todo } from "../models/todo.js";

export function getAllUserTodo(){
    return Todo.find().populate("date","task");
}

export function addNewTodo(req){
    return new Todo({...req.body}).save();
}

export function updatedNotes(req){
    return Todo.findoneAndUpdate(
        {_id:req.params.id},{$set:req.body},{new:true}
    )
}
export function deleteNotes(req){
    return Todo.findOneAndDelete({_id:req.params.id});
}
