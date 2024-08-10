import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist'
import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductDetails from '../pages/ProductDetails';
import Shop from '../pages/Shop';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import AddProducts from '../admin/AddProducts';
import AllProducts from '../admin/AllProducts';
import Dashboard from '../admin/Dashboard';


const Routers = () => {
  return (
    <Routes>

      <Route path='/' element={<Navigate to='home' />} />
      <Route path='home' element={<Home />} />
      <Route path='wishlist' element={<Wishlist />} />
      <Route path='cart' element={<Cart />} />
      <Route path='/*' element={<ProtectedRoute />} />

      <Route path='checkout' element={<Checkout />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='dashboard/all-products' element={<AllProducts />} />
      <Route path='dashboard/add-products' element={<AddProducts />} />


      {/* 
      <Route path='checkout' element={<ProtectedRoute>
        <Checkout />
      </ProtectedRoute>} /> */}

      <Route path='login' element={<Login />} />
      <Route path='shop/:id' element={<ProductDetails />} />
      <Route path='shop' element={<Shop />} />
      <Route path='signup' element={<Signup />} />
    </Routes>);
};

export default Routers;