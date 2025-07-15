import { toast } from "react-toastify";

export const showError=(message)=>{
    toast.error(message);
}
export const showSuccess=(message)=>{
    toast.success(message);
}


export const API_URL = 'http://localhost:8080';