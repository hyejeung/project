// CancelledOrders.js

import React from 'react';

const CancelledOrders = () => {
  return (
    <div className="order-list">
        <h2>주문 취소</h2>
      <div className="order-item">
        <span>취소된 주문 1</span>
        <span>10000원</span>
      </div>

      <div className="order-item">
        <span>취소된 주문 2</span>
        <span>15000원</span>
      </div>
    </div>
  );
};

export default CancelledOrders;
