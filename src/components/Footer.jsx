import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div style={{zIndex:1, paddingTop:'30px'}} className='position-sticky bg-primary  w-100 shadow mt-5 py-3'>
      <div className='container d-flex justify-content-between flex-wrap'>
        <ul style={{listStyle:'none', width:'500px', fontSize:'1.20rem'}} className='mt-1 text-white'>
          <li ><Link style={{textDecoration:'none',color:'white', fontWeight:'700' , fontSize:'1.5rem'}} to={'/'}>
          <i className="fa-solid fa-square-check me-2"></i>TaskTrack
           </Link></li>
           <li  className='mt-3'>Designed and built with all the love in the world by the Luminar team with the help of our contributors.</li>
           <li className='mt-3'>Code licensed Luminar, docs CC BY 3.0.</li>
           <li className='mt-3'>Currently v5.3.2.</li>
        </ul>
        <div className="d-flex flex-column justify-content-start">
          <h5 className='fw-3 text-warning'>Links</h5>
          <Link style={{textDecoration:'none' ,color:'white', fontSize:'1rem'}}  to={'/'}>Home Page</Link>
          <Link style={{textDecoration:'none' ,color:'white', fontSize:'1rem'}} to={'/taks'}>All Task Page</Link>
          <Link style={{textDecoration:'none' ,color:'white', fontSize:'1rem'}} to={'/login'}>Sign in page</Link>
        </div>
        <div className="d-flex flex-column justify-content-start text-white">
          <h5 className='fw-3 text-warning'>Guides</h5>
          <h6>React</h6>
          <h6>React Boostrap</h6>
          <h6>React Router</h6>
        </div>
        <div className="d-flex flex-column justify-content-start">
          <h5 className='fw-3 text-warning'>Contact Us</h5>
          <div className='d-flex justify-content-between'>
            <input type="text" className='form-control me-3 rounded' placeholder='Enter your email here'/>
            <button className='btn btn-warning'><i className="fa-solid fa-arrow-right"></i></button>
          </div>
          <div className='d-flex justify-content-between mt-3 text-white'>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-github"></i>
          <i className="fa-solid fa-phone"></i>
          </div>
        </div>
      </div> 
      <h6 className='text-center mt-3 text-warning'>Copyright © November 2024 Batch, TaskTrack. Built with React.</h6>
    </div>
  )
}

export default Footer