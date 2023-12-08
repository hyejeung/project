// authcontext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // 사용자 ID 추가
  const [orders, setOrders] = useState([]); // 새로운 상태 추가

  useEffect(() => {
    // 새로고침 시 로컬 스토리지에서 로그인 상태, 사용자 ID, 주문 데이터를 가져옴
    const storedLoginStatus = localStorage.getItem('access_token');
    const storedUserId = localStorage.getItem('user_id');
    const storedOrders = JSON.parse(localStorage.getItem(`orders_${storedUserId}`)) || [];

    if (storedLoginStatus) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
    setOrders(storedOrders);
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
    localStorage.removeItem('store_id');
    localStorage.removeItem('user_id'); // 사용자 ID 제거
    setIsLoggedIn(false);
    setUserId(null); // 사용자 ID 초기화
  };

  // 주문 데이터 업데이트 함수 수정
  const updateOrders = (userId, newOrders) => {
    setOrders(newOrders);
    localStorage.setItem(`orders_${userId}`, JSON.stringify(newOrders));
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
