import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPage.css'; // 스타일링을 위한 CSS 파일을 import

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: '사용자 이름',
    email: 'abc@google.com',
    phoneNumber: '010-1234-5678',
    password: '********',
    gender: '남성',
    points: 1000,
    grade: 'gold',
    address: '서울특별시 성북구 서경로 123번지',
  });

  const [orderHistory, setOrderHistory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setOrderHistoryModalOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo });

  useEffect(() => {
    // 회원 정보 및 주문 내역을 서버에서 가져오는 로직
    axios.get('/api/member')
      .then(response => {
        setUserInfo(response.data);
        return response;
      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));

    axios.get('/api/orders')
      .then(response => {
        setOrderHistory(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleUpdate = async () => {
    try {
      // 사용자 정보 업데이트 로직
      // const response = await updateUser(updatedUserInfo);
      setUserInfo(updatedUserInfo);
      setModalOpen(false); // 업데이트 성공 시 모달 닫기
      // 업데이트 성공에 대한 추가적인 로직
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error.message);
      // 에러 핸들링 로직 추가
    }
  };

  const handleWithdrawal = () => {
    const confirmWithdrawal = window.confirm('정말로 회원을 탈퇴하시겠습니까?');

    if (confirmWithdrawal) {
      try {
        // 회원 탈퇴 로직
        // const response = await withdrawUser();
        // 탈퇴 성공에 대한 추가적인 로직
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

  const viewOrderHistory = () => {
    setOrderHistoryModalOpen(true);
  };

  const closeOrderHistoryModal = () => {
    setOrderHistoryModalOpen(false);
  };

  return (
    <div className="my-page-container">
      <h2>마이페이지</h2>
      <p>사용자 이름: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>전화번호: {userInfo.phone}</p>
      <p>비밀번호: {userInfo.password}</p>
      <p>성별: {userInfo.gender}</p>
      <p>적립금: {userInfo.points} 포인트</p>
      <p>등급: {userInfo.grade}</p>
      <p>주소: {userInfo.address}</p>
      <button onClick={viewOrderHistory}>주문내역</button>
      <button onClick={openModal}>회원정보 수정</button>
      <button onClick={handleWithdrawal}>회원탈퇴</button>
      


      {/* 수정 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>회원정보 수정</h2>
            <div>
              <label htmlFor="updatedUsername"> 사용자 이름</label>
              <input
                type="text"
                id="updatedUsername"
                value={updatedUserInfo.username}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, username: e.target.value })
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
                value={updatedUserInfo.phoneNumber}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updatedPassword"> 비밀번호</label>
              <input
                type="password"
                id="updatedPassword"
                value={updatedUserInfo.password}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, password: e.target.value })
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
    
      {/* 주문 내역 모달 */}
      {isOrderHistoryModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>주문 내역</h2>
            {/* 주문 내역에 대한 정보를 표시하는 UI 추가 */}
            {/* ... (주문 내역 정보 표시하는 부분) ... */}
            <button onClick={closeOrderHistoryModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;