import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import { useAuth } from '../AuthContext';
const Cart = () => {
  const { userId } = useAuth();
  const initialCartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  const [cartItems, setCartItems] = useState(initialCartItems);
  useEffect(() => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  }, [cartItems, userId]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].amount = newQuantity;
    setCartItems(updatedCartItems);
  };

  const navigate = useNavigate();

  const handleRestaurantClick = (storeId) => {
    if (cartItems.length > 0) {
      navigate(`/restaurant/${storeId}`);
    }
  };

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>
          <div className="item-info">
            <span className="menu-name">{item.name}</span>
            <span className="quantity">수량: {item.amount}</span>
            <span className="price">가격: {item.price * item.amount}원</span>
          </div>
          <div className="item-actions">
            <input
              type="number"
              min="1"
              value={item.amount}
              onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
            />
            <button onClick={() => removeItem(index)}>삭제</button>
          </div>
        </div>
      ))}
      <button onClick={() => handleRestaurantClick(cartItems[0]?.storeId)}>더 담으러 가기</button>
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
