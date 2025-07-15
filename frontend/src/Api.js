import { API_URL } from "./Utils"


export const createTask= async(obj)=>{
    const url = `${API_URL}/task`;
    const options={
        method:'Post',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(obj)
    }

    try {
        let response = await fetch(url,options);
        let data = await response.json();
        return data;

        
    } catch (error) {
        return error;
        
    }

}



export const fetchTasks= async()=>{
    const url = `${API_URL}/task`;
    const options={
        method:'GET',
        headers:{
            'content-type':'application/json'
        }
    }

    try {
        let response = await fetch(url,options);
        let data = await response.json();
        return data;

        
    } catch (error) {
        return error;
        
    }

}
export const DeleteTasksById= async(id)=>{
    const url = `${API_URL}/task/${id}`;
    const options={
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        }
    }

    try {
        let response = await fetch(url,options);
        let data = await response.json();
        return data;

        
    } catch (error) {
        return error;
        
    }

}
export const updateTasksById= async(id,reqbody)=>{
    const url = `${API_URL}/task/${id}`;
    const options={
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(reqbody)
    }

    try {
        let response = await fetch(url,options);
        let data = await response.json();
        return data;

        
    } catch (error) {
        return error;
        
    }

}