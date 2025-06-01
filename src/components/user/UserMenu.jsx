// src/components/user/UserMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/roles';

const UserMenu = () => {
  const { userRole } = useAuth();

  return (
    <nav className="bg-gray-100 p-4 rounded">
      <h3 className="font-bold mb-2">Menú Usuario</h3>
      <ul>
        <li><Link to="/panel/dashboard" className="block py-1 hover:bg-gray-200">Mi Dashboard</Link></li>
        {(userRole === USER_ROLES.USUARIOBASIC || userRole === USER_ROLES.USUARIOPREMIUM) && (
          <li><Link to="/panel/profile" className="block py-1 hover:bg-gray-200">Mi Perfil</Link></li>
        )}
        {userRole === USER_ROLES.USUARIOPREMIUM && (
          <li><Link to="/panel/subscription" className="block py-1 hover:bg-gray-200">Mi Suscripción</Link></li>
        )}
        {/* Más opciones según rol */}
      </ul>
    </nav>
  );
};
export default UserMenu;