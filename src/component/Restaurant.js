import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './Restaurant.css';

const Restaurant = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

    // 현재 로컬 스토리지의 장바구니 데이터를 불러옴
    const existingCartData = JSON.parse(localStorage.getItem('cart')) || [];

    // 새로 추가할 아이템
    const newItem = {
      item_id: selectedMenu.id,
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
    //'cart'가 아닌 'user_id'로 저장하도록
    localStorage.setItem('cart', JSON.stringify(existingCartData));

    const data = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(data);

    // 모달을 닫음
    setModalOpen(false);
  };

  //가게 정보 불러오기
  const [restaurantInfo, setRestaurantInfo] = useState('');

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // 서버에서 음식점 상세정보을 가져오는 API 호출 등의 로직
    axios.get(`/api/stores/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setRestaurantInfo(response.data)
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }, []);

  // 가게 정보
  // const restaurantInfo = {
  //   name: '엽기떡볶이',
  //   rating: 4.8,
  //   reviewCount: 300,
  //   minOrderAmount: 15000,
  // };

  return (
    <div className="Restaurant">
      <h2>{restaurantInfo.name}</h2>

      {/* 가게에 대한 정보 */}
      <div>
        <h3>가게 정보</h3>
        <p>별점: {restaurantInfo.rating}</p>
        <p>사진: {restaurantInfo.picture}</p>
        <p>상세설명: {restaurantInfo.content}</p>
        {/* <p>리뷰 수: {restaurantInfo.reviewCount}개</p> */}
        {/* <p>최소 주문 금액: {restaurantInfo.minOrderAmount}원</p> */}
      </div>

      {/* 위치 정보 */}
      <div>
        <h3>위치</h3>
        <p>{restaurantInfo.address}</p>
      </div>

      {/* 연락처 정보 */}
      <div>
        <h3>연락처</h3>
        <p>가게 전화번호: 02-1234-5678</p>
      </div>

      {/* 리뷰 섹션 */}
      <div>
        <h3>리뷰</h3>
        
      </div>

      {/* 메뉴 섹션 */}
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