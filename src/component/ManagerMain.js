// ManagerMain.js

import React, { useState } from 'react';
import './ManagerMain.css';
import ProcessingOrders from './ProcessingOrders';
import CancelledOrders from './CancelledOrders';
import DeliveredOrders from './DeliveredOrders';

const ManagerMain = () => {
  const [selectedTab, setSelectedTab] = useState('processing');

  const processOrder = (orderId, status) => {
    console.log(`주문 ID ${orderId}를 ${status} 상태로 처리합니다.`);
  };

  return (
    <div className="managermain-container">
      <h1>주문 관리 페이지</h1>

      <div className="order-buttons">
        <button onClick={() => setSelectedTab('processing')}>접수대기</button>
        <button onClick={() => setSelectedTab('cancelled')}>주문취소</button>
        <button onClick={() => setSelectedTab('delivered')}>배달완료</button>
      </div>

      {selectedTab === 'processing' && <ProcessingOrders processOrder={processOrder} />}
      {selectedTab === 'cancelled' && <CancelledOrders />}
      {selectedTab === 'delivered' && <DeliveredOrders />}
    </div>
  );
};

export default ManagerMain;