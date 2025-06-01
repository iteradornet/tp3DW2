// src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Importamos el hook useAuth

const PublicLayout = () => {
  const {
    isAuthenticatedAdmin,
    adminName,
    isAuthenticatedUser,
    userName,
    logout,
    initialAuthLoading, // Importante para no mostrar enlaces incorrectos mientras se carga
  } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirigir al home público después del logout
  };

  const renderAuthLinks = () => {
    if (initialAuthLoading) {
      return <span className="text-gray-400">Cargando...</span>; // O un spinner pequeño
    }

    if (isAuthenticatedAdmin) {
      return (
        <>
          <Link to="/admin/dashboard" className="mr-4 hover:text-gray-300">
            Panel Admin ({adminName})
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 bg-transparent border-none"
          >
            Logout
          </button>
        </>
      );
    }

    if (isAuthenticatedUser) {
      return (
        <>
          <Link to="/panel/dashboard" className="mr-4 hover:text-gray-300">
            Mi Panel ({userName})
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 bg-transparent border-none"
          >
            Logout
          </button>
        </>
      );
    }

    // Si no está autenticado ni como admin ni como usuario
    return (
      <>
        <Link to="/login" className="mr-4 hover:text-gray-300">Login Usuario</Link>
        <Link to="/admin/login" className="hover:text-gray-300">Login Admin</Link>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-gray-300">Mi App</Link>
          <div>
            {renderAuthLinks()}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> {/* Aquí se renderizan HomePage, UserLoginPage, etc. */}
      </main>
      <footer className="bg-gray-200 text-center p-4">
        © {new Date().getFullYear()} Ejemplo de auth inteligente con control de estados de usuario <br />
        <b className="text-gray-800 text-sm">Carrera Desarrollo Web - ISSRC - Prof. Pablo Aronna</b>
      </footer>
    </div>
  );
};
export default PublicLayout;