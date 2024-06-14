import './App.css';
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './auth/AuthContext.js';
import Badge from './components/shared/Badge/Badge.js';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Singin from './components/Singin/Singin.js';
import Signup from './components/Signup/Signup.js';
import Map from './components/Map/Map.js';
import CardComponent from './components/Card/CardComponent.js';

// Import the image from the assets folder
import nycImage from '../src/assets/images/nycity.jpg';

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

  const handleCardClick = () => {
    alert('Card clicked!');
  };

  return (
    <Routes>
      <Route path='/' index element={
        <ProtectedRoute>
          <Navbar username={currentUser?.username} />
          <div className="container mt-5">
            <CardComponent
              imgUrl={nycImage} // Use the imported image here
              title="New York City"
              description="A short trip with my family to New York City for the holiday."
              onClick={handleCardClick}
            />
          </div>
          <Footer />
        </ProtectedRoute>
      }></Route>
      <Route path='register' element={<Signup />}></Route>
      <Route path='login' element={<Singin />}></Route>
      <Route path='map' element={<Map />}></Route>
      <Route path='travel' element={
        <CardComponent
          imgUrl={nycImage} // Use the imported image here
          title="New York City"
          description="A short trip with my family to New York City for the holiday."
          onClick={handleCardClick}
        />
      }></Route>
      <Route path='*' element={<Navigate to={'/'} />}></Route>
    </Routes>
  );
}

export default App;
