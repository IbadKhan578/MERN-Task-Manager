import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";
import { ToastContainer } from "react-toastify";
import {
  createTask,
  DeleteTasksById,
  fetchTasks,
  updateTasksById,
} from "./Api";
import { showError, showSuccess } from "./Utils";

const TaskManager = () => {
  const [input, setInput] = useState();
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);
  const [searchTerm,setSearchTerm]= useState('');

   let handleSearch=(value)=>{
    setSearchTerm(value);
    console.log(searchTerm);
    
    
    if(value===''){
      setTasks(copyTasks);
    }else{
      const filtered = copyTasks.filter((task)=>
         task.TaskName.toLowerCase().includes(value.toLowerCase()) ) ;
          setTasks(filtered);

    }

  }

  let handleUpdateItem= async()=>{
    const obj = {
      _id:updateTask._id,
      TaskName:input,
      isDone:updateTask.isDone
    };
    try {
      let { message, success } = await updateTasksById(updateTask._id, obj);
      if (success) {
        fetchAllTasks();
        showSuccess(message);
        setInput('');
        setUpdateTask(null);
      } else {
        showError(message);
      }
    } catch (error) {
      console.error(error);
    }



  }

 

  let handleTask = () => {
    if (updateTask && input) {
      // update api call
      handleUpdateItem(updateTask);
      console.log("update api call");
    } else if (!updateTask && input) {
      // post/ create  api call
      console.log("create api call");
      handleAddTask();
    }
  };

  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.TaskName);
    }
  }, [updateTask]);

  let handleAddTask = async () => {
    let obj = {
      TaskName: input,
      isDone: false,
    };

    try {
      if (!input) {
        showError("Please write task to add");
        return;
      }
      let { message, success } = await createTask(obj);

      if (success) {
        fetchAllTasks();
        showSuccess(message);
        setInput("");
      } else {
        showError(message);
      }
    } catch (error) {
      console.error(error);
      showError("Failed to create task");
    }
  };
  const fetchAllTasks = async () => {
    try {
      let { data } = await fetchTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (error) {
      console.error(error);
      showError("Failed to create task");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      let { message, success } = await DeleteTasksById(id);
      if (success) {
        setTasks(tasks.filter((task) => task._id !== id));
        setCopyTasks(copyTasks.filter((task) => task._id !== id));

        showSuccess(message);
      } else {
        showError(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = async (item) => {
    const { _id, TaskName, isDone } = item;
    const obj = {
      _id,
      TaskName,
      isDone: !isDone,
    };
    try {
      let { message, success } = await updateTasksById(_id, obj);
      if (success) {
        fetchAllTasks();
        showSuccess(message);
      } else {
        showError(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>📝 Task Manager App</h1>

      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add new task..."
        />
        <button onClick={handleTask}>
          <FaPlus />
        </button>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input  value={searchTerm}
          onChange={(e)=> handleSearch(e.target.value)}
           type="text" placeholder="Search tasks..." />
        </div>
      </div>

      <ul className="task-list">
       



        {   
         tasks.length>0 ? (
        tasks.map((item) => {
          return (
            <li>
              <span className={`task-text ${item.isDone ? "decoration" : ""}`}>
                {item.TaskName}
              </span>
              <div className="actions">
                <button className="check-btn" onClick={() => handleCheck(item)}>
                  <FaCheck />
                </button>
                <button onClick={() => setUpdateTask(item)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
          ); 
        })  ): (
          <>
          <p>No task found  <b>{searchTerm} </b>    </p>
          </>

        )  }
      </ul>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TaskManager;
