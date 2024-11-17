import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import TaskCard from '../components/TaskCard'
import AddTask from '../components/AddTask'
import { addTaskResponseContext, editTaskResponseContext, removeTaskResponseContext } from '../context/ContextApi'
import { allTaskAPI } from '../services/allAPI'


const AllTask = () => {
  const {editTaskResponse, setEditTaskResponse} = useContext(editTaskResponseContext)
  const {removeTaskResponse, setRemoveTaskResponse} = useContext(removeTaskResponseContext)
  const {addTaskResponse, setAddTaskResponse} = useContext(addTaskResponseContext)

  const [searchKey,setSearchKey] = useState("")
  const [username,setUsername]= useState("")

  // pagination states and variables
  const [userTasks,setUserTasks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 6
  const totalPage = Math.ceil(userTasks?.length/cardsPerPage)
  const currentPageLastTaskIndex = currentPage * cardsPerPage
  const currentPageFirstTaskIndex = currentPageLastTaskIndex - cardsPerPage
  const visibleTaskCards = userTasks?.slice(currentPageFirstTaskIndex,currentPageLastTaskIndex)

  useEffect(()=>{
    
    if(sessionStorage.getItem("user")){
      setUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
    }
    else setUsername("")
  },[])

  useEffect(()=>{
    getUserTasks()
  },[addTaskResponse, removeTaskResponse, editTaskResponse, searchKey])

  // function to get user tasks
  const getUserTasks =  async() =>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeaders = {
        "Authorization" : `Bearer ${token}`
      }
      try {
        const result = await allTaskAPI(searchKey,reqHeaders)
        console.log(result);
        if(result.status == 200)
        {
          setUserTasks(result.data)
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }
  }

  // pagination - funtion to get next page
  const navigateToNextPage = ()=>{
    if(currentPage!= totalPage)
    {
        setCurrentPage(currentPage+1)
    }
  }

  // pagination - funtion to get current page
  const navigateToCurrentPage = (page) => {
    setCurrentPage(page)
  }

  // pagination - funtion to get previous page
  const navigateToPreviousPage = ()=>{
    if(currentPage!= 1)
    {
        setCurrentPage(currentPage-1)
    }
  }

  return (
    <div className='px-5'>
        <div style={{paddingTop:'150px'}} className="d-flex justify-content-between align-items-center">
          <h1 className='text-primary'>Welcome {username}</h1>
          <input onChange={e=>setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='Search Tasks...' />
          <AddTask/>
        </div>
        <Row className='mt-3'>
          {
            userTasks?.length>0 ?
              visibleTaskCards?.map(task=>(
                <Col key={task?._id} className='mb-3' sm={12} md={6} lg={4}>
                  <TaskCard displayTask = {task}/>
                </Col>
              ))
            
            :
            <div className='text-danger fw-bolder'>Taks not yet added!!!</div>
          }
        </Row>
        {/* pagination */}
        <div className='d-flex justify-content-center'>
                <ul className="pagination">
                  {/* backward button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                            className="page-link bg-primary"
                            href="#"
                            onClick={navigateToPreviousPage}
                        >
                            &laquo;
                        </a>
                    </li>
                    {/* pages buttons */}
                    {
                        Array.from({ length: totalPage }, (_, i) => (
                            <li
                                className={`page-item ${currentPage === i + 1 ? 'active ' : ''} `}
                                key={i}
                            >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={()=>navigateToCurrentPage(i+1)}
                                >
                                    {i + 1}
                                </a>
                            </li>
                        ))
                    }
                    {/* forwared button */}
                    <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                        <a
                            className="page-link bg-primary"
                            href="#"
                            onClick={navigateToNextPage}
                        >
                            &raquo;
                        </a>
                    </li>
                </ul>
        </div>
    </div>
  )
}

export default AllTask