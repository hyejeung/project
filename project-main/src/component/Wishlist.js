import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import Restaurant from './Restaurant';
const Wishlist = () => {
  
    const wishlistItems = [
             { id: 1, name: '엽기떡볶이' },
            { id: 2, name: '서브웨이' },
            { id: 3, name: '버거킹' },
            // 필요에 따라 더 많은 아이템 추가
          ];

          return (
            <div className="wishlist-container">
              <h2>찜목록</h2>
              <ul>
                {wishlistItems.map((item) => (
                  <li key={item.id}>
                    <div className="restaurant-info">
                      {/* 해당 가게의 id를 이용하여 Restaurant.js로 이동하는 Link */}
                      <Link to={`/restaurant/${item.id}`} className="restaurant-name">
                        {item.name}
                      </Link>
                      {/* 나머지 정보 및 주문 버튼 등 */}
                      <Link to={`/restaurant/${item.id}`} className="order-link">
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