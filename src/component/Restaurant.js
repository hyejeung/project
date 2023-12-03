import React, { useState } from 'react';
import axios from 'axios';
import './Restaurant.css';

const Restaurant = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('menu'); // 추가

  const menuList = [
    { id: 1, name: '엽기떡볶이', price: 15000 },
    { id: 2, name: '엽기닭볶음탕', price: 23000 },
    // 다른 메뉴들도 추가할 수 있습니다.
  ];

  const handleMenuButtonClick = (menu) => {
    setModalOpen(true);
    setSelectedMenu(menu);
  };

  const handleAddToCart = () => {
    // 이전 코드 유지

    // 모달을 닫음
    setModalOpen(false);
  };

  // 가게 정보
  const restaurantInfo = {
    name: '엽기떡볶이',
    rating: 4.8,
    reviewCount: 300,
    minOrderAmount: 15000,
  };

  // 리뷰 섹션
  const reviews = [
    { id: 1, user: 'user1', content: '맛있어요!', rating: 5 },
    { id: 2, user: 'user2', content: '좋아요!', rating: 4.5 },
    // 다른 리뷰들도 추가할 수 있습니다.
  ];

  return (
    <div className="Restaurant">
      <h2>{restaurantInfo.name}</h2>
      {/* 찜 갯수 */}
      <div>
        <span role="img" aria-label="heart">❤️</span> 100
      </div>
      {/* 최소 주문 금액 */}
      <div>
        <h3>최소 주문 금액</h3>
        <p>{restaurantInfo.minOrderAmount}원</p>
      </div>
      {/* 예상 배달 시간 */}
      <div>
        <h3>예상 배달 시간</h3>
        <p>30분</p>
      </div>
      {/* 배달 팁 */}
      <div>
        <h3>배달 팁</h3>
        <p>3000원</p>
      </div>
      {/* 탭 선택 */}
      <div>
        <button onClick={() => setSelectedTab('menu')}>메뉴</button>
        <button onClick={() => setSelectedTab('info')}>정보</button>
        <button onClick={() => setSelectedTab('reviews')}>리뷰</button>
      </div>
      {/* 선택된 탭에 따라 내용 표시 */}
      {selectedTab === 'menu' && (
        // 메뉴 섹션
        <div>
          <h3>메뉴</h3>
          <ul>
            {menuList.map((menu) => (
              <li key={menu.id} onClick={() => handleMenuButtonClick(menu)}>
                {menu.name} - {menu.price}원
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedTab === 'info' && (
        // 정보 섹션
        <div>
          <h3>가게 정보</h3>
          <p>별점: {restaurantInfo.rating}</p>
          <p>리뷰 수: {restaurantInfo.reviewCount}개</p>
          <p>최소 주문 금액: {restaurantInfo.minOrderAmount}원</p>
        </div>
      )}
      {selectedTab === 'reviews' && (
        // 리뷰 섹션
        <div>
          <h3>리뷰</h3>
          {reviews.map((review) => (
            <div key={review.id}>
              <p>{review.user}</p>
              <p>{review.content}</p>
              <p>별점: {review.rating}</p>
            </div>
          ))}
        </div>
      )}
      {/* 모달 */}
      {modalOpen && selectedMenu && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedMenu.name}</h2>
            <p>가격: {selectedMenu.price}원</p>
            <label htmlFor="quantity">수량:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
            />
            <button onClick={handleAddToCart}>장바구니에 담기</button>
            <button onClick={() => setModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
