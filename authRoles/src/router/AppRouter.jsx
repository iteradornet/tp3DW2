// src/router/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import UserPanelLayout from '../layouts/UserPanelLayout';

import HomePage from '../pages/public/HomePage';
import UserLoginPage from '../pages/public/UserLoginPage';

import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

import UserDashboardPage from '../pages/user_panel/UserDashboardPage';
import UserProfilePage from '../pages/user_panel/UserProfilePage';
import UserSubscriptionPage from '../pages/user_panel/UserSubscriptionPage';

import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import { ADMIN_ROLES, USER_ROLES } from '../utils/roles';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
      </Route>

      {/* Ruta de publica de Login de Admin (fuera del AdminLayout protegido) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Rutas de Administración Protegidas */}
      <Route element={<ProtectedRoute allowedUserType="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route 
            path="users" 
            element={
              <ProtectedRoute 
                allowedUserType="admin" 
                allowedRoles={[ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]}
              />
            }
          >
             <Route index element={<AdminUsersPage />} />
          </Route>
          <Route 
            path="settings" 
            element={
              <ProtectedRoute 
                allowedUserType="admin" 
                allowedRoles={[ADMIN_ROLES.SUPERADMIN]}
              />
            }
          >
            <Route index element={<AdminSettingsPage />} />
          </Route>
          {/* Más rutas admin protegidas por rol si es necesario */}
        </Route>
      </Route>

      {/* Rutas del Panel de Usuario Protegidas */}
      <Route element={<ProtectedRoute allowedUserType="user" />}>
        <Route path="/panel" element={<UserPanelLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute 
                allowedUserType="user" 
                allowedRoles={[USER_ROLES.USUARIOBASIC, USER_ROLES.USUARIOPREMIUM]}
              />
            }
          >
            <Route index element={<UserProfilePage />} />
          </Route>
          <Route 
            path="subscription" 
            element={
              <ProtectedRoute 
                allowedUserType="user" 
                allowedRoles={[USER_ROLES.USUARIOPREMIUM]}
              />
            }
          >
            <Route index element={<UserSubscriptionPage />} />
          </Route>
          {/* Más rutas de panel de usuario protegidas por rol si es necesario */}
        </Route>
      </Route>
      
      {/* Ruta Catch-all para 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;