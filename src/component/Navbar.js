// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ handleSearchChange }) => {
  const { isLoggedIn, handleLogout } = useAuth();
  const location = useLocation();

  // 특정 페이지에서는 렌더링하지 않음
  if (
    location.pathname === '/managermain' ||
    location.pathname === '/login' ||
    location.pathname === '/sns-signup' ||
    location.pathname === '/signup' ||
    location.pathname === '/add-menu' ||
    location.pathname === '/store-info-edit' ||
    location.pathname === '/menu-management' ||
    location.pathname === '/menu-detail' ||
    location.pathname === '/sales' ||
    location.pathname === '/manager-mypage' ||
    location.pathname === '/general-manager' ||
    location.pathname === '/register'
  ) {
    return null;
  }

  return (
    <header>
      <div className="header-left">
        {/* "배달및 주문서비스"를 클릭 가능한 링크로 만듭니다. */}
        <Link to="/" className="nav-link">
          <FontAwesomeIcon icon={faMotorcycle} size="2x" /> {/* 크기 지정 (2배) */}
          <div class='header-title'>배달 및 주문서비스</div>
        </Link>
      </div>
      <div className="header-right">
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
          <Link to="/login" className="nav-link" onClick={handleLogout}>
            로그아웃
          </Link>
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
