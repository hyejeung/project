// ProcessingOrders.js

import React, { useState } from 'react';
import './ProcessingOrders.css';

//orders 테이블에서 storeId 인 주문들만 가져오면 된다.
const ProcessingOrders = ({ orders, processOrder }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAcceptOrder = (orderId) => {
    processOrder(orderId, 'READY');
  };

  const handleRejectOrder = (orderId) => {
    processOrder(orderId, 'CANCEL');
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  let totalPrice = 0;

  return (
    <div className="order-list">
      <h2>접수 대기</h2>
      {orders.map((order) => {
        totalPrice = 0; // Reset total price for each order
        order.orderItems.forEach((item) => {
          totalPrice += item.orderPrice;
        });
        
        return (
          <div className='order-item' key={order.order_id} onClick={() => handleOrderClick(order)}>
            {order.orderItems.map((item) => (
              <div key={item.itemName}>
                <span>메뉴명: {item.itemName}</span>
                <span>수량: {item.count}</span>
                <span>가격: {item.orderPrice}원</span>
              </div>
            ))}
            <span>총가격: {totalPrice}원</span>
            <div className='process-buttons'>
              <button onClick={() => processOrder(order.order_id, 'READY')}>수락</button>
              <button onClick={() => processOrder(order.order_id, 'CANCEL')}>거절</button>
            </div>
          </div>
        )
      })}

      {selectedOrder && (
        <div className="order-detail-modal">
          <h2>주문 상세 정보</h2>
          <span>주문일자: {selectedOrder.orderDate}</span>
          <span>주문 상품: {selectedOrder.menuName}</span>
          <span>총 가격: {selectedOrder.totalPrice}원</span>
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default ProcessingOrders;
