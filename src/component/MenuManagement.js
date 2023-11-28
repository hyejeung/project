// ManagerMain.js

import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './ManagerMain.css';
import MenuDetail from './MenuDetail'; // MenuDetail 컴포넌트를 import

const MenuManagement = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantInfo, setRestaurantInfo] = useState('');
  const navigate = useNavigate();

  // 메뉴 상세 정보 모달 열기
  const openMenuDetailModal = () => {
    setModalOpen(true);
  };

  // 메뉴 상세 정보 모달 닫기
  const closeMenuDetailModal = () => {
    setModalOpen(false);
  };

  const processOrder = (orderId, status) => {
    console.log(`주문 ID ${orderId}를 ${status} 상태로 처리합니다.`);
  };

  const openStoreInfoModal = () => {
    setModalOpen(true);
  };

  const closeStoreInfoModal = () => {
    setModalOpen(false);
  };

  const handleRegister = () => {
    // 음식점 등록 로직을 수행합니다.
    console.log('음식점 등록 시도:', { restaurantName, restaurantInfo });

    // 여기에서 음식점 등록 성공 여부를 판단하여 페이지 이동
    const registerSuccessful = true; // 예시로 성공했다고 가정

    if (registerSuccessful) {
      setModalOpen(false);
      // 음식점 등록 성공 시 관리자 페이지로 이동
      navigate('/managermain');
    } else {
      alert('음식점 등록 실패. 모든 필수 정보를 입력하세요.');
    }
  };

  return (
    <div className="managermain-container">
      <div className="order-list">
        <div className="order-item">
          <span onClick={openMenuDetailModal}>엽기떡볶이</span>
          <span>15000원</span>
        </div>

        <div className="order-item">
          <span onClick={openMenuDetailModal}>엽기오뎅</span>
          <span>20000원</span>
        </div>
        {/* 다른 상품들도 유사하게 작성 */}
      </div>

      <div className="add-menu-link">
        <Link to="/add-menu">메뉴 추가</Link>
      </div>

      {/* 음식점 등록 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>음식점 등록</h2>
            <div>
              <label htmlFor="restaurantName">음식점명:</label>
              <input
                type="text"
                id="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="restaurantInfo">상세 정보:</label>
              <textarea
                id="restaurantInfo"
                value={restaurantInfo}
                onChange={(e) => setRestaurantInfo(e.target.value)}
              />
            </div>
            <div>
              <button className="register-button" onClick={handleRegister}>
                등록
              </button>
              <button className="close-button" onClick={closeStoreInfoModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메뉴 상세 정보 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <MenuDetail />
            <button className="close-button" onClick={closeMenuDetailModal}>
              닫기
            </button>
          </div>
        </div>
      )}

      <button onClick={openStoreInfoModal}>음식점 등록</button>

      <Outlet />
    </div>
  );
};

export default MenuManagement;