import React from 'react'
import { Link } from 'react-router-dom'
import main from '../assets/main.png'


const Home = () => {
  return (
    <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center w-100">
            <div className='container'>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h1 style={{fontSize:'80px'}} className='text-nowrap'><i className="fa-solid fa-square-check"></i> TaskTrack</h1>
                        <h5>Seamlessly Manage Your Tasks with Ease!</h5>
                        <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et delectus asperiores magni dignissimos. Pariatur harum natus, veniam enim at ab totam nihil nam maiores similique, incidunt vitae maxime nulla nisi!</p>
                        {
                            sessionStorage.getItem("token") ?
                            <Link to={'/tasks'} className='btn btn-warning'>START TO EXPLORE</Link>
                            :
                            <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
                        }
                    </div>
                    <div className="col-lg-6">
                        <img style={{objectFit:'cover', width:'100%'}} className='img-fluid' src={main} alt="" />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Home