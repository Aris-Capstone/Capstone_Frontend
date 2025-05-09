import { useState } from 'react'
import './index.css'
import CreateUser from './components/CreateUser'
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import { getToken } from './features/userSlice';
import Cart from './components/Cart';

function App() {
  const token = useSelector(getToken);
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<CreateAccount />} />
        <Route path="/user_cart" element={<Cart />} />
      </Routes>
    </div>

  );
}

export default App
