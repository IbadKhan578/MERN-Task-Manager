const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        TaskName:{
            type:String,
            require:true
        },
        isDone:{
            type:Boolean,
            require:true,
            default:false
        }

    })

    const todos = mongoose.model('todos',TaskSchema);
    module.exports = todos;