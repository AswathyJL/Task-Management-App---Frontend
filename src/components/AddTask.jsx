import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddTask = ({ onSubmit }) => {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    status: 'Not Yet Started',
    progress: 0,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setTask((prev) => ({
      ...prev,
      image: e.target.files[0], // Store the file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that the end date is on or after the start date
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    if (endDate < startDate) {
      alert('End date must be on or after the start date. Please correct it.');
      return; // Prevent form submission
    }
    alert(`Task added`)
    handleClose();
  };

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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Enter task description"
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskImage">
              <Form.Label>Task Image (Optional)</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={task.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={task.status}
                onChange={handleChange}
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
                onChange={handleChange}
                min="0"
                max="100"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTask;
