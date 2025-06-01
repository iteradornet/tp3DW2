// src/pages/public/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a Nuestra Aplicación</h1>
      <p className="mb-4">Esta es la página de inicio pública.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login de Usuario
        </Link>
        <Link to="/admin/login" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Login de Administrador
        </Link>
      </div>
    </div>
  );
};
export default HomePage;