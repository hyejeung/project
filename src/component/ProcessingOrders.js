// ProcessingOrders.js

import React, { useState, useEffect } from 'react';

//orders 테이블에서 storeId 인 주문들만 가져오면 된다.
const ProcessingOrders = ({ orders, processOrder }) => {

  let totalPrice = 0;
  orders.forEach(order => {
    totalPrice += order.price;
  });

  return (
    <div className="order-list">
        <h2>접수 대기</h2>
        {orders.map((order) => (
          <div className='order-item' key={order.order_id}>
            {order.orderItems.map((item) => (
              <div key={item.itemName}>
                <span>메뉴명: {item.itemName}</span>
                <span>수량: {item.count}</span>
                <span>가격: {item.orderPrice}원</span>
              </div>
            ))}
            <span>총가격: {totalPrice}원</span>
            <button onClick={() => processOrder(order.order_id, 'READY')}>수락</button>
            <button onClick={() => processOrder(order.order_id, 'CANCEL')}>거절</button>
          </div>
      ))}
    </div>
  );
};

export default ProcessingOrders;