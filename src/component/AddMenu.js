// AddMenu.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddMenu.css';

const AddMenu = () => {
  const [menuName, setMenuName] = useState('');

  const handleAddMenu = () => {
    // TODO: 메뉴 추가 로직을 수행합니다.
    console.log(`메뉴 추가 시도: ${menuName}`);
    // 추가 후 필요한 로직을 수행하세요.

    // 메뉴 추가 후 메뉴 이름 초기화
    setMenuName('');
  };

  return (
    <div className="add-menu-container">
      <div className="header">
        <div className="header-left">
          <h1>메뉴 추가 페이지</h1>
        </div>
        {/* <div className="header-right">
          <Link to="/mypage" className="nav-link">마이페이지</Link>
          <Link to="/sales-management" className="nav-link">매출 관리</Link>
          <Link to="/store-info-edit" className="nav-link">가게 정보 수정</Link>
          <Link to="/add-menu" className="nav-link">메뉴 추가</Link>
        </div> */}
      </div>

      <div className="add-menu-content">
        <p>추가할 메뉴를 입력하세요:</p>
        <input
          type="text"
          placeholder="메뉴 이름"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
        />
        <button onClick={handleAddMenu}>추가</button>
      </div>

      <div className="go-back-link">
        <Link to="/managermain">뒤로 가기</Link>
      </div>
    </div>
  );
};

export default AddMenu;
