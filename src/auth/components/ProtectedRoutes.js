import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../AuthContext";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const ProtectedRoute = () => {
    const { currentUser } = useAuthContext();

    if (!currentUser) {
        return <Navigate to="/sign-in" />
    }

    return (<>
        <Navbar />
        <Outlet />
        <Footer />
    </>);
}

export default ProtectedRoute;
