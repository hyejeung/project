// ManagerMain.js

import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ManagerMain.css';

const ManagerMain = () => {
  const [isModalOpen, setModalOpen] = useState(false); // 모달을 페이지 로딩 시에 자동으로 열도록 변경
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantInfo, setRestaurantInfo] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  //상태에서 storeId에 접근
  const storeId = state && state.storeId;

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

    console.log('storeId=', storeId);

    if (storeId === 0) {

      setModalOpen(true);
      // 음식점 등록 로직을 수행합니다.
      console.log('음식점 등록 시도:', { restaurantName, restaurantInfo });

      axios.post("/api/stores", {
        name: restaurantName,
        content: restaurantInfo,
      }, {
        headers: { // 로컬 스토리지에서 액세스 토큰 값을 가져와 헤더에 추가
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log("200", res.data);

        if (res.status === 200 || res.status === 201) {
          alert('음식점 등록에 성공했습니다.');
          setModalOpen(false);
          navigate('/managermain');
        }
        else {
          alert('음식점 등록 실패');
        }
      })
      .catch(error => console.log(error))
    }
    else {
      setModalOpen(false);
      navigate('/managermain');
    }
    
  };

  return (
    <div className="managermain-container">
      <div className="order-list">
        <div className="order-item">
          <Link to="/menu-detail">
            <span>엽기떡볶이</span>
            <span>15000원</span>
          </Link>
        </div>

        <div className="order-item">
          <Link to="/menu-detail">
            <span>엽기오뎅</span>
            <span>20000원</span>
          </Link>
        </div>
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

      <button onClick={openStoreInfoModal}>음식점 등록</button>

      <Outlet />
    </div>
  );
};

export default ManagerMain;
