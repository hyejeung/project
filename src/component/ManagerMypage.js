import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerMypage.css';
import DaumPostcode from 'react-daum-postcode';

const ManagerMypage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo });

  const openModal = () => {
    setUpdatedUserInfo({ ...userInfo });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleAddressSelect = (data) => {
    const selectedAddress = `${data.address} ${data.addressDetail}`;
    setUpdatedUserInfo({ ...updatedUserInfo, address: selectedAddress });
    closeAddressModal();
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put('/api/user', updatedUserInfo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });

      setUserInfo(response.data);
      setModalOpen(false);
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error.message);
      // 에러 핸들링 로직 추가
    }
  };
  const handleWithdrawal = async () => {
    const confirmWithdrawal = window.confirm('정말로 회원을 탈퇴하시겠습니까?');

    if (confirmWithdrawal) {
      try {
        // Logic for user withdrawal
        await axios.delete('/api/user', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
        });
        // Additional logic to handle successful withdrawal
      } catch (error) {
        console.error('회원탈퇴 실패:', error.message);
        // 에러 핸들링 로직 추가
      }
    }
  };


  useEffect(() => {
    axios.get('/api/user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setUserInfo(response.data);
        setUpdatedUserInfo(response.data);
        return response;
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="my-page-container">
      <h2>마이페이지</h2>
      <table>
        <tbody>
          <tr>
            <td>사용자 이름</td>
            <td>{userInfo.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>{userInfo.phone}</td>
          </tr>
          <tr>
            <td>성별</td>
            <td>{userInfo.gender}</td>
          </tr>
          <tr>
            <td>주소</td>
            <td>{userInfo.address}</td>
          </tr>
        </tbody>
      </table>

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
              <div className="address-input-container">
                <input
                  type="text"
                  id="updatedAddress"
                  value={updatedUserInfo.address}
                  onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, address: e.target.value })}
                />
                <button className="search-address" onClick={openAddressModal}>
                  주소검색
                </button>
              </div>
              {isAddressModalOpen && (
                <div className="address-modal-overlay">
                  <div className="address-modal">
                    <DaumPostcode
                      onComplete={handleAddressSelect}
                      autoClose
                      animation
                      height={500}
                    />
                    <button className="close-button" onClick={closeAddressModal}>
                      닫기
                    </button>
                  </div>
                </div>
              )}
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