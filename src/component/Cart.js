import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem('user_id');
  console.log('userId:', userId);

  useEffect(() => {
    console.log(localStorage.getItem(userId));

    //장바구니 정보로 서버에서 필요한 정보들 가져오기
    axios.post('/api/cart', localStorage.getItem(userId), {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setCartItems(response.data);
      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  const removeItem = (index) => {
    const cart = JSON.parse(localStorage.getItem(userId));
    const updatedCartItems = [...cartItems];
    cart.splice(index, 1);
    updatedCartItems.splice(index, 1);
    localStorage.setItem(userId, JSON.stringify(cart));
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (index, itemId, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].count = newQuantity;
    setCartItems(updatedCartItems);

    // 현재 로컬 스토리지의 장바구니 데이터를 불러옴
    const existingCartData = JSON.parse(localStorage.getItem(userId)) || [];

    // 새로 추가할 아이템
    const newItem = {
      itemId: itemId,
      amount: newQuantity,
    };

    existingCartData[index].amount = newItem.amount;

    // 새로운 장바구니 데이터를 로컬 스토리지에 저장
    localStorage.setItem(userId, JSON.stringify(existingCartData));
  };

  const navigate = useNavigate();

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>
          <div className="item-info">
            <span className="menu-name">{item.name}</span>
            <span className="quantity">수량: {item.amount}</span>
            <span className="price">가격: {item.price}원</span>
          </div>
          <div className="item-actions">
            <button onClick={() => updateQuantity(index, item.item_id, Math.max(1, item.amount - 1))}>-</button>
            <button onClick={() => updateQuantity(index, item.item_id, item.amount + 1)}>+</button>
            <button onClick={() => removeItem(index)}>삭제</button>
          </div>
        </div>
      ))}
      {/* <button onClick={() => handleRestaurantClick(cartItems[0].restaurantId)}>더 담으러 가기</button> */}
      <div className="total-price">
        <span>총 주문 금액: {calculateTotalPrice()}원</span>
      </div>

      <Link to="/payment" className="order-button">
        주문하러 가기
      </Link>
    </div>
  );
};

export default Cart;
