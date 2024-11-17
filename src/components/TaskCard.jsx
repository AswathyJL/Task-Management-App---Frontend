import React, { useContext, useState } from 'react'
import { Button, Card, Col, Modal, ProgressBar, Row } from 'react-bootstrap'
import EditTask from '../components/EditTask'
import { removeTaskAPI } from '../services/allAPI';
import { removeTaskResponseContext } from '../context/ContextApi';



const TaskCard = ({displayTask}) => {
  const {removeTaskResponse, setRemoveTaskResponse} = useContext(removeTaskResponseContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero (months are 0-indexed)
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
  }

  const deleteTask = async(id) =>{
    const token = sessionStorage.getItem("token")
        if(token)
        {
            const reqHeaders = {
                "Authorization":`Bearer ${token}`
            }
            // make api call
            try {
              const result = await removeTaskAPI(id,reqHeaders)
              if(result.status==200)
              {
                alert("Task deleted successfully")
              }
              else
              {
                alert(result.response.data)
              }
              setRemoveTaskResponse(result)
            } catch (err) {
              console.log(err);
              
            }
        }
  }
  return (
    <>
      <Card  className='btn shadow d-flex justify-content-center flex-column align-items-center'>
            <Card.Img onClick={handleShow} style={{width:'50%', objectFit:'cover'}} className='rounded-circle' vari="top" src="https://cdni.iconscout.com/illustration/premium/thumb/task-clipboard-2748727-2289770.png?f=webp" />
              <h4 onClick={handleShow} className='text-center text-nowrap'>{displayTask.title}</h4>
            <div className='d-flex justify-content-around align-item-center w-100'>
              <EditTask displayTask = {displayTask}/>
              <Button onClick={()=>deleteTask(displayTask?._id)} variant="danger"><i className="fa-solid fa-trash"></i></Button>
            </div>
      </Card>

      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-info'>{displayTask.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row text-center">
                <div className="col-lg-6">
                    <img className='img-fluid rounded-4 w-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWrwWG_NKjswQcUDHByrC3TUVm4ENd9Pq6Q&s" alt="" />
                </div>
                <div className="col-lg-6 d-flex align-items-start flex-column ">
                    <h6 className='fw-bolder'>Starting Date : <span className='text-danger'>{formatDate(displayTask.startDate)}</span></h6>
                    <h6 className='fw-bolder'>Ending Date : <span className='text-danger'>{formatDate(displayTask.endDate)}</span></h6>
                    <div className='d-flex align-items-center gap-3'>
                      <h6 className='fw-bolder'>Status :<span className='text-danger'>{displayTask.status}</span></h6>
                    </div>
                    <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Task Description : </span>{displayTask.description}</p>
                    <div className='d-flex align-items-center w-100'>
                      <span className='fw-bolder me-2'>Progress: </span>
                      <ProgressBar style={{ width: '100%' }} variant="warning" now={displayTask.progress} label={<span className="text-light">{`${displayTask.progress}%`}</span>} />
                    </div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TaskCard