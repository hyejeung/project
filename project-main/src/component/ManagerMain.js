// ManagerMain.js

import React from 'react';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './ManagerMain.css';


const ManagerMain = () => {
  const navigate = useNavigate();

  const processOrder = (orderId, status) => {
    console.log(`주문 ID ${orderId}를 ${status} 상태로 처리합니다.`);
  };

  const openStoreInfoModal = () => {
    console.log('가게 정보 수정 모달을 엽니다.');
  };

  return (
    <div className="managermain-container">
      <div className="header">
        <h1>메뉴 관리 페이지</h1>
        <div className="header-menu">
          <Link to="/store-info-edit">가게 정보 수정</Link>
          <Link to="/menu-management">메뉴 관리</Link> {/* 메뉴 추가 버튼을 메뉴 관리 버튼으로 변경 */}
          <Link to="/mypage">마이페이지</Link>
          <Link to="/sales">매출 관리</Link>
          <button onClick={() => navigate('/login')}>로그아웃</button> {/* 로그아웃 버튼 추가 */}
        </div>
      </div>

      <div className="order-list">
        <div className="order-item">
         
          <span> 엽기떡볶이</span>
          <span> 15000원</span>
         
        </div>

        <div className="order-item">
         
          <span>엽기오뎅</span>
          <span> 20000원</span>
          {/* <button onClick={() => processOrder(2, 'accepted')}>수락</button>
          <button onClick={() => processOrder(2, 'rejected')}>거절</button> */}
        </div>
      </div>

      <div className="add-menu-link">
        <Link to="/add-menu">메뉴 추가</Link>
      </div>

      

      <Outlet />
    </div>
  );
};

export default ManagerMain;
