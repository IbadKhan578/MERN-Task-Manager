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

const deleteTask= async (req,res)=>{
    const {id} = req.params;
    try {
        const deletedTask = await  todos.findByIdAndDelete(id);

    if(!deletedTask){
        return res.status(400).json({message:"failed to delete task", success:false})
    }else{
                return res.status(200).json({message:"task deleted successfully ", success:true})

    }



        
    } catch (error) {
        console.error(error);
        res.status(500).json({
      success: false,
      message: 'Server error while deleting task',
    });



    }
}
    const  updateTask =async(req,res)=>{
        const {id} = req.params;
        const {TaskName, isDone} = req.body;
        try {
            const updatedTask = await todos.findByIdAndUpdate(
                id,
                {TaskName,isDone},
                {new:true}

            )
            if (!updatedTask) {
      return res.status(400).json({
        success: false,
        message: 'Task not found',
      });
    }else{
        return res.status(201)
        .json({
            message:"Task updated successfully",
             success:true});
    }

            
            
        } catch (error) {
            console.error(error);
             return res.status(404)
        .json({
            message:"server error while updating task",
             success:false});


            
        }




    }





module.exports = {
    createTask,
    fetchAllTask,
    deleteTask,
    updateTask
}