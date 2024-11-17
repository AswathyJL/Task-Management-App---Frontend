import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './context/ContextApi.jsx'
import AuthContextAPI from './context/AuthContextAPI.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextAPI>
      <ContextApi>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextApi>
    </AuthContextAPI>
  </StrictMode>,
)
