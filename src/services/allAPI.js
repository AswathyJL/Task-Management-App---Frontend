import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// registerAPI - called by auth component
export const registerAPI = async (reqbody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqbody)
}

// loginAPI called by Auth component when user click login btn
export const loginAPI = async (reqbody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqbody)
}

// allTaskAPI called by allTasks Component when page loaded in browser
export const allTaskAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-tasks?search=${searchKey}`,{},reqHeader)
}

// addTaskAPI - called by addTask component
export const addTaskAPI = async (reqbody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-task`,reqbody,reqHeader)
}

// editTaskAPI - called by taskCard component
export const editTaskAPI = async (id,reqbody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/task/${id}/edit`,reqbody,reqHeader)
}

// removeTaskAPI - called by taskCard component
export const removeTaskAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/task/${id}/remove`,{},reqHeader)
}

