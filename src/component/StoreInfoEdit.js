// StoreInfoEdit.js

import React, { useState,useEffect } from 'react';
import './StoreInfoEdit.css';
import axios from 'axios';
import MenuDetail from './MenuDetail'; 

const StoreInfoEdit = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isNewMenuItemModalOpen, setNewMenuItemModalOpen] = useState(false); // 추가
  const [storeInfo, setStoreInfo] = useState({
    name: '가게 이름',
    location: '가게 위치',
    phoneNumber: '가게 전화번호',
    representativeImage: 'https://picsum.photos/id/237/200/300', // 샘플 이미지 URL
    details: '상세 내용',
    openingTime: '영업 오픈 시간',
    closingTime: '영업 종료 시간',
  });
  const [updatedStoreInfo, setUpdatedStoreInfo] = useState({ ...storeInfo });
  const [previewUrl, setPreviewUrl] = useState(storeInfo.representativeImage);

  const [isAddMenuModalOpen, setAddMenuModalOpen] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', status: '판매중' , image: '', // 대표 사진 추가
  details: '',  });


  useEffect(() => {



    const fetchData = async () => {
      try {

        const storeId = localStorage.getItem('storeId');
        // 서버에서 가게 정보를 가져오는 GET 요청
        const response = await axios.get(`api/stores/${storeId}`);
        // 서버 응답 데이터를 가게 정보로 업데이트
        setStoreInfo(response.data);
      } catch (error) {
        console.error('가게 정보 불러오기 실패:', error);
      }
    };

    //컴포넌트가 마운트될 때 가게 정보를 불러오도록 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setUpdatedStoreInfo({ ...updatedStoreInfo, representativeImage: imageUrl });
    }
  };
 
  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      //서버에 업데이트 요청을 보내는 부분
      const response = await axios.put('서버의 업데이트 API URL', updatedStoreInfo);

      // 업데이트 성공 시 로직
      setStoreInfo(updatedStoreInfo);
      closeEditModal();
      console.log('시간 출력', typeof(storeInfo.openingTime), storeInfo.closingTime);
    } catch (error) {
      // 업데이트 실패 시 에러 처리 로직
      console.error('업데이트 실패:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStoreInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();

    try {
      // 서버에 새로운 메뉴 추가 요청을 보내는 부분

      const id = localStorage.getItem('storeId');
      const response = await axios.post(`api/stores/${id}`, newMenuItem, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });
        // 새로운 메뉴 추가 성공 시 로직
        console.log('메뉴 추가 성공:', response.data);
      setAddMenuModalOpen(false);
    } catch (error) {
      // 메뉴 추가 실패 시 에러 처리 로직
      console.error('메뉴 추가 실패:', error);
    }
  };

  const openAddMenuModal = () => {
    setAddMenuModalOpen(true);
  };

  const closeAddMenuModal = () => {
    setAddMenuModalOpen(false);
  };
  
  const openNewMenuItemModal = () => {
    setNewMenuItemModalOpen(true);
  };

  const closeNewMenuItemModal = () => {
    setNewMenuItemModalOpen(false);
  };

  return (
    <div className="storeinfoedit-container">
      <h1>가게 정보 수정</h1>
      <form>
        <div>
          <label htmlFor="name">가게 이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedStoreInfo.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">가게 위치</label>
          <input
            type="text"
            id="location"
            name="location"
            value={updatedStoreInfo.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">가게 전화번호</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={updatedStoreInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>
       
        <div>
          <label htmlFor="details">상세 내용</label>
          <textarea
            id="details"
            name="details"
            value={updatedStoreInfo.details}
            onChange={handleChange}
          />
        </div>
       
        <div>
        <label htmlFor="editedRepresentativeImage"> 대표 사진</label>
        <input
          type="text"
          id="editedRepresentativeImage"
          value={updatedStoreInfo.representativeImage}
          onChange={(e) =>
            setUpdatedStoreInfo({ ...updatedStoreInfo, representativeImage: e.target.value })
          }
        />
      </div>
        {previewUrl && (
          <div>
            <h3>사진 미리보기</h3>
            <img src={previewUrl} alt="대표 사진 미리보기" style={{ width: '200px', height: '300px' }} />
          </div>
        )}
         <div>
          <label htmlFor="openingTime">영업 오픈 시간</label>
          <input
            type="text"
            id="openingTime"
            name="openingTime"
            value={updatedStoreInfo.openingTime}
            onChange={handleChange}
          />
        </div>
 

        <div>
          <label htmlFor="closingTime">영업 종료 시간</label>
          <input
            type="text"
            id="closingTime"
            name="closingTime"
            value={updatedStoreInfo.closingTime}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={openEditModal}>
          가게 정보 수정
        </button>
      </form>

      {isEditModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>가게 정보 수정</h2>
      <div>
        <label htmlFor="editedName"> 가게 이름</label>
        <input
          type="text"
          id="editedName"
          value={updatedStoreInfo.name}
          onChange={(e) =>
            setUpdatedStoreInfo({ ...updatedStoreInfo, name: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="editedLocation"> 가게 위치</label>
        <input
          type="text"
          id="editedLocation"
          value={updatedStoreInfo.location}
          onChange={(e) =>
            setUpdatedStoreInfo({ ...updatedStoreInfo, location: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="editedPhoneNumber"> 가게 전화번호</label>
        <input
          type="text"
          id="editedPhoneNumber"
          value={updatedStoreInfo.phoneNumber}
          onChange={(e) =>
            setUpdatedStoreInfo({ ...updatedStoreInfo, phoneNumber: e.target.value })
          }
        />
      </div>
      <div>
              <label htmlFor="editedRepresentativeImage"> 대표 사진</label>
              <div>
                <input
                  type="file"
                  id="editedRepresentativeImage"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
      <div>
        <label htmlFor="editedDetails"> 상세 내용</label>
        <textarea
          id="editedDetails"
          value={updatedStoreInfo.details}
          onChange={(e) =>
            setUpdatedStoreInfo({ ...updatedStoreInfo, details: e.target.value })
          }
        />
      </div>
      <div>
  <label htmlFor="editedOpeningTime">영업 시작 시간:</label>
  <input
    type="time"
    id="editedOpeningTime"
    value={updatedStoreInfo.openingTime}
    onChange={(e) =>
      setUpdatedStoreInfo({ ...updatedStoreInfo, openingTime: e.target.value })
    }
  />
</div>
<div>
  <label htmlFor="editedClosingTime">영업 종료 시간:</label>
  <input
    type="time"
    id="editedClosingTime"
    value={updatedStoreInfo.closingTime}
    onChange={(e) =>
      setUpdatedStoreInfo({ ...updatedStoreInfo, closingTime: e.target.value })
    }
  />
</div>

      <div>
        <button onClick={handleUpdate}>수정 완료</button>
        <button onClick={closeEditModal}>닫기</button>
      </div>
    </div>
  </div>
)}

      <h2>메뉴 관리</h2>
      <div className="order-list">
        <div className="order-item" onClick={openNewMenuItemModal}>
          <span>엽기떡볶이</span>
          <span>15000원</span>
          <span className="status">판매중</span>
        </div>

        <div className="order-item">
          <span>엽기오뎅</span>
          <span>20000원</span>
          <span className="status">품절</span>
        </div>
        {/* 다른 상품들도 유사하게 작성 */}
      </div>

      <div className="add-menu-link">
        <button onClick={openAddMenuModal}>메뉴 추가</button>
      </div>

      {isAddMenuModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>메뉴 추가</h2>
            <form onSubmit={handleAddMenu}>
              <div>
                <label htmlFor="menuName">메뉴명:</label>
                <input
                  type="text"
                  id="menuName"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="menuPrice">가격:</label>
                <input
                  type="text"
                  id="menuPrice"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="menuImage">대표 사진 </label>
                {/* <input
                  type="text"
                  id="menuImage"
                  value={newMenuItem.image}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
                /> */}
                 <div>
                <input
                  type="file"
                  id="editedRepresentativeImage"
                  onChange={handleImageUpload}
                />
              </div>
              </div>
              <div>
                <label htmlFor="menuDetails">상세 정보:</label>
                <textarea
                  id="menuDetails"
                  value={newMenuItem.details}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, details: e.target.value })}
                />
              </div>
              <div>
                <button type="submit">추가</button>
                <button type="button" onClick={closeAddMenuModal}>
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MenuDetail 모달 */}
      {isNewMenuItemModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <MenuDetail />
            <button className="close-button" onClick={closeNewMenuItemModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInfoEdit;
