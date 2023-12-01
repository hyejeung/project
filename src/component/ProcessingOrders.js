// ProcessingOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

//orders 테이블에서 storeId 인 주문들만 가져오면 된다.
const ProcessingOrders = ({ processOrder, storeId }) => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log('storeId:', storeId);
    // 서버에서 해당 음식점의 주문 목록을 가져오는 API 호출 등의 로직
    axios.get(`/api/orders/${storeId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setOrders(response.data)
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }, []);

  return (
    <div className="order-list">
        <h2>접수 대기</h2>
        {orders.map((order) => (
          <div className='order-item' key={order.order_id}>
            {order.orderitems.map((item) => (
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
      {/* <div className="order-item">
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
      </div> */}
    </div>
  );
};

export default ProcessingOrders;
