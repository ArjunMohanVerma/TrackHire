import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoutes from './components/ProtectedRoutes'


const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element = {
        <ProtectedRoutes>
          <Dashboard/>
        </ProtectedRoutes>
      }/>
    </Routes>
  )
}

export default App