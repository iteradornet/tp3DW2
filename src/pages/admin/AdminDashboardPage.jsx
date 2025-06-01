// src/pages/admin/AdminDashboardPage.jsx
import React from 'react';
import useAuth from '../../hooks/useAuth';

const AdminDashboardPage = () => {
  const { adminName, adminRole } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard de Administrador</h2>
      <p>Bienvenido, <span className="font-bold">{adminName}</span>.</p>
      <p>Tu rol es: <span className="font-bold">{adminRole}</span>.</p>
      <p>Aquí podrás ver estadísticas y accesos directos.</p>
    </div>
  );
};
export default AdminDashboardPage;