import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import axios from 'axios';

const Wishlist = () => {

  const [wishlistStores, setWishlistStores] = useState([]);

  useEffect(() => {
    // 회원 정보 및 주문 내역을 서버에서 가져오는 로직
    axios.get('/api/bookmark', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setWishlistStores(response.data);
        return response;
      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="wishlist-container">
      <h2>찜목록</h2>
      <ul>
        {wishlistStores.map((bookmark) => (
          <li key={bookmark.storeId}>
            <div className="restaurant-info">
              {/* 해당 가게의 id를 이용하여 Restaurant.js로 이동하는 Link */}
              <Link to={`/restaurant/${bookmark.storeId}`} className="restaurant-name">
                {bookmark.storeName}
              </Link>
              {/* 나머지 정보 및 주문 버튼 등 */}
              <Link to={`/restaurant/${bookmark.storeId}`} className="order-link">
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