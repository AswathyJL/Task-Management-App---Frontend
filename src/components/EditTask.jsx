import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { editTaskAPI } from '../services/allAPI';
import { editTaskResponseContext } from '../context/ContextApi';


const EditTask = ({displayTask}) => {
  const {editTaskResponse, setEditTaskResponse} = useContext(editTaskResponseContext)
  const [displayStartDate, setDisplayStartDate] = useState('');
  const [displayEndDate, setDisplayEndDate] = useState('');
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    id: displayTask._id || '',
    title: displayTask.title || '',
    description: displayTask.description || '',
    startDate: displayTask.startDate || '',
    endDate: displayTask.endDate || '',
    status: displayTask.status || 'Not Yet Started',
    progress: displayTask.progress || 0,
  });

  // console.log(task);

  useEffect(() => {
    setTask({
      id: displayTask._id || '',
      title: displayTask.title || '',
      description: displayTask.description || '',
      startDate: displayTask.startDate || '',
      endDate: displayTask.endDate || '',
      status: displayTask.status || 'Not Yet Started',
      progress: displayTask.progress || 0,
    });
    setDisplayStartDate(formatDate(task.startDate))
    setDisplayEndDate(formatDate(task.endDate))
  }, [displayTask]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleClose = () => {
    setTask({
      title: '',
      description: '',
      image: '',
      startDate: '',
      endDate: '',
      status: 'Not Yet Started',
      progress: 0,
    });
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const handleEditTask = async (e) => {
    e.preventDefault();
    
    console.log(task); // Log task data before submitting
  
    const { id, title, startDate, endDate, description, status, progress } = task;
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (end < start) {
      alert('End date must be on or after the start date. Please correct it.');
      return;
    }
  
    if (title && startDate && endDate && description && status && progress) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("startDate", startDate);
      reqBody.append("endDate", endDate);
      reqBody.append("description", description);
      reqBody.append("status", status);
      reqBody.append("progress", progress);
      console.log(reqBody.get("progress"));
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeaders = {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        };
  
        try {
          const result = await editTaskAPI(id, reqBody, reqHeaders);
          if (result.status == 200) {
            alert("Task updated successfully");
            console.log(result);
            
            setEditTaskResponse(result);
            handleClose();
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("No token found");
      }
    } else {
      alert("Validation failed: Required fields are missing");
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-primary fw-semibold'>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
              <Form.Label>Start Date : {displayStartDate}</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={e=>setTask({...task,startDate:e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date : {displayEndDate}</Form.Label>
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

            <Button onClick={handleEditTask} variant="warning" type="button">
              Update Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTask;
