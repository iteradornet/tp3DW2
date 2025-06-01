// src/components/admin/AdminMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ADMIN_ROLES } from '../../utils/roles';

const AdminMenu = () => {
  const { adminRole } = useAuth();

  return (
    <nav className="bg-gray-100 p-4 rounded">
      <h3 className="font-bold mb-2">Menú Admin</h3>
      <ul>
        <li><Link to="/admin/dashboard" className="block py-1 hover:bg-gray-200">Dashboard</Link></li>
        {(adminRole === ADMIN_ROLES.SUPERADMIN || adminRole === ADMIN_ROLES.ADMIN) && (
          <li><Link to="/admin/users" className="block py-1 hover:bg-gray-200">Gestionar Usuarios</Link></li>
        )}
        {adminRole === ADMIN_ROLES.SUPERADMIN && (
          <li><Link to="/admin/settings" className="block py-1 hover:bg-gray-200">Configuración Avanzada</Link></li>
        )}
        {/* Más opciones según rol */}
      </ul>
    </nav>
  );
};
export default AdminMenu;