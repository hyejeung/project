import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ManagerMain.css';
 
const ManagerMain = () => {
  console.log('ManagerMain 컴포넌트 렌더링');

  const processOrder = (orderId, status) => {
    console.log(`주문 ID ${orderId}를 ${status} 상태로 처리합니다.`);
  };

  const openStoreInfoModal = () => {
    console.log('가게 정보 수정 모달을 엽니다.');
  };

  return (
    <div className="managermain-container">
      <div className="header">
        <h1>주문 관리 페이지</h1>
        <div className="header-menu">
          <Link to="/store-info-edit">가게 정보 수정</Link>
          <Link to="/add-menu" >메뉴 추가</Link>
          <Link to="/mypage">마이페이지</Link>
          <Link to="/sales">매출 관리</Link>
        </div>
      </div>

      <div className="order-list">
        <div className="order-item">
          <span>주문 ID: 1</span>
          <span>상품: 엽기떡볶이</span>
          <span>금액: 15000원</span>
          <button onClick={() => processOrder(1, 'accepted')}>수락</button>
          <button onClick={() => processOrder(1, 'rejected')}>거절</button>
        </div>

        <div className="order-item">
          <span>주문 ID: 2</span>
          <span>상품: 엽기오뎅</span>
          <span>금액: 20000원</span>
          <button onClick={() => processOrder(2, 'accepted')}>수락</button>
          <button onClick={() => processOrder(2, 'rejected')}>거절</button>
        </div>
       
      </div>

      <div className="go-back-link">
        <Link to="/">뒤로 가기</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default ManagerMain;
