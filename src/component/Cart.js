
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    //localstorage에 있는 아이템 불러오기 'cart'가 아니라 'user_id'가 들어가야 함
    const existingCartData = JSON.parse(localStorage.getItem('cart')) || [];

    //user정보는 로그인 정보에서 가져오면 된다.
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
  }, []);

  // const cartItems = [
  //   { restaurantName: '엽기떡볶이', menuName: '마라엽떡', quantity: 1, price: 16000 },
  //   { restaurantName: '엽기떡볶이', menuName: '주먹김밥', quantity: 1, price: 3000 },
  //   { restaurantName: '엽기떡볶이', menuName: '쿨피스', quantity: 1, price: 1000 },
  // ];

  const totalPrice = itemInfo.reduce((total, item) => total + item.price * item.amount, 0);

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      {itemInfo.map((item) => (
        <CartItem
          key={item.item_id}
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