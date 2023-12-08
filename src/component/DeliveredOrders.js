// DeliveredOrders.js
import React, { useState } from 'react';
// import './DeliveredOrders.css';

const DeliveredOrders = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // 가짜 데이터 생성
  const fakeDeliveredOrders = [
    {
      orderDate: '2023-01-01 12:30 PM',
      deliveredTime: '1:30 PM',
      menuName: ' Menu 1',
      totalPrice: 20000,
    },
    {
      orderDate: '2023-01-02 2:45 PM',
      deliveredTime: '3:00 PM',
      menuName: ' Menu 2',
      totalPrice: 15000,
    },
    {
      orderDate: '2023-01-03 4:20 PM',
      deliveredTime: '5:00 PM',
      menuName: ' Menu 3',
      totalPrice: 18000,
    },
  ];

  // orders가 없거나 빈 배열일 경우 가짜 데이터를 사용
  if (!orders || orders.length === 0) {
    orders = fakeDeliveredOrders;
  }

  return (
    <div className="order-list">
      <h2>배달 완료</h2>
      {orders.map((order, index) => (
        <div className="order-item" key={index} onClick={() => handleOrderClick(order)}>
          <span>주문일자: {order.orderDate}</span>
          <span>배달 완료 시간: {order.deliveredTime}</span>
          <span>주문 상품: {order.menuName}</span>
          <span>총 가격: {order.totalPrice}원</span>
        </div>
      ))}

      {selectedOrder && (
        <div className="order-detail-modal">
          <h2>주문 상세 정보</h2>
          <span>주문일자: {selectedOrder.orderDate}</span>
          <span>배달 완료 시간: {selectedOrder.deliveredTime}</span>
          <span>주문 상품: {selectedOrder.menuName}</span>
          <span>총 가격: {selectedOrder.totalPrice}원</span>
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrders;
