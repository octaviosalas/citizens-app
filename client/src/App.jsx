import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Main from './pages/Main'
import Wall from './pages/Wall'
import MyPublications from './pages/MyPublications'
import { UserProvider } from './store/usercontext'
import UserSearch from './pages/UserSearch'
import MyProfile from './pages/MyProfile'
import PublicationDetail from './components/PublicationDetail'

function App() {
  

  return (
    <>
     
             <UserProvider>
                  <Navbar/>
                    <Routes>
                      <Route path="/" element={<Main/>}></Route> 
                      <Route path="/register" element={<Register/>}></Route> 
                      <Route path="/login" element={<SignIn/>}></Route> 
                      <Route path="/wall" element={<Wall/>}></Route> 
                      <Route path="/myPublications/:id" element={<MyPublications/>}></Route> 
                      <Route path="/publicationsSearched/:searchParam" element={<UserSearch/>}></Route> 
                      <Route path="/myProfile/:userId" element={<MyProfile/>}></Route> 
                      <Route path="/publication/:publicationId" element={<PublicationDetail/>}></Route> 
                    </Routes>

             </UserProvider>
            
        
    </>
  )
}

export default App
