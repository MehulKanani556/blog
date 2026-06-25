import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect } from 'react';
import { useState } from 'react';
import User from './pages/User';
import Post from './pages/Post';

const ProtectedRoute = ({children,allowedRoles})=>{
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if(!token || !userData){
    return <Navigate to="/login" replace />
  }
  const user = JSON.parse(userData)
  console.log("user",user);
  

  if(allowedRoles && !allowedRoles.includes(user[0].role)){
    return <Navigate to="/login" replace />
  }
  return children;
}
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  },[token])

  return (
    <div className="">
      <Routes>
        <Route path="/user" element={<ProtectedRoute allowedRoles={["admin"]}>
          <User />
        </ProtectedRoute>} />
        <Route path="/post" element={<ProtectedRoute allowedRoles={["admin"]}>
          <Post />
        </ProtectedRoute>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
