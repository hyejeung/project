// ProcessingOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

//orders 테이블에서 storeId 인 주문들만 가져오면 된다.
const ProcessingOrders = ({ processOrder, storeId }) => {

  const [orders, setOrders] = useState([]);
  //임시용 storeId = 2
  const [store_id, setStoreId] = useState(2);

  //session storage에 storeId를 저장하는 코드 필요

  useEffect(() => {
    console.log('storeId:', store_id);
    // // 서버에서 해당 음식점의 주문 목록을 가져오는 API 호출 등의 로직
    // axios.get(`/api/orders/${storeId}`, {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(response => {
    //   setOrders(response.data)
    // })
    // .then(response => console.log(response.data))
    // .catch(error => console.log(error))

    // SSE 이벤트 수신
    const eventSource = new EventSource(`/api/orders/${store_id}`);
    
    eventSource.onmessage = (event) => {
      const orderData = JSON.parse(event.data);
      // 받아온 주문 데이터를 기존 주문 목록에 추가 또는 업데이트
      setOrders((prevOrders) => [...prevOrders, orderData]);
    };

    return () => {
      // 컴포넌트가 언마운트될 때 EventSource 연결 해제
      eventSource.close();
    };
  }, [store_id]);

  // 주문 목록이 업데이트되면 로그에 출력
  useEffect(() => {
    console.log('Updated Orders:', orders);
  }, [orders]);

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
