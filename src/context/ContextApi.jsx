import React, { createContext, useState } from 'react'
export const addTaskResponseContext = createContext()
export const editTaskResponseContext = createContext()
export const removeTaskResponseContext = createContext()

const ContextApi = ({children}) => {
    const [addTaskResponse, setAddTaskResponse] = useState("")
    const [editTaskResponse, setEditTaskResponse] = useState("")
    const [removeTaskResponse, setRemoveTaskResponse] = useState("")
  return (
    <removeTaskResponseContext.Provider value={{removeTaskResponse, setRemoveTaskResponse}}>
        <editTaskResponseContext.Provider value={{editTaskResponse, setEditTaskResponse}}>
            <addTaskResponseContext.Provider value={{addTaskResponse, setAddTaskResponse}}>
                {children}
            </addTaskResponseContext.Provider>
        </editTaskResponseContext.Provider>
    </removeTaskResponseContext.Provider>
  )
}

export default ContextApi