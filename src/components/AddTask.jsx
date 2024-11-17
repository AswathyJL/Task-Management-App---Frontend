import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addTaskAPI } from '../services/allAPI';
import { addTaskResponseContext } from '../context/ContextApi';


const AddTask = () => {
  const {addTaskResponse, setAddTaskResponse} = useContext(addTaskResponseContext)
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Yet Started',
    progress: 0,
  });
  // console.log(task);
  

  const handleClose = () => {
    setTask({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Not Yet Started',
      progress: '0',
    });
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const handleAddTask = async (e) => {
    e.preventDefault()
    const {title,startDate,endDate,description,status,progress} = task

    // console.log(`inside handle task`);
    
    // Validate that the end date is on or after the start date
    const start = new Date(task.startDate);
    const end= new Date(task.endDate);
    if (end < start) {
      alert('End date must be on or after the start date. Please correct it.');
      return; // Prevent form submission
    }

    if(title && startDate && endDate && description && status && progress)
    {
      // console.log(`proceeding to api call`);
      
      // proceed to api
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("startDate",startDate)
      reqBody.append("endDate",endDate)
      reqBody.append("description",description)
      reqBody.append("status",status)
      reqBody.append("progress",progress)
      const token = sessionStorage.getItem("token")
      if(token)
      {
        // console.log(`token found`);
        
        const reqHeaders = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }

        // make api call
        try {
          // console.log(`inside try calling api`);
          
          const result = await addTaskAPI(reqBody,reqHeaders)
          if(result.status==200)
          {
            // console.log(`called api success`);
            
            alert("Task added successfully")
            setAddTaskResponse(result)
            handleClose()
          }
          else
          {
            alert(result.response.data)
          }
        } catch (err) {
          console.log(err);
        }
      }
      else
      {
        console.log(`no token found`);
      }
    }
    else
    {
      console.log("Validation failed: Required fields are missing");
    }
  }
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-primary fw-semibold'>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={task.title}
                onChange={e=>setTask({...task,title:e.target.value})}
                placeholder="Enter task title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={task.description}
                onChange={e=>setTask({...task,description:e.target.value})}
                placeholder="Enter task description"
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={e=>setTask({...task,startDate:e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={task.endDate}
                onChange={e=>setTask({...task,endDate:e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={task.status}
                onChange={e=>setTask({...task,status:e.target.value})}
              >
                <option>Not Yet Started</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Pending</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="progress">
              <Form.Label>Progress (%)</Form.Label>
              <Form.Control
                type="number"
                name="progress"
                value={task.progress}
                onChange={e=>setTask({...task,progress:e.target.value})}
                min="0"
                max="100"
              />
            </Form.Group>

            <button className='btn btn-warning' onClick={handleAddTask} type="button">Add Task</button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTask;
