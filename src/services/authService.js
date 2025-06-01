// src/services/authService.js
import { ADMIN_ROLES, USER_ROLES } from '../utils/roles';

const MOCK_API_URL = '/localhost:3000/api';

const mockAdminUsers = {
  'superadmin@example.com': { password: 'password123', role: ADMIN_ROLES.SUPERADMIN, name: 'Super Admin User', token: 'admin-token-superadmin' },
  'admin@example.com': { password: 'password123', role: ADMIN_ROLES.ADMIN, name: 'Admin User', token: 'admin-token-admin' },
  'operator@example.com': { password: 'password123', role: ADMIN_ROLES.OPERATOR, name: 'Operator User', token: 'admin-token-operator' },
};

const mockRegularUsers = {
  'userbasic@example.com': { password: 'password123', role: USER_ROLES.USUARIOBASIC, name: 'Basic User', token: 'user-token-basic' },
  'userpremium@example.com': { password: 'password123', role: USER_ROLES.USUARIOPREMIUM, name: 'Premium User', token: 'user-token-premium' },
};

// Simula la validación de token y obtención de detalles
const validateAdminTokenAndGetDetails = (token) => {
  for (const email in mockAdminUsers) {
    if (mockAdminUsers[email].token === token) {
      return { role: mockAdminUsers[email].role, name: mockAdminUsers[email].name };
    }
  }
  return null;
};

const validateUserTokenAndGetDetails = (token) => {
  for (const email in mockRegularUsers) {
    if (mockRegularUsers[email].token === token) {
      return { role: mockRegularUsers[email].role, name: mockRegularUsers[email].name };
    }
  }
  return null;
};


export const loginAdminApi = (email, password) => {
  console.log(`Simulating ADMIN login call to ${MOCK_API_URL}/admin/login`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const admin = mockAdminUsers[email];
      if (admin && admin.password === password) {
        // El backend devolvería token, role, name.
        // localStorage solo para token se hará en el contexto.
        resolve({ token: admin.token, role: admin.role, name: admin.name });
      } else {
        reject(new Error('Credenciales de administrador incorrectas'));
      }
    }, 1000);
  });
};

export const loginUserApi = (email, password) => {
  console.log(`Simulating USER login call to ${MOCK_API_URL}/login`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockRegularUsers[email];
      if (user && user.password === password) {
        // El backend devolvería token, role, name.
        // localStorage solo para token se hará en el contexto.
        resolve({ token: user.token, role: user.role, name: user.name });
      } else {
        reject(new Error('Credenciales de usuario incorrectas'));
      }
    }, 1000);
  });
};

// Obtener detalles del admin por token
export const getAdminDetailsApi = (token) => {
  console.log(`Simulating ADMIN get details call to ${MOCK_API_URL}/admin/me with token`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const adminDetails = validateAdminTokenAndGetDetails(token);
      if (adminDetails) {
        resolve({ role: adminDetails.role, name: adminDetails.name });
      } else {
        reject(new Error('Token de administrador inválido o expirado'));
      }
    }, 700);
  });
};

// Obtener detalles del usuario por token
export const getUserDetailsApi = (token) => {
  console.log(`Simulating USER get details call to ${MOCK_API_URL}/user/me with token`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userDetails = validateUserTokenAndGetDetails(token);
      if (userDetails) {
        resolve({ role: userDetails.role, name: userDetails.name });
      } else {
        reject(new Error('Token de usuario inválido o expirado'));
      }
    }, 700);
  });
};


export const logoutAdminApi = () => {
  console.log('Simulating ADMIN logout');
  return new Promise((resolve) => {
    setTimeout(() => {
      // El backend invalidaría el token si es stateful.
      // En el cliente, solo necesitamos limpiar el token.
      localStorage.removeItem('adminToken');
      resolve();
    }, 500);
  });
};

export const logoutUserApi = () => {
  console.log('Simulating USER logout');
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('userToken');
      resolve();
    }, 500);
  });
};