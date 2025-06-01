// src/pages/admin/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react'; // Importar useEffect
import { useNavigate, useLocation, Navigate } from 'react-router-dom'; // Importar Navigate
import useAuth from '../../hooks/useAuth';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const {
    loginAdmin,
    loading,
    error,
    isAuthenticatedAdmin, // Necesitamos saber si el admin ya está autenticado
    initialAuthLoading,   // Para esperar la verificación inicial del token
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  // Efecto para redirigir si ya está logueado
  useEffect(() => {
    // Solo redirigir si la carga inicial de autenticación ha terminado Y el admin está autenticado
    if (!initialAuthLoading && isAuthenticatedAdmin) {
      console.log('AdminLoginPage: Admin ya autenticado, redirigiendo a dashboard.');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticatedAdmin, initialAuthLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Fallo el login de admin:", err);
    }
  };

  // Si la autenticación inicial aún está en curso, no renderizar el formulario aún
  if (initialAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }
  
  // Si después de la carga inicial, el admin ya está autenticado, Navigate se encargará.
  // (aunque el useEffect ya debería haber redirigido). Esto es una doble seguridad.
  if (isAuthenticatedAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Login de Administrador</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-admin">
              Email (superadmin@example.com, admin@example.com, operator@example.com)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email-admin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-admin">
              Contraseña (password123)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password-admin" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar como Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminLoginPage;