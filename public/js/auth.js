// Simple Auth Service working with the Node.js Backend API

export async function loginUser(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'Login failed' };
    }
    
    localStorage.setItem('zorvyn_token', data.token);
    localStorage.setItem('zorvyn_user', JSON.stringify(data.user));
    
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: 'Network error occurred.' };
  }
}

export function logoutUser() {
  localStorage.removeItem('zorvyn_token');
  localStorage.removeItem('zorvyn_user');
  window.location.hash = '#login';
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem('zorvyn_user');
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error('Error parsing zorvyn_user', err);
    localStorage.removeItem('zorvyn_user');
    return null;
  }
}

export function getAuthToken() {
  return localStorage.getItem('zorvyn_token');
}

export function hasRole(requiredRoles) {
  const user = getCurrentUser();
  if (!user) return false;
  return requiredRoles.includes(user.role);
}

export function isAuthenticated() {
  return !!getCurrentUser() && !!getAuthToken();
}
