import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import TaskCard from '../components/TaskCard'
import AddTask from '../components/AddTask'


const AllTask = () => {
  return (
    <div className='px-5'>
        <div style={{paddingTop:'150px'}} className="d-flex justify-content-between align-items-center">
          <h1 className='text-primary'>All Tasks</h1>
          <input onChange={e=>setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='Search Tasks...' />
          <AddTask/>
        </div>
        <Row className='mt-3'>
          <Col className='mb-3' sm={12} md={6} lg={4}>
            <TaskCard/>
          </Col>
          {/* <div className='text-danger fw-bolder'>Taks not yet added!!!</div> */}
          </Row>
      </div>
  )
}

export default AllTask