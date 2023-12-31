// CancelledOrders.js

import React from 'react';

const CancelledOrders = ({ orders }) => {
  return (
    <div className="order-list">
      <h2>주문 취소</h2>
      {orders.map((order) => (
        <div className='order-item' key={order.order_id}>
          {order.orderItems.map((item) => (
            <div key={item.itemName}>
              <span>메뉴명: {item.itemName}</span>
              <span>수량: {item.count}</span>
              <span>가격: {item.orderPrice}원</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CancelledOrders;
