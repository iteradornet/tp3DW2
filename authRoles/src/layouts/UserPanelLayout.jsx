// src/layouts/UserPanelLayout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserMenu from '../components/user/UserMenu';
import useAuth from '../hooks/useAuth';

const UserPanelLayout = () => {
  const { userName, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel de Usuario</h1>
          <div>
            <span>Hola, {userName} ({userRole})</span>
            <button onClick={handleLogout} className="ml-4 bg-blue-700 hover:bg-blue-800 text-white py-1 px-3 rounded">
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="flex-grow container mx-auto p-4 flex">
        <aside className="w-1/4 pr-4">
          <UserMenu />
        </aside>
        <main className="w-3/4 bg-white p-6 rounded shadow">
          <Outlet />
        </main>
      </div>
      <footer className="bg-gray-700 text-white text-center p-3">
        User Panel Footer © {new Date().getFullYear()}
      </footer>
    </div>
  );
};
export default UserPanelLayout;