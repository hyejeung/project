import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyPage from './component/Mypage';
import Wishlist from './component/Wishlist';
import Cart from './component/Cart';
import Payment from './component/Payment';
import Restaurant from './component/Restaurant';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';



const Category = ({ name }) => {
  return (
    <div className="category">
      {name}
    </div>
  );
};

const RestaurantCard = ({ name }) => {
  return (
    <div className="restaurant-card">
      {name}
    </div>
  );
};

const MainPage = ({ restaurants, searchQuery, handleSearchChange, handleLogout }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div className="App">
      <header>
        <div className="header-left">
          <h1>배달및 주문서비스</h1>
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder="검색"
            value={searchQuery}
            onChange={handleSearchChange}
          />
         /{/* 통일된 스타일을 적용한 로그아웃, 마이페이지, 찜목록, 장바구니 링크 */}
          <button className="nav-link" onClick={handleLogout}>로그아웃</button>
          <Link to="/mypage" className="nav-link">마이페이지</Link>
          <Link to="/wishlist" className="nav-link">찜목록</Link>
          <Link to="/cart" className="nav-link">장바구니</Link>

        </div>
      </header>
      <main>
        <div className="categories">
          <Category name="배달" />
          <Category name="한식" />
            <Category name="분식" />
            <Category name="일식" />
            <Category name="치킨" />
            <Category name="피자" />
            <Category name="중식" />
            <Category name="족발" />
            <Category name="야식" />
            <Category name="도시락" />
            <Category name="디저트" />
        </div>
        <Slider className="main-slider" {...settings}>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} name={restaurant} />
          ))}
        </Slider>
        <div className="restaurants">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} name={restaurant} />
          ))}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [restaurants, setRestaurants] = useState([
    '엽기떡볶이',
    '교촌치킨',
    '반올림피자샵',
    '배스킨라빈스',
    '원할머니보쌈',
    '홍콩반점',
    '버거킹',
    '서브웨이'
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 서버에서 음식점 목록을 가져오는 API 호출 등의 로직
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // 검색어에 따라 음식점을 필터링하거나 서버에 검색 요청을 보낼 수 있는 로직
  };

  const handleLogout = () => {
    // 로그아웃 로직
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              restaurants={restaurants}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              handleLogout={handleLogout}
            />
          }
        />
        <Route path="/mypage" element={<MyPage />} /> 
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
