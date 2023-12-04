// InProgressOrders.js

import React from 'react';

const InProgressOrders = () => {
  return (
    <div>
      <h2>처리중인 주문 목록</h2>
      <div className="order-list">
       
      <div className="order-item">
        <span>처리중인 주문 1</span>
        <span>20000원</span>
      </div>

      <div className="order-item">
        <span>처리중인 주문 2</span>
        <span>25000원</span>
      </div>
    </div>
    </div>
  );
};

export default InProgressOrders;
