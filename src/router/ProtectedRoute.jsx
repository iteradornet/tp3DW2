// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ allowedUserType, allowedRoles }) => {
  const { 
    isAuthenticatedAdmin, 
    adminRole,
    isAuthenticatedUser, 
    userRole 
  } = useAuth();
  const location = useLocation();

  if (allowedUserType === 'admin') {
    if (!isAuthenticatedAdmin) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    if (isAuthenticatedUser) { // Un usuario normal no puede acceder a /admin
        console.warn("Usuario autenticado intentando acceder a zona admin. Redirigiendo a /panel");
        return <Navigate to="/panel" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(adminRole)) {
      // Podrías redirigir a una página de "No Autorizado" o al dashboard de admin
      return <Navigate to="/admin/dashboard" state={{ unauthorized: true }} replace />;
    }
  } else if (allowedUserType === 'user') {
    if (!isAuthenticatedUser) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (isAuthenticatedAdmin) { // Un admin no puede acceder a /panel
        console.warn("Admin autenticado intentando acceder a zona de usuario. Redirigiendo a /admin");
        return <Navigate to="/admin/dashboard" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Podrías redirigir a una página de "No Autorizado" o al dashboard de usuario
      return <Navigate to="/panel/dashboard" state={{ unauthorized: true }} replace />;
    }
  } else {
    // Si no se especifica allowedUserType, es un error de configuración
    console.error("ProtectedRoute necesita un 'allowedUserType' ('admin' o 'user')");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;