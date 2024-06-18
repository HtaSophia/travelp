import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AmadeusContextProvider } from "../../api/amadeus/AmadeusContext";
import { useAuthContext } from "../AuthContext";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Spinner from "../../components/Spinner/Spinner";

export default function ProtectedRoute() {
    const { currentUser, loading } = useAuthContext();

    if (loading) return <Spinner />;
    if (!currentUser) return <Navigate to="/sign-in" />;

    return (
        <AmadeusContextProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </AmadeusContextProvider>
    );
}
