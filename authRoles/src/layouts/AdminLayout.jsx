// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminMenu from '../components/admin/AdminMenu';
import useAuth from '../hooks/useAuth';

const AdminLayout = () => {
  const { adminName, adminRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel de Administración</h1>
          <div>
            <span>Bienvenido, {adminName} ({adminRole})</span>
            <button onClick={handleLogout} className="ml-4 bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded">
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="flex-grow container mx-auto p-4 flex">
        <aside className="w-1/4 pr-4">
          <AdminMenu />
        </aside>
        <main className="w-3/4 bg-white p-6 rounded shadow">
          <Outlet />
        </main>
      </div>
      <footer className="bg-gray-700 text-white text-center p-3">
        Admin Footer © {new Date().getFullYear()}
      </footer>
    </div>
  );
};
export default AdminLayout;