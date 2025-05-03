import { useState } from 'react'
import './index.css'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import Products from './components/Products'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {

  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/products" element={<Products />} />
    </Routes>

  )
}

export default App
