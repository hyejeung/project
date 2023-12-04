// ProcessingOrders.js

import React, { useState, useEffect } from 'react';

//orders 테이블에서 storeId 인 주문들만 가져오면 된다.
const ProcessingOrders = ({ processOrder }) => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storeId = localStorage.getItem('storeId');
    console.log('storeId:', storeId);

    // SSE 이벤트 수신
    const eventSource = new EventSource(`/api/orders/${storeId}`);
  
    eventSource.addEventListener("order", async (event) => {
      const orderData = JSON.parse(event.data);
      console.log('orderData =', orderData);

      setOrders((prevOrders) => [...prevOrders, orderData]);
      console.log('orders =', orders);
    });

    return () => {
      // 컴포넌트가 언마운트될 때 EventSource 연결 해제
      eventSource.close();
    };
  }, []);

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
            <button onClick={() => processOrder(order.order_id, 'accepted')}>수락</button>
            <button onClick={() => processOrder(order.order_id, 'rejected')}>거절</button>
          </div>
      ))}
    </div>
  );
};

export default ProcessingOrders;
