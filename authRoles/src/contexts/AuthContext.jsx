 import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  loginAdminApi,
  loginUserApi,
  logoutAdminApi,
  logoutUserApi,
  getAdminDetailsApi,
  getUserDetailsApi,
} from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('🔄 Inicializando AuthProvider...');
  const [adminToken, setAdminToken] = useState(null);  
  const [adminRole, setAdminRole] = useState(null);
  const [adminName, setAdminName] = useState(null);

  const [userToken, setUserToken] = useState(null); 
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  const [loading, setLoading] = useState(false); // Para operaciones de login/logout
  const [initialAuthLoading, setInitialAuthLoading] = useState(true); // Para la carga inicial de auth
  const [error, setError] = useState(null);

  const clearAdminState = useCallback(() => {
    setAdminToken(null);
    setAdminRole(null);
    setAdminName(null);
    localStorage.removeItem('adminToken');
  }, []);

  const clearUserState = useCallback(() => {
    setUserToken(null);
    setUserRole(null);
    setUserName(null);
    localStorage.removeItem('userToken');
  }, []);

  // Efecto para verificar token al cargar la app
  useEffect(() => {
    console.log('🔍 Iniciando verificación de tokens almacenados...');
    const verifyToken = async () => {
      console.log('🔄 Proceso de verificación de tokens iniciado');
      const storedAdminToken = localStorage.getItem('adminToken');
      const storedUserToken = localStorage.getItem('userToken');
      setInitialAuthLoading(true);
      
      console.log(`📦 Tokens encontrados: Admin=${!!storedAdminToken}, User=${!!storedUserToken}`);

      if (storedAdminToken) {
        console.log('🔐 Verificando token de administrador...');
        try {
          const adminDetails = await getAdminDetailsApi(storedAdminToken);
          console.log(`✅ Token de admin válido - Rol: ${adminDetails.role}, Nombre: ${adminDetails.name}`);
          setAdminToken(storedAdminToken);
          setAdminRole(adminDetails.role);
          setAdminName(adminDetails.name);
          clearUserState(); // Asegurarse que no hay estado de usuario
          console.log('🧹 Estado de usuario limpiado (prioridad admin)');
        } catch (err) {
          console.warn('❌ Admin token verification failed:', err.message);
          console.log('🧹 Limpiando estado de administrador por token inválido');
          clearAdminState();
        }
      } else if (storedUserToken) {
        console.log('🔐 Verificando token de usuario...');
        try {
          const userDetails = await getUserDetailsApi(storedUserToken);
          console.log(`✅ Token de usuario válido - Rol: ${userDetails.role}, Nombre: ${userDetails.name}`);
          setUserToken(storedUserToken);
          setUserRole(userDetails.role);
          setUserName(userDetails.name);
          clearAdminState(); // Asegurarse que no hay estado de admin
          console.log('🧹 Estado de administrador limpiado (prioridad usuario)');
        } catch (err) {
          console.warn('❌ User token verification failed:', err.message);
          console.log('🧹 Limpiando estado de usuario por token inválido');
          clearUserState();
        }
      } else {
        console.log('📭 No se encontraron tokens almacenados');
      }
      // Si no hay tokens, no hace falta hacer nada más, los estados ya son null
      setInitialAuthLoading(false);
      console.log('✅ Verificación de tokens completada');
    };

    verifyToken();
  }, [clearAdminState, clearUserState]); // Dependencias para useCallback

  const loginAdmin = async (email, password) => {
    console.log(`🔑 Iniciando login de administrador: ${email}`);
    setLoading(true);
    setError(null);
    try {
      const data = await loginAdminApi(email, password); // data = { token, role, name }
      console.log(`✅ Login de administrador exitoso - Rol: ${data.role}`);
      setAdminToken(data.token);
      setAdminRole(data.role);
      setAdminName(data.name);
      localStorage.setItem('adminToken', data.token); // Solo el token en localStorage
      console.log('💾 Token de administrador guardado en localStorage');

      // Limpiar estado de usuario si existiera
      clearUserState();
      console.log('🧹 Estado de usuario limpiado (login admin exitoso)');
      return data;
    } catch (err) {
      console.error('❌ Error en login de administrador:', err.message);
      setError(err.message);
      clearAdminState(); // Limpiar si el login falla
      console.log('🧹 Estado de administrador limpiado por error de login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    console.log(`🔑 Iniciando login de usuario: ${email}`);
    setLoading(true);
    setError(null);
    try {
      const data = await loginUserApi(email, password); // data = { token, role, name }
      console.log(`✅ Login de usuario exitoso - Rol: ${data.role}`);
      setUserToken(data.token);
      setUserRole(data.role);
      setUserName(data.name);
      localStorage.setItem('userToken', data.token); // Solo el token en localStorage
      console.log('💾 Token de usuario guardado en localStorage');

      // Limpiar estado de admin si existiera
      clearAdminState();
      console.log('🧹 Estado de administrador limpiado (login usuario exitoso)');
      return data;
    } catch (err) {
      console.error('❌ Error en login de usuario:', err.message);
      setError(err.message);
      clearUserState(); // Limpiar si el login falla
      console.log('🧹 Estado de usuario limpiado por error de login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('🚪 Iniciando proceso de logout...');
    setLoading(true);
    setError(null);
    if (adminToken) {
      console.log('🔄 Cerrando sesión de administrador...');
      await logoutAdminApi(); // Esta función ya limpia el token de localStorage
      clearAdminState();
      console.log('✅ Sesión de administrador cerrada correctamente');
    }
    if (userToken) {
      console.log('🔄 Cerrando sesión de usuario...');
      await logoutUserApi(); // Esta función ya limpia el token de localStorage
      clearUserState();
      console.log('✅ Sesión de usuario cerrada correctamente');
    }
    setLoading(false);
    console.log('🏁 Proceso de logout completado');
  };

  const isAuthenticatedAdmin = !!adminToken;
  const isAuthenticatedUser = !!userToken;

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        adminRole,
        adminName,
        isAuthenticatedAdmin,
        loginAdmin,
        userToken,
        userRole,
        userName,
        isAuthenticatedUser,
        loginUser,
        logout,
        loading, // Para login/logout
        initialAuthLoading, // Para la carga inicial
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;