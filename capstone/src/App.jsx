import { useState } from 'react'
import './index.css'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigation />} />
      <Route path="/users" element={<Users />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<SingleProduct />} />
      <Route path="/search" element={<SearchBar />} />
    </Routes>

  )
}

export default App
