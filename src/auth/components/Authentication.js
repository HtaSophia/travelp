import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

export default function Authentication() {
    const { currentUser } = useAuthContext();

    if (currentUser) {
        return <Navigate to="/travels" />
    }

    return <Outlet />;
}
