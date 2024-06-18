import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../AuthContext";

import Spinner from "../../components/Spinner/Spinner";

export default function Authentication() {
    const { currentUser, loading } = useAuthContext();

    if (loading) return <Spinner />;
    if (currentUser) return <Navigate to="/travels" />;

    return <Outlet />;
}
