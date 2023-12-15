// Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 필요한 스타일 파일을 import
import axios from 'axios';

const Register = () => {
  const [newStoreInfo, setNewStoreInfo] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('store', new Blob([JSON.stringify(newStoreInfo)], {
        type: "application/json"
      }));

      // /api/store 엔드포인트로 POST 요청
      const response = await axios.post('/api/store', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'multipart/form-data',
        },
      });

      // 응답 확인 및 처리
      console.log('서버 응답:', response.data);

      // 성공적으로 등록되었을 경우
      if (response.status === 201) {
        localStorage.setItem('store_id', response.data.id);
        alert('음식점 등록에 성공했습니다.');
        navigate('/managermain');
      } else {
        alert('음식점 등록 실패. 모든 필수 정보를 입력하세요.');
      }
    } catch (error) {
      console.error('음식점 등록 오류:', error);
      alert('음식점 등록 중 오류가 발생했습니다.');
    }
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="register-container">
      <h2>음식점 등록</h2>
      <div>
        <label htmlFor="restaurantName">음식점명:</label>
        <input
          type="text"
          id="restaurantName"
          value={newStoreInfo.name}
          onChange={(e) => setNewStoreInfo({ ...newStoreInfo, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="restaurantLocation">가게 위치:</label>
        <input
          type="text"
          id="restaurantLocation"
          value={newStoreInfo.address}
          onChange={(e) => setNewStoreInfo({ ...newStoreInfo, address: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="restaurantPhoneNumber">가게 전화번호:</label>
        <input
          type="tel"
          id="restaurantPhoneNumber"
          value={newStoreInfo.phone}
          onChange={(e) => setNewStoreInfo({ ...newStoreInfo, phone: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="menuImage">대표 사진 </label>
        <div>
          <input
            type="file"
            id="editedRepresentativeImage"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div>
        <label htmlFor="restaurantInfo">상세 정보:</label>
        <textarea
          id="restaurantInfo"
          value={newStoreInfo.content}
          onChange={(e) => setNewStoreInfo({ ...newStoreInfo, content: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="openingTime">영업 시작 시간:</label>
        <input
          type="time"
          id="openingTime"
          value={newStoreInfo.openTime}
          onChange={(e) => setNewStoreInfo({ ...newStoreInfo, openTime: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="closingTime">영업 종료 시간:</label>
        <input
          type="time"
          id="closingTime"
          value={newStoreInfo.closeTime}
          onChange={(e) => setNewStoreInfo({ ...newStoreInfo, closeTime: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="minOrderPrice">최소 배달 금액:</label>
        <input
          type="text"
          id="minOrderPrice"
          value={newStoreInfo.minOrderPrice}
          onChange={(e) => setNewStoreInfo({ ...newStoreInfo, minOrderPrice: e.target.value })}
        />
      </div>
      <div className='button-information'>
        <button className="register-button" onClick={handleRegister}>
          등록
        </button>
        <button onClick={() => navigate('/login')}>로그인 화면으로 돌아가기</button>
      </div>
    </div>
  );
};

export default Register;
