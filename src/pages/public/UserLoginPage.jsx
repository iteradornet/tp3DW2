// src/pages/public/UserLoginPage.jsx
import React, { useState, useEffect } from 'react'; // Importar useEffect
import { useNavigate, useLocation, Navigate } from 'react-router-dom'; // Importar Navigate
import useAuth from '../../hooks/useAuth';

const UserLoginPage = () => {
  const [email, setEmail] = useState('userbasic@example.com');
  const [password, setPassword] = useState('password123');
  const {
    loginUser,
    loading,
    error,
    isAuthenticatedUser, // Necesitamos saber si el usuario ya está autenticado
    initialAuthLoading,  // Para esperar la verificación inicial del token
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/panel/dashboard";

  // Efecto para redirigir si ya está logueado
  useEffect(() => {
    // Solo redirigir si la carga inicial de autenticación ha terminado Y el usuario está autenticado
    if (!initialAuthLoading && isAuthenticatedUser) {
      console.log('UserLoginPage: Usuario ya autenticado, redirigiendo a panel.');
      navigate('/panel/dashboard', { replace: true });
    }
  }, [isAuthenticatedUser, initialAuthLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Fallo el login de usuario:", err);
    }
  };

  // Si la autenticación inicial aún está en curso, no renderizar el formulario aún
  if (initialAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Ajusta min-h según tu layout */}
        <p>Cargando...</p>
      </div>
    );
  }

  // Si después de la carga inicial, el usuario ya está autenticado, Navigate se encargará
  // (aunque el useEffect ya debería haber redirigido). Esto es una doble seguridad.
  if (isAuthenticatedUser) {
     return <Navigate to="/panel/dashboard" replace />;
  }


  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login de Usuario</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email (userbasic@example.com, userpremium@example.com)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña (password123)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserLoginPage;