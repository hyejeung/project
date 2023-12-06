// ProcessingOrders.js

import React, { useState, useEffect } from 'react';

//orders 테이블에서 storeId 인 주문들만 가져오면 된다.
const ProcessingOrders = ({ processOrder }) => {

  const [orders, setOrders] = useState([]);

  // 주문 목록이 업데이트되면 로그에 출력
  useEffect(() => {
    const storeId = localStorage.getItem('storeId');
    console.log('storeId:', storeId);

    // SSE 이벤트 수신
    const sse = new EventSource(`/api/connect`);
  
    // sse.addEventListener('connect', async (event) => {
    //   const orderData = JSON.parse(event.data);
    //   console.log('connect event data: ', orderData);
    // });

    sse.addEventListener('connect', async (event) => {
      const { data: receiveConnectData } = event;
      console.log('connect event data: ', receiveConnectData);
    });

    sse.addEventListener('order', e => {
      const orderData = JSON.parse(e.data);
      console.log("order event data: ", orderData);
      setOrders((prevOrders) => [...prevOrders, orderData]);
    });
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
