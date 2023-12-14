import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerMypage.css'; // Import the CSS file for styling

const ManagerMypage = () => {
  const [userInfo, setUserInfo] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo });

  useEffect(() => {
    axios.get('/api/user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setUserInfo(response.data);
        setUpdatedUserInfo(response.data); // Initialize updatedUserInfo with current user info
        return response;
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = async () => {
    try {
      // Logic to update user information
      // 예: const response = await updateUser(updatedUserInfo);
      const response = await axios.put('api/user', updatedUserInfo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });

      setUserInfo(updatedUserInfo);
      setModalOpen(false); // Close the modal after successful update
      // Additional logic to handle successful update
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error.message);
      // 에러 핸들링 로직 추가
    }
  };

  const handleWithdrawal = async () => {
    const confirmWithdrawal = window.confirm('정말로 회원을 탈퇴하시겠습니까?');

    if (confirmWithdrawal) {
      try {
        // 서버로 DELETE 요청을 보내 회원탈퇴 수행
        await axios.delete('api/user', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
        });

        // 회원탈퇴 성공 시 추가적인 로직 수행
        console.log('회원탈퇴가 완료되었습니다.');
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
      <p>성별: {userInfo.gender}</p>
      <p>주소: {userInfo.address}</p>
      <div className="button-container">
        <span><button onClick={openModal}>회원정보 수정</button></span>
        <span><button onClick={handleWithdrawal}>회원탈퇴</button></span>
      </div>

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
                value={updatedUserInfo.name}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, name: e.target.value })
                }
              />
            </div>
            {/* <div>
              <label htmlFor="updatedEmail">이메일</label>
              <input
                type="text"
                id="updatedEmail"
                value={updatedUserInfo.email}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, email: e.target.value })
                }
              />
            </div> */}
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