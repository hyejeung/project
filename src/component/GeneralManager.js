// GeneralManager.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GeneralManager.css';

const GeneralManager = () => {
  const franchiseApplications = ['엽기떡볶이', '신전떡볶이', '버거킹'];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = (application, action) => {
    console.log(`${application} 가맹점을 ${action}합니다.`);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="general-manager-page">
      <header>
        <div className="header-left">
          <h1>총관리자 페이지</h1>
        </div>
        <div className="header-right">
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={toggleModal}>가맹점 목록</button>
        </div>
      </header>

      <div className="franchise-applications">
        <h2>가맹점 신청 현황</h2>
        {franchiseApplications.map((application) => (
          <div key={application} className="franchise-application">
            <p>{application} 가맹점</p>
            <div className="action-buttons">
              <button
                className="accept" // 새로운 클래스 추가: 초록색 배경
                onClick={() => handleActionClick(application, '수락')}
              >
                수락
              </button>
              <button
                className="reject" // 새로운 클래스 추가: 빨간색 배경
                onClick={() => handleActionClick(application, '거절')}
              >
                거절
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>가맹점 목록</h2>
            <ul>
              {franchiseApplications.map((franchise, index) => (
                <li key={index}>{franchise}</li>
              ))}
            </ul>
            <button onClick={toggleModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralManager;
