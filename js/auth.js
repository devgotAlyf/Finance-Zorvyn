// ============================================
// ZORVYN FINANCE — Authentication Module
// ============================================

import { USERS_DB } from './data.js';

const AUTH_KEY = 'zorvyn_auth';

export function login(email, password) {
  const user = USERS_DB.find(u => u.email === email && u.password === password);
  if (!user) return { success: false, error: 'Invalid email or password' };

  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession() {
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return getSession() !== null;
}

export function hasRole(...roles) {
  const session = getSession();
  if (!session) return false;
  return roles.includes(session.role);
}

export function getRoleBadgeClass(role) {
  switch (role) {
    case 'Admin':   return 'badge-admin';
    case 'Analyst': return 'badge-analyst';
    case 'Viewer':  return 'badge-viewer';
    default:        return 'badge-viewer';
  }
}
