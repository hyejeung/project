import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 장바구니 정보 가져오기
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    setLoading(false);
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행되도록 보장

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    // 변경된 장바구니 정보를 localStorage에 업데이트
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
    // 변경된 장바구니 정보를 localStorage에 업데이트
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
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
            <span className="menu-name">{item.menuName}</span>
            <span className="quantity">수량: {item.quantity}</span>
            <span className="price">가격: {item.price * item.quantity}원</span>
          </div>
          <div className="item-actions">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
            />
            <button onClick={() => removeItem(index)}>삭제</button>
          </div>
        </div>
      ))}
      <button onClick={() => cartItems.length > 0 && handleRestaurantClick(cartItems[0].restaurantId)}>더 담으러 가기</button>

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
