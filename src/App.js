// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./auth/components/Authentication";
import ProtectedRoute from "./auth/components/ProtectedRoutes";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import TravelForm from "./pages/TravelForm/TravelForm";
import TravelDetails from "./pages/TravelDetails/TravelDetails";
import Travels from "./pages/Travels/Travels"; // Import Travels
import notFoundImg from "./assets/icons/404.svg";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/travels" index element={<Travels />} />
                <Route
                    path="/travel-details/:travelId"
                    element={<TravelDetails />}
                />
                <Route path="/travel/:travelId?" element={<TravelForm />} />
            </Route>

            <Route element={<Authentication />}>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
            </Route>

            <Route
                path="*"
                element={
                    <div className="text-center">
                        <img src={notFoundImg} alt="404 Not Found" />
                    </div>
                }
            ></Route>
        </Routes>
    );
}

export default App;
