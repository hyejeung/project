import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import './Restaurant.css';

// Axios 설정에 공통 헤더 추가
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
axios.defaults.headers.common['Content-Type'] = 'application/json';

const Restaurant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // 페이지당 항목 수
  const [offset, setOffset] = useState(0);
  const [totalData, setTotalData] = useState(100);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('menu');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(50);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    image: '',
    rating: 0,
    reviewCount: 0,
    minOrderAmount: 0,
  });
  const [reviews, setReviews] = useState([]);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('storeId');

    axios.get(`api/stores/${id}`)
      .then(response => setMenuList(response.data))
      .catch(error => console.error('Error fetching menu list:', error));

    axios.get('/api/restaurant', {
      params: {
        offset: offset,
        limit: perPage,
      },
    })
      .then(response => {
        setRestaurantInfo(response.data);
        setTotalData(response.data.totalData);
      })
      .catch(error => console.error('Error fetching restaurant info:', error));

    axios.get('/api/review', {
      params: {
        offset: offset,
        limit: perPage,
      },
    })
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [offset, perPage]);

  const handleMenuButtonClick = (menu) => {
    setModalOpen(true);
    setSelectedMenu(menu);
  };

  const handleAddToCart = () => {
    // 이전 코드 유지
    setModalOpen(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * perPage); // 수정: perPage를 곱해서 오프셋 설정
  };
  return (
    <div className="Restaurant">
      <img src={restaurantInfo.image} alt="가게 이미지" style={{ width: '800px', height: '300px' }} />
      <h2>{restaurantInfo.name}</h2>
      <div>
        <button onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <span role="img" aria-label="heart"> {likeCount}</span>
      </div>
      <div>
        <h3>최소 주문 금액</h3>
        <p>{restaurantInfo.minOrderAmount}원</p>
      </div>
      <div>
        <h3>예상 배달 시간</h3>
        <p>30분</p>
      </div>
      <div>
        <h3>배달 팁</h3>
        <p>3000원</p>
      </div>
      <div>
        <button onClick={() => setSelectedTab('menu')}>메뉴</button>
        <button onClick={() => setSelectedTab('info')}>정보</button>
        <button onClick={() => setSelectedTab('reviews')}>리뷰</button>
      </div>

      {selectedTab === 'menu' && (
        <div>
          <h3>메뉴</h3>
          <ul>
            {menuList.map((menu) => (
              <li key={menu.id} onClick={() => handleMenuButtonClick(menu)}>
                <img src={menu.image} alt={menu.name} style={{ width: '150px', height: '150px', marginRight: '10px' }} />
                {menu.name} - {menu.price}원
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTab === 'info' && (
        <div>
          <h3>가게 정보</h3>
          <p>별점: {restaurantInfo.rating}</p>
          <p>리뷰 수: {restaurantInfo.reviewCount}개</p>
          <p>최소 주문 금액: {restaurantInfo.minOrderAmount}원</p>
        </div>
      )}
      {selectedTab === 'reviews' && (
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

      {modalOpen && selectedMenu && (
        <div className="restaurant-modal-overlay">
          <div className="restaurant-modal">
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

<Pagination
  activePage={currentPage}
  itemsCountPerPage={perPage}
  totalItemsCount={totalData}
  pageRangeDisplayed={5}
  onChange={handlePageChange}
  prevPageText="<"
  nextPageText=">"
  firstPageText="<<"  // 수정: 첫 페이지로 이동하는 버튼
  lastPageText=">>"   // 수정: 마지막 페이지로 이동하는 버튼
  itemClass="page-item"
  linkClass="page-link"
  innerClass="pagination"
/>
    </div>
  );
};

export default Restaurant;
