
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';


const CartItem = ({ restaurantName, menuName, quantity, price }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <span className="menu-name">{menuName}</span>
        <span className="quantity">수량: {quantity}</span>
        <span className="price">가격: {price}원</span>
      </div>
    </div>
  );
};

const Cart = () => {
  const [itemInfo, setItemInfo] = useState([]);

  //localstorage에 있는 아이템 불러오기
  const existingCartData = JSON.parse(localStorage.getItem('cart')) || [];

  console.log('data 정보:', existingCartData);

  //불러온 다음 item에 대한 get 요청을 보내야 함 get/items
  axios.post('/api/carts', existingCartData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
  .then(res => {
    setItemInfo(res.data)
  })
  .then(res => console.log('response 데이터 값: ', res.data))
  .catch(error => console.log(error));

  const cartItems = [
    { restaurantName: '엽기떡볶이', menuName: '마라엽떡', quantity: 1, price: 16000 },
    { restaurantName: '엽기떡볶이', menuName: '주먹김밥', quantity: 1, price: 3000 },
    { restaurantName: '엽기떡볶이', menuName: '쿨피스', quantity: 1, price: 1000 },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      {itemInfo.map((item) => (
        <CartItem
          key={itemInfo.item_id}
          // restaurantName={item.name}
          menuName={item.name}
          quantity={item.amount}
          price={item.price}
        />
      ))}
       <div className="total-price">
        <span>총 주문 금액: {totalPrice}원</span>
      </div>
      <Link to="/payment" className="order-button">
        주문하러 가기
      </Link>
    </div>
  );
};

export default Cart;  