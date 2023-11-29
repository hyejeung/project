
// MenuNavbar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import './MenuNavbar.css';

const MenuNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { category } = useParams();

   // 현재 활성 버튼을 추적할 상태
   const [activeButton, setActiveButton] = useState(null);

   const handleButtonClick = (buttonName) => {
     setActiveButton(buttonName);
   };

  // 현재 위치가 MenuNavbar가 숨겨져야 하는 페이지인지 확인
  if (
    location.pathname === '/login' ||
    location.pathname === '/' ||
    location.pathname === '/sns-signup' ||
    location.pathname === '/signup' ||
    location.pathname === '/add-menu' ||
    location.pathname === '/wishlist' ||
    location.pathname === '/payment' ||
    location.pathname === '/cart' ||
    (location.pathname.startsWith('/restaurant/') && !id) || // 수정된 부분
    (location.pathname.startsWith('/category/') && !category) || // 수정된 부분
    location.pathname === '/mypage' ||
    location.pathname === '/general-manager'||
    location.pathname === '/register'
  ) {
    return null;
  }

  return (
    <header>
      <div className="header-menu">
        <Link
          to="/managermain"
          className={`order-management-page ${activeButton === 'order-management-page' ? 'active' : ''}`}
          onClick={() => handleButtonClick('order-management-page')}
        >
          주문 관리 페이지
        </Link>
        <Link
          to="/store-info-edit"
          className={`store-info-edit ${activeButton === 'store-info-edit' ? 'active' : ''}`}
          onClick={() => handleButtonClick('store-info-edit')}
        >
          가게 정보 수정
        </Link>
        <Link
          to="/menu-management"
          className={`menu-management ${activeButton === 'menu-management' ? 'active' : ''}`}
          onClick={() => handleButtonClick('menu-management')}
        >
          메뉴 관리
        </Link>
        <Link
          to="/manager-mypage"
          className={`manager-mypage ${activeButton === 'manager-mypage' ? 'active' : ''}`}
          onClick={() => handleButtonClick('manager-mypage')}
        >
          마이페이지
        </Link>
        <Link
          to="/sales"
          className={`sales ${activeButton === 'sales' ? 'active' : ''}`}
          onClick={() => handleButtonClick('sales')}
        >
          매출 관리
        </Link>
        <Link to="/login">로그아웃</Link>
      </div>
    </header>
  );
};

export default MenuNavbar;