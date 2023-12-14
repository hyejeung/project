import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    axios.get('/api/bookmark', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // 중복을 방지하기 위해 기존 wishlistItems 배열에서 중복된 아이템 제거
      const uniqueWishlistItems = response.data.filter(item => (
        !wishlistItems.some(existingItem => existingItem.storeId === item.storeId)
      ));
      // 기존 wishlistItems와 새로 받은 데이터를 합쳐서 설정
      setWishlistItems(prevItems => [...prevItems, ...uniqueWishlistItems]);
      return response;
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }, []);



  return (
    <div className="wishlist-container">
      <h2>찜목록</h2>
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.id}>
            <div className="restaurant-info">
              {/* 해당 가게의 id를 이용하여 Restaurant.js로 이동하는 Link */}
              <Link to={`/restaurant/${item.storeId}`} className="restaurant-name">
        {item.storeName}
      </Link>
      {/* 나머지 정보 및 주문 버튼 등 */}
      <Link to={`/restaurant/${item.storeId}`} className="order-link">
        배달주문하러 가기
      </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
