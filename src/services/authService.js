// src/services/authService.js

/**
 * Verify token with backend and get user data
 * Call this on app initialization to restore auth state
 */
export const verifyToken = async (token) => {
  if (!token) {
    return { isAuthenticated: false, user: null };
  }

  try {
    const response = await fetch('http://localhost:8000/verify-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        isAuthenticated: true,
        user: data.user,
        token: token,
      };
    } else if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      return { isAuthenticated: false, user: null };
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return { isAuthenticated: false, user: null };
  }
};
