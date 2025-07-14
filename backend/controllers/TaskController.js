const todos = require("../Models/TaskModel");


const createTask = async(req,res)=>{
    let data = req.body;
    try {

        const model = new todos(data);
        await model.save();
        res.status(200).json({message:'Task is created' , success:true})
        
    } catch (error) {
        res.status(500).json({  message:'Failed to Create task', success:false   })
        
    }
}
const fetchAllTask = async(req,res)=>{
    try {

        const data = await  todos.find({});
        res.status(200).json({message:'All tasks' , success:true,data})
        
    } catch (error) {
        res.status(500).json({  message:'Failed fetch task', success:false   })
        
    }
}

module.exports = {
    createTask,
    fetchAllTask
}