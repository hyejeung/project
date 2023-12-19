// GeneralManager.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GeneralManager.css';

// 가맹점 신청 목록 모달 컴포넌트
const FranchiseApplicationsModal = ({ franchiseApplications, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>가맹점 신청 목록</h2>
        <ul>
          {franchiseApplications.map((franchise, index) => (
            <li key={index}>{franchise}</li>
          ))}
        </ul>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

// 가맹점 목록 모달 컴포넌트
const FranchiseListModal = ({ franchiseList, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>가맹점 목록</h2>
        <ul>
          {franchiseList.map((franchise, index) => (
            <li key={index}>{franchise}</li>
          ))}
        </ul>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

const GeneralManager = () => {
  const [franchiseApplications, setFranchiseApplications] = useState([
    '엽기떡볶이',
    '신전떡볶이',
    '버거킹'
  ]);
  const [franchiseList, setFranchiseList] = useState([
    '맥도날드',
    '스타벅스',
    'KFC'
  ]);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);
  const [isFranchiseApplicationsModalOpen, setIsFranchiseApplicationsModalOpen] = useState(false);

  const handleActionClick = (application, action) => {
    console.log(`${application} 가맹점을 ${action}합니다.`);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleFranchiseModal = () => {
    setIsFranchiseModalOpen(!isFranchiseModalOpen);
  };

  const toggleFranchiseApplicationsModal = () => {
    setIsFranchiseApplicationsModalOpen(!isFranchiseApplicationsModalOpen);
  };



  return (
    <div className="general-manager-page">
      <header>
        <div className="header-left">
          <h1>총관리자 페이지</h1>
        </div>
        <div className="header-right">
          <button onClick={handleLogout}>로그아웃</button>
          {/* "가맹점 신청 목록" 버튼 클릭 시 모달 열기 */}
          <button onClick={toggleFranchiseApplicationsModal}>가맹점 신청 목록</button>
          <button onClick={toggleFranchiseModal}>가맹점 목록</button>
        </div>
      </header>

      <div className="franchise-applications">
        <h2>가맹점 신청 현황</h2>
        {franchiseApplications.map((application) => (
          <div key={application} className="franchise-application">
            <p>{application} 가맹점</p>
            <div className="action-buttons">
              <button
                className="accept"
                onClick={() => handleActionClick(application, '수락')}
              >
                수락
              </button>
              <button
                className="reject"
                onClick={() => handleActionClick(application, '거절')}
              >
                거절
              </button>
            </div>
          </div>
        ))}
      </div>

     
     {/* isFranchiseApplicationsModalOpen이 true일 때 가맹점 신청 목록 모달 열기 */}
     {isFranchiseApplicationsModalOpen && (
        <FranchiseApplicationsModal
          franchiseApplications={franchiseApplications}
          onClose={toggleFranchiseApplicationsModal}
        />
      )}

      {/* isFranchiseModalOpen이 true일 때 가맹점 목록 모달 열기 */}
      {isFranchiseModalOpen && (
        <FranchiseListModal
          franchiseList={franchiseList}
          onClose={toggleFranchiseModal}
        />
      )}
    </div>
  );
};

export default GeneralManager;