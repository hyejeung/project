// InProgressOrders.js

import React from 'react';
import './InProgressOrder.css';

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
          <div className='progress-buttons'>
            <button onClick={() => processOrder(order.order_id, 'COMP')}>배달</button>
            <button onClick={() => processOrder(order.order_id, 'CANCEL')}>취소</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InProgressOrders;
// InProgressOrders.js

// import React, { useState } from 'react';
// import './InProgressOrder.css';

// const InProgressOrders = ({ processOrder }) => {
//   const [orders, setOrders] = useState([
//     {
//       order_id: 1,
//       orderItems: [
//         { itemName: '아메리카노', count: 2, orderPrice: 4000 },
//         { itemName: '카페라떼', count: 1, orderPrice: 4500 },
//       ],
//     },
//     {
//       order_id: 2,
//       orderItems: [
//         { itemName: '헤이즐넛 라떼', count: 1, orderPrice: 5000 },
//         { itemName: '크로아상', count: 3, orderPrice: 6000 },
//       ],
//     },
//     // Add more sample orders as needed
//   ]);

//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//   };

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };

//   return (
//     <div className="order-list">
//       <h2>처리중인 주문 목록</h2>
//       {orders.map((order) => (
//         <div className='order-item' key={order.order_id} onClick={() => handleOrderClick(order)}>
//           {order.orderItems.map((item) => (
//             <div key={item.itemName}>
//               <span>메뉴명: {item.itemName}</span>
//               <span>수량: {item.count}</span>
//               <span>가격: {item.orderPrice}원</span>
//             </div>
//           ))}
//           <div className='progress-buttons'>
//             <button onClick={() => processOrder(order.order_id, 'COMP')}>배달</button>
//             <button onClick={() => processOrder(order.order_id, 'CANCEL')}>취소</button>
//           </div>
//         </div>
//       ))}

//       {selectedOrder && (
//         <div className={`order-detail-modal ${selectedOrder ? 'show' : ''}`}>
//           <h2>주문 상세 정보</h2>
//           {/* Add properties to display */}
//           <span>주문일자: {selectedOrder.orderDate}</span>
//           <span>주문 상품: {selectedOrder.menuName}</span>
//           <span>총 가격: {selectedOrder.totalPrice}원</span>
//           <button onClick={handleCloseModal}>닫기</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InProgressOrders;
