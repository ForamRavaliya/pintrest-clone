import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch (e) { return null; }
  });

  function save(userObj, token) {
    localStorage.setItem('user', JSON.stringify(userObj));
    localStorage.setItem('token', token);
    setUser(userObj);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, save, logout }}>{children}</AuthContext.Provider>;
}
