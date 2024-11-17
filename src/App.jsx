import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import AllTask from './pages/AllTask'
import Header from './components/Header'
import Footer from './components/Footer'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './context/AuthContextAPI'



function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  useEffect(()=>{
    if(sessionStorage.getItem("token"))
      {
        setIsAuthorised(true)
      }else{
        setIsAuthorised(false)
      }
  },[isAuthorised])
  const location = useLocation();  // to get the current location

  // Determine if the current page is 'AllTasks' or 'Dashboard'
  const isAllTasksPage = location.pathname === '/tasks';
  return (
    <>
        <Header isAllTasksPage={isAllTasksPage}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {isAuthorised && <Route path='/tasks' element={<AllTask/> }/>}
          <Route path='/login' element={<Auth/>}/>
          <Route path='/register' element={<Auth insideRegister = {true}/>}/>
          <Route path='/*' element={<Home pnf={true}/>}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App
