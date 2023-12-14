import { useState, useEffect } from 'react';

const UseAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // You might want to validate the token here if needed

    // If the token is present, the user is considered authenticated
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return { isAuthenticated, login, logout };
};

export default UseAuth;
