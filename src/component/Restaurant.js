import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import './Restaurant.css';
import { useParams } from 'react-router';
import { useAuth } from '../AuthContext'; // AuthContext 불러오기


const Restaurant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // 페이지당 항목 수
  const [offset, setOffset] = useState(0);
  const [totalData, setTotalData] = useState(100);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('menu');

  //isLiked로 즐겨찾기 음식점인지 확인, likeCount로 이 음식점을 즐겨찾기 한 사람들 수 저장
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    image: '',
    rating: 0,
    reviewCount: 0,
    minOrderAmount: 0,
  });
  const [reviews, setReviews] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const { id } = useParams();
  const userId = localStorage.getItem('user_id'); // 사용자 ID 불러오기

  useEffect(() => {
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
        setMenuList(response.data.content);
        setTotalData(response.data.totalData); // 수정: 전체 항목의 수 설정
      })
      .catch(error => console.error('Error fetching restaurant info:', error));

    // axios.get('/api/reviews', {
    //   params: {
    //     offset: offset,
    //     limit: perPage,
    //   },
    // })
    //   .then(response => setReviews(response.data))
    //   .catch(error => console.error('Error fetching reviews:', error));

    axios.get(`/api/bookmark/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setIsLiked(response.data.status);
        setLikeCount(response.data.count);
      })
  }, [offset, perPage, userId]);

  const handleMenuButtonClick = (menu) => {
    setModalOpen(true);
    setSelectedMenu(menu);
  };

  const handleAddToCart = () => {
    // 현재 로컬 스토리지의 장바구니 데이터를 불러옴
    const existingCartData = JSON.parse(localStorage.getItem(userId)) || [];

    // 새로 추가할 아이템
    const newItem = {
      itemId: selectedMenu.itemId,
      amount: quantity,
    };

    // 이미 장바구니에 있는 아이템이라면 수량을 더함
    const existingItemIndex = existingCartData.findIndex(item => item.itemId === newItem.itemId);
    if (existingItemIndex !== -1) {
      existingCartData[existingItemIndex].amount += newItem.amount;
    } else {
      // 장바구니에 없는 아이템이라면 새로 추가
      existingCartData.push(newItem);
    }

    // 새로운 장바구니 데이터를 로컬 스토리지에 저장
    localStorage.setItem(userId, JSON.stringify(existingCartData));

    // 모달을 닫음
    setModalOpen(false);
  };

  //isLiked = true 이면 찜목록 추가 코드, false이면 찜목록 삭제 코드
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    console.log('isLiked:', isLiked);

    if (isLiked === false) {
      axios.post(`/api/bookmark/${id}`, null, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      })
      .then (response => {console.log(response.data)})
      .catch (error => console.error('Error bookmark add', error));
    }
    else if (isLiked === true) {
      axios.delete(`/api/bookmark/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      })
      .catch (error => console.error('Error bookmark delete', error));
    }
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
      <div className="tab-buttons">
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
                {/* <img src={menu.image} alt={menu.itemName} style={{ width: '150px', height: '150px', marginRight: '10px' }} /> */}
                {menu.itemName} - {menu.price}원
              </li>
            ))}
          </ul>
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
           <Pagination
            activePage={currentPage}
            itemsCountPerPage={perPage}
            totalItemsCount={totalData} // 리뷰 데이터의 총 개수로 설정
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

      {/* <Pagination
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
      /> */}
    </div>
  );
};

export default Restaurant;
