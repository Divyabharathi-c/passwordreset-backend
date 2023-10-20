import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
    task: { type: String, required: true },
    date: { type: String, required: true },
});

const Todo=mongoose.model("Todo",todoSchema);
export  { Todo };