import './App.css';
import notFoundImg from './assets/icons/404.svg';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Authentication from './auth/components/Authentication.js';
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

            <Route element={<Authentication />}>
                <Route path='sign-up' element={<SignUp />}></Route>
                <Route path='sign-in' element={<SingIn />}></Route>
            </Route>

            <Route path='*' element={
                <div className="text-center">
                    <img src={notFoundImg} alt="draw of a florets with a 404 number in the middle" />
                </div>
            }></Route>
        </Routes>
    )
}

export default App;
