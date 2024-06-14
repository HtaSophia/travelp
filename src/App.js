import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from './auth/components/ProtectedRoutes.js';
import SingIn from './pages/SignIn/SignIn.js';
import SignUp from './pages/SignUp/SignUp.js';


function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/travels" index element={<h1>Travels</h1>} />
                <Route path="/travel-details" element={<h1>Travel Details</h1>} />
                <Route path="/travel" element={<h1>Edit Travel</h1>} />
            </Route>
            <Route path='sign-up' element={<SignUp />}></Route>
            <Route path='sign-in' element={<SingIn />}></Route>
            <Route path='*' element={<Navigate to={'/travels'} />}></Route>
        </Routes>
    )
}

export default App;
