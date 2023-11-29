// DeliveredOrders.js

import React from 'react';

const DeliveredOrders = () => {
  return (
    <div className="order-list">
        <h2>배달 완료</h2>
      <div className="order-item">
        <span>배달완료된 주문 1</span>
        <span>20000원</span>
      </div>

      <div className="order-item">
        <span>배달완료된 주문 2</span>
        <span>25000원</span>
      </div>
    </div>
  );
};

export default DeliveredOrders;
