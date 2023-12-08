// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('access_token');
    const storedUserId = localStorage.getItem('user_id');
    const storedOrders = JSON.parse(localStorage.getItem(`orders_${storedUserId}`)) || [];

    if (storedLoginStatus && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setOrders(storedOrders);
    }
  }, []);

  const login = () => {
    const storedUserId = localStorage.getItem('user_id');
    if (localStorage.getItem('access_token') && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setUserId(null);
  };

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
    const storedUserId = localStorage.getItem('user_id');
    localStorage.setItem(`orders_${storedUserId}`, JSON.stringify(newOrders));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, handleLogout, userId, orders, updateOrders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
