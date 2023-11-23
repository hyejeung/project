// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ handleSearchChange, isLoggedIn, handleLogout }) => {
  const location = useLocation();

  // 특정 페이지에서는 렌더링하지 않음
  if (
    location.pathname === '/managermain' ||
    location.pathname === '/login' ||
    location.pathname === '/sns-signup' ||
    location.pathname === '/signup' ||
    location.pathname === '/add-menu' ||
    location.pathname === '/store-info-edit'||
    location.pathname === '/register'

  ) {
    return null;
  }

  return (
    <header>
      <div className="header-left">
        {/* "배달및 주문서비스"를 클릭 가능한 링크로 만듭니다. */}
        <Link to="/" className="nav-link">
          <h1>배달및 주문서비스</h1>
        </Link>
      </div>
      <div className="header-right">
        <input type="text" placeholder="검색" onChange={handleSearchChange} />
        <Link to="/mypage" className="nav-link">
          마이페이지
        </Link>
        <Link to="/wishlist" className="nav-link">
          찜목록
        </Link>
        <Link to="/cart" className="nav-link">
          장바구니
        </Link>
        {isLoggedIn ? (
          <button className="nav-link" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <Link to="/login" className="nav-link">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
