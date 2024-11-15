import React, { useState } from 'react'
import { Button, Card, Col, Modal, ProgressBar, Row } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import EditTask from '../components/EditTask'



const TaskCard = () => {
  const [show, setShow] = useState(false);
  const now=60

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card  className='btn shadow d-flex justify-content-center flex-column align-items-center'>
            <Card.Img onClick={handleShow} style={{width:'50%', objectFit:'cover'}} className='rounded-circle' vari="top" src="https://cdni.iconscout.com/illustration/premium/thumb/task-clipboard-2748727-2289770.png?f=webp" />
              <h4 onClick={handleShow} className='text-center text-nowrap'>Task name</h4>
            <div className='d-flex justify-content-around align-item-center w-100'>
              <EditTask/>
              <Button variant="danger"><i className="fa-solid fa-trash"></i></Button>
            </div>
      </Card>

      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-info'>Task name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row text-center">
                <div className="col-lg-6">
                    <img className='img-fluid rounded-4 w-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWrwWG_NKjswQcUDHByrC3TUVm4ENd9Pq6Q&s" alt="" />
                </div>
                <div className="col-lg-6 d-flex align-items-start flex-column ">
                    <h6 className='fw-bolder'>Starting Date : <span className='text-danger'>Start Date</span></h6>
                    <h6 className='fw-bolder'>Ending Date : <span className='text-danger'>Ending Date</span></h6>
                    <div className='d-flex align-items-center gap-3'>
                      <h6 className='fw-bolder'>Status :<span className='text-danger'>Selected status</span></h6>
                    </div>
                    <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Task Description : </span>details...</p>
                    <div className='d-flex align-items-center w-100'>
                      <span className='fw-bolder me-2'>Progress: </span>
                      <ProgressBar style={{ width: '100%' }} variant="warning" now={now} label={<span className="text-light">{`${now}%`}</span>} />
                    </div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TaskCard