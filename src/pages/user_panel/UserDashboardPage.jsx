// src/pages/user_panel/UserDashboardPage.jsx
import React from 'react';
import useAuth from '../../hooks/useAuth';

const UserDashboardPage = () => {
  const { userName, userRole } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mi Dashboard</h2>
      <p>Hola, <span className="font-bold">{userName}</span>.</p>
      <p>Tu tipo de cuenta es: <span className="font-bold">{userRole}</span>.</p>
      <p>Este es tu panel personal.</p>
    </div>
  );
};
export default UserDashboardPage;