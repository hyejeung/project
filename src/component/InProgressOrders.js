// InProgressOrders.js

import React from 'react';

const InProgressOrders = ({ orders, processOrder }) => {

  return (
    <div className="order-list">
        <h2>처리중인 주문 목록</h2>
        {orders.map((order) => (
          <div className='order-item' key={order.order_id}>
            {order.orderItems.map((item) => (
              <div key={item.itemName}>
                <span>메뉴명: {item.itemName}</span>
                <span>수량: {item.count}</span>
                <span>가격: {item.orderPrice}원</span>
              </div>
            ))}
            <button onClick={() => processOrder(order.order_id, 'COMP')}>배달</button>
            <button onClick={() => processOrder(order.order_id, 'CANCEL')}>취소</button>
          </div>
      ))}
    </div>
  );
};

export default InProgressOrders;
