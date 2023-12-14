import React, { useState } from 'react';

const InProgressOrders = ({ orders, processOrder }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDelivery = (orderId) => {
    processOrder(orderId, 'COMP');
  };

  const handleCancelOrder = (orderId) => {
    processOrder(orderId, 'CANCEL');
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="order-list">
      <h2>처리중인 주문 목록</h2>
      {orders.map((order) => (
        <div className='order-item' key={order.order_id} onClick={() => handleOrderClick(order)}>
          {order.orderItems.map((item) => (
            <div key={item.itemName}>
              <span>메뉴명: {item.itemName}</span>
              <span>수량: {item.count}</span>
              <span>가격: {item.orderPrice}원</span>
            </div>
          ))}
          <button onClick={() => handleDelivery(order.order_id)}>배달</button>
          <button onClick={() => handleCancelOrder(order.order_id)}>취소</button>
        </div>
      ))}

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

export default InProgressOrders;
