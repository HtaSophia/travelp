import './App.css';
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './auth/AuthContext.js';

import Navbar from './components/Navbar/Navbar.js';
import Badge from './components/shared/Badge/Badge.js';
import Footer from './components/Footer/Footer.js';
import Singin from './components/Singin/Singin.js';
import Signup from './components/Signup/Signup.js';
import Map from './components/Map/Map.js';


function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />
    return children;
  };

  // Example array of markers
  const markers = [
    { position: { lat: 40.7128, lng: -74.006 }, title: 'Marker 1' },
    { position: { lat: 40.7259, lng: -73.9805 }, title: 'Marker 2' },
    // Add more markers as needed
  ];

  return (
    <Routes>
      <Route path='/' index element={
        <ProtectedRoute>
          <Navbar username={currentUser?.username} />
          {/* travels, travel details and create travel pages here */}
          <Footer />
        </ProtectedRoute>
      }></Route>
      <Route path='register' element={<Signup />}></Route>
      <Route path='login' element={<Singin />}></Route>
      <Route path='map' element={<Map />}></Route>
      <Route path='*' element={<Navigate to={'/'} />}></Route>
    </Routes>
  )
 
  


}

export default App;
