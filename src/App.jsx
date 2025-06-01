// src/App.jsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './router/AppRouter';
import useAuth from './hooks/useAuth'; // Necesitamos useAuth aquí
import './index.css';

// Un componente wrapper para acceder al contexto
const AppContent = () => {
  const { initialAuthLoading } = useAuth();

  if (initialAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          Cargando autenticación...
          {/* Aquí podrías poner un spinner más elaborado */}
        </div>
      </div>
    );
  }

  return <AppRouter />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent /> {/* Envolvemos AppRouter para acceder al contexto */}
    </AuthProvider>
  );
}

export default App;