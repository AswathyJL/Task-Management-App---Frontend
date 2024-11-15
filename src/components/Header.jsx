import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Header = ({isAllTasksPage}) => {
  return (
    <Navbar style={{zIndex:1}} className="border  bg-primary position-fixed w-100 rounded shadow">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand style={{color:'white'}} href="#home">
              <i className="fa-solid fa-square-check me-2"></i>TaskTrack
            </Navbar.Brand>
          </Link>
          {
            isAllTasksPage &&
            <div className="ms-auto">
              <button className='btn text-light fw-semibold'>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
          }
        </Container>
      </Navbar>
  )
}

export default Header