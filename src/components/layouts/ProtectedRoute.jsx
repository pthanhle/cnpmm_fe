import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAuth as useAuthContext } from '@/context/AuthContext';
import Loading from '../atoms/Loading';

/**
 * @param {Array} allowedRoles - Danh sách các role được phép truy cập (VD: ['admin'])
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuthContext();

    if (loading) return <Loading />;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;