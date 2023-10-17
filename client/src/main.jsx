import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './index.css'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
//axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.baseURL = "https://app-citizens.onrender.com/"




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
       <App /> 
     </BrowserRouter>
  </React.StrictMode>
)
