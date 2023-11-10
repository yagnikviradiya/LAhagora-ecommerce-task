// /src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute'; // Adjust the path accordingly
import { userType } from './constants';
import AddProduct from './container/AddProduct';
import Login from './container/Login';
import ProductListing from './container/ProductListing';
import Register from './container/Register';
import { isAuthenticated } from './utils';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/products"
          element={
            <ProtectedRoute isHowHeader={true} accessRoal={[userType.STOREOWNER, userType.CUSTOMER]}>
              <ProductListing />
            </ProtectedRoute>}
        />

        <Route
          path="/product/add"
          element={
            <ProtectedRoute isHowHeader={true} accessRoal={[userType.STOREOWNER]}>
              <AddProduct />
            </ProtectedRoute>}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isHowHeader={true} accessRoal={[userType.CUSTOMER]}>
              <Cart />
            </ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
