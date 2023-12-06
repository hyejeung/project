import React, { useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import './Restaurant.css';

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
  const [likeCount, setLikeCount] = useState(100);
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
        setTotalData(response.data.totalData); // 수정: 전체 항목의 수 설정
      })
      .catch(error => console.error('Error fetching restaurant info:', error));
  
    axios.get('/api/reviews', {
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

    // 현재 로컬 스토리지의 장바구니 데이터를 불러옴
    const existingCartData = JSON.parse(localStorage.getItem('cart')) || [];

    // 새로 추가할 아이템
    const newItem = {
      item_id: selectedMenu.id,
      price: selectedMenu.price,
      amount: quantity,
    };

    // 이미 장바구니에 있는 아이템이라면 수량을 더함
    const existingItemIndex = existingCartData.findIndex(item => item.item_id === newItem.item_id);
    if (existingItemIndex !== -1) {
      existingCartData[existingItemIndex].amount += newItem.amount;
    } else {
      // 장바구니에 없는 아이템이라면 새로 추가
      existingCartData.push(newItem);
    }

    // 새로운 장바구니 데이터를 로컬 스토리지에 저장
    localStorage.setItem('cart', JSON.stringify(existingCartData));

    const data = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(data);

    axios.post("/api/orders", data)
    .then(res => {
      console.log("200", res.data);

      if (res.status === 200 || res.status === 201) {
        alert('주문 등록에 성공했습니다.');
      }
    })
    .catch(error => console.log(error))

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

  return (
    <div className="Restaurant">
      <img src={restaurantInfo.image} alt="가게 이미지" style={{ width: '800px', height: '300px' }} />
      <h2>{restaurantInfo.name}</h2>
      <div>
        <h3>가게 정보</h3>
        <p>별점: {restaurantInfo.rating}</p>
        <p>리뷰 수: {restaurantInfo.reviewCount}개</p>
        <p>최소 주문 금액: {restaurantInfo.minOrderAmount}원</p>
      </div>
      <div>
        <h3>위치</h3>
        <p>성북구 정릉동</p>
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
  prevPageText="<<"
  nextPageText=">>"
  firstPageText="<"  // 수정: 첫 페이지로 이동하는 버튼
  lastPageText=">"   // 수정: 마지막 페이지로 이동하는 버튼
  itemClass="page-item"
  linkClass="page-link"
  innerClass="pagination"
/>
    </div>
  );
};

export default Restaurant;
