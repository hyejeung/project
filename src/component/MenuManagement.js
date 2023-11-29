// ManagerMain.js

import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './ManagerMain.css';
import MenuDetail from './MenuDetail'; // MenuDetail 컴포넌트를 import

const MenuManagement = () => {
  const [isAddMenuModalOpen, setAddMenuModalOpen] = useState(false);
  const [isNewMenuItemModalOpen, setNewMenuItemModalOpen] = useState(false); // 추가

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantInfo, setRestaurantInfo] = useState('');
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '' });
  const navigate = useNavigate();

  // 메뉴 상세 정보 모달 열기
  const openMenuDetailModal = () => {
    setNewMenuItemModalOpen(true); // 변경
  };

  // 메뉴 추가 모달 열기
  const openAddMenuModal = () => {
    setAddMenuModalOpen(true);
  };

  // 모달 닫기
  const closeAddMenuModal = () => {
    setAddMenuModalOpen(false);
  };

  // 모달 닫기 (추가)
  const closeNewMenuItemModal = () => {
    setNewMenuItemModalOpen(false);
  };

  // 메뉴 추가 폼 제출
  const handleAddMenu = (e) => {
    e.preventDefault();
    console.log('새로운 메뉴 정보:', newMenuItem);

    // 여기에서 새로운 메뉴를 등록하는 로직 수행

    // 모달 닫기
    closeAddMenuModal();
  };

  return (
    <div className="managermain-container">
      <h2>메뉴 관리 페이지</h2>

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
        <button onClick={openAddMenuModal}>메뉴 추가</button>
      </div>

      {/* 모달 */}
      {isAddMenuModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            {/* 메뉴 추가 폼 */}
            <form onSubmit={handleAddMenu}>
              <h2>메뉴 추가</h2>
              <div>
                <label htmlFor="menuName">메뉴명:</label>
                <input
                  type="text"
                  id="menuName"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="menuPrice">가격:</label>
                <input
                  type="text"
                  id="menuPrice"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                />
              </div>
              <div>
                <button type="submit">추가</button>
                <button type="button" onClick={closeAddMenuModal}>
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 메뉴 상세 정보 모달 */}
      {isNewMenuItemModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <MenuDetail />
            <button className="close-button" onClick={closeNewMenuItemModal}>
              닫기
            </button>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default MenuManagement;
