import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import './Restaurant.css';
import { useParams } from 'react-router';
import { useAuth } from '../AuthContext';

const Restaurant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
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
  const [bookmarkList, setBookmarkList] = useState([]);
  const { id } = useParams();
  const { userId } = useAuth();

  // 함수 선언
  const handleMenuButtonClick = (menu) => {
    setModalOpen(true);
    setSelectedMenu(menu);
  };

 
  const handleAddToCart = () => {
    const userCartKey = `cart_${userId}`; // userId를 사용하여 키 생성
    const existingCartData = JSON.parse(localStorage.getItem(userCartKey)) || [];

    const newItem = {
      itemId: selectedMenu.itemId,
      name: selectedMenu.itemName,
      price: selectedMenu.price,
      amount: quantity,
      storeId: selectedMenu.storeId,
    };

    const existingItemIndex = existingCartData.findIndex(item => item.itemId === newItem.itemId);
    if (existingItemIndex !== -1) {
      existingCartData[existingItemIndex].amount += newItem.amount;
    } else {
      existingCartData.push(newItem);
    }

    localStorage.setItem(userCartKey, JSON.stringify(existingCartData));
    setModalOpen(false);
  };


  useEffect(() => {
    const userCartKey = `cart_${userId}`;
    const existingCartData = JSON.parse(localStorage.getItem(userCartKey)) || [];
  
    axios.get(`/api/bookmark/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likeCount);
      })
      .catch(error => console.error('Error fetching bookmark info:', error));
  
    // 여기에서 로컬 스토리지에서 찜 상태 가져오기
    const storedIsLiked = localStorage.getItem('isLiked_' + id);
    if (storedIsLiked !== null) {
      setIsLiked(storedIsLiked === 'true');
    }
  
    axios.get(`/api/stores/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => setRestaurantInfo(response.data))
      .catch(error => console.error('Error fetching menu list:', error));
  
    axios.get(`/api/items/${id}`, {
      params: {
        offset: offset,
        limit: perPage,
        size: 5
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        const menuData = response.data.content.map(menu => ({
          ...menu,
          name: menu.itemName,
        }));
        setMenuList(menuData);
        setTotalData(response.data.totalData);
      })
      .catch(error => console.error('Error fetching restaurant info:', error));
  }, [offset, perPage, userId, id]);  // id 추가

  const handleLike = () => {
    const newIsLiked = !isLiked;

    axios.post(`/api/bookmark/${id}`, null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        localStorage.setItem('isLiked_' + id, newIsLiked); 
        setIsLiked(newIsLiked);

        if (newIsLiked) {
          setLikeCount(likeCount + 1);
        } else {
          setLikeCount(likeCount - 1);
        }

        // 로컬 스토리지에 찜 상태 저장
        localStorage.setItem('isLiked_' + id, newIsLiked);
      })
      .catch(error => console.error('Error adding/removing restaurant to/from bookmarks:', error));
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * perPage);
  };


  return (
    <div className="Restaurant">
      <img src={restaurantInfo.image} alt="가게 이미지" style={{ width: '800px', height: '300px' }} />
      <h2>{restaurantInfo.name}</h2>
      <div>
        <button
          onClick={handleLike}
          style={{ color: isLiked ? 'red' : 'black' }}
        >
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
              <li key={menu.itemId} onClick={() => handleMenuButtonClick(menu)}>
                {menu.itemName} - {menu.price}원
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
        firstPageText="<<"
        lastPageText=">>"
        itemClass="page-item"
        linkClass="page-link"
        innerClass="pagination"
      />
    </div>
  );
};

export default Restaurant;