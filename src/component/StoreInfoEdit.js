// StoreInfoEdit.js

import React, { useState } from 'react';
import './StoreInfoEdit.css';
import MenuDetail from './MenuDetail'; // MenuDetail 컴포넌트를 import

const StoreInfoEdit = () => {
  const [isAddMenuModalOpen, setAddMenuModalOpen] = useState(false);
  const [isNewMenuItemModalOpen, setNewMenuItemModalOpen] = useState(false); // 추가

  const [storeInfo, setStoreInfo] = useState({
    name: '',
    location: '',
    phoneNumber: '',
  });

  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '' });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('수정된 가게 정보:', storeInfo);
  };

  return (
    <div className="storeinfoedit-container">
      <h1>가게 정보 수정 </h1>
      <form onSubmit={handleSubmit}>
        {/* 나머지 폼 입력 부분은 여기에 추가하시면 됩니다. */}
        <div>
          <label htmlFor="name">가게 이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={storeInfo.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">가게 위치</label>
          <input
            type="text"
            id="location"
            name="location"
            value={storeInfo.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">가게 전화번호</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={storeInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>
       
        <button type="submit">가게 정보 수정 완료</button>
      </form>

      {/* 이하 MenuManagement의 내용 */}
      <h2>메뉴 관리</h2>
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
    </div>
  );
};

export default StoreInfoEdit;
