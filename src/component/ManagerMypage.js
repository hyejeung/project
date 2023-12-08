import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ManagerMypage.css';

const ManagerMypage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '사용자 이름',
    email: 'abc@google.com',
    phone: '010-1234-5678',
    password: '********',
    gender: '남성',
    point: 1000,
    grade: 'gold',
    address: '서울특별시 성북구 서경로 123번지',
  });

  const [isModalOpen, setModalOpen] = useState(false);

  // 수정된 부분: 수정 완료 버튼을 눌렀을 때만 상태 업데이트
  const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo });

  useEffect(() => {
    // 회원 정보 및 주문 내역을 서버에서 가져오는 로직
    axios.get('/api/user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setUserInfo(response.data);
        // 수정된 부분: 모달이 열릴 때만 상태 초기화
        setUpdatedUserInfo(response.data);
        return response;
      })
      .catch(error => console.log(error));

  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put('/api/user', updatedUserInfo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });

      console.log('업데이트 성공:', response.data); // 추가한 로그

      setUserInfo(response.data);
      setModalOpen(false); // 수정 성공 시 모달 닫기
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error.message);
      // 에러 핸들링 로직 추가
    }
  };
  

  const handleWithdrawal = () => {
    const confirmWithdrawal = window.confirm('정말로 회원을 탈퇴하시겠습니까?');

    if (confirmWithdrawal) {
      try {
        // Logic for user withdrawal
        // 예: const response = await withdrawUser();
        // Additional logic to handle successful withdrawal
      } catch (error) {
        console.error('회원탈퇴 실패:', error.message);
        // 에러 핸들링 로직 추가
      }
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="my-page-container">
      <h2>마이페이지</h2>
      <p>사용자 이름: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>전화번호: {userInfo.phone}</p>
      {/* <p>비밀번호: {userInfo.password}</p> */}
      <p>성별: {userInfo.gender}</p>
      <p>주소: {userInfo.address}</p>
      <button onClick={openModal}>회원정보 수정</button>
      <button onClick={handleWithdrawal}>회원탈퇴</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>회원정보 수정</h2>
            <div>
              <label htmlFor="updatedUsername"> 사용자 이름</label>
              <input
                type="text"
                id="updatedUsername"
                value={updatedUserInfo.name}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updatedEmail">이메일</label>
              <input
                type="text"
                id="updatedEmail"
                value={updatedUserInfo.email}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updatedPhoneNumber"> 전화번호</label>
              <input
                type="text"
                id="updatedPhoneNumber"
                value={updatedUserInfo.phone}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updatedAddress"> 주소</label>
              <input
                type="text"
                id="updatedAddress"
                value={updatedUserInfo.address}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, address: e.target.value })
                }
              />
            </div>
            <div>
              <button className="update-button" onClick={handleUpdate}>
                수정 완료
              </button>
              <button className="close-button" onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerMypage;
