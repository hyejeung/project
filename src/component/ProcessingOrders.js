// ProcessingOrders.js

import React from 'react';

const ProcessingOrders = ({ processOrder }) => {
  return (
    <div className="order-list">
        <h2>접수 대기</h2>
      <div className="order-item">
        <span>엽기떡볶이</span>
        <span>15000원</span>
        <button onClick={() => processOrder(1, 'accepted')}>수락</button>
        <button onClick={() => processOrder(1, 'rejected')}>거절</button>
      </div>

      <div className="order-item">
        <span>엽기오뎅</span>
        <span>20000원</span>
        <button onClick={() => processOrder(2, 'accepted')}>수락</button>
        <button onClick={() => processOrder(2, 'rejected')}>거절</button>
      </div>
    </div>
  );
};

export default ProcessingOrders;
