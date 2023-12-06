// MenuDetail.js

import React, { useState } from 'react';
 import './MenuDetail.css'; // MenuDetail.css 파일이 필요하다면 추가하세요.

const MenuDetail = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedProductInfo, setEditedProductInfo] = useState({
    name: '엽기떡볶이',
    price: 15000,
    image: 'url_to_image', // 실제 이미지 URL로 교체
    description: '...',
    availability: true, // 추가: 품절 여부
  });

  const [storeInfo, setStoreInfo] = useState({
    name: '가게 이름',
    location: '가게 위치',
    phoneNumber: '가게 전화번호',
    representativeImage: 'https://picsum.photos/id/237/200/300', // 샘플 이미지 URL
    details: '상세 내용',
    openingTime: '영업 오픈 시간',
    closingTime: '영업 종료 시간',
  });
  const [previewUrl, setPreviewUrl] = useState(storeInfo.representativeImage);
  const [updatedStoreInfo, setUpdatedStoreInfo] = useState({ ...storeInfo });
  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleUpdate = () => {
    // 여기에서 상품 정보를 업데이트하는 로직을 수행
    // const response = await updateProductInfo(editedProductInfo);
    closeEditModal();
    // 업데이트 성공에 대한 추가적인 로직을 수행할 수 있습니다.
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setUpdatedStoreInfo({ ...updatedStoreInfo, representativeImage: imageUrl });
    }
  };

  return (
    <div className="MenuDetail">
      <h2>{editedProductInfo.name}</h2>

      {/* 상품에 대한 정보 */}
      <div>
        <h3>상품 정보</h3>
        <p>가격: {editedProductInfo.price}원</p>
        <img src={editedProductInfo.image} alt={editedProductInfo.name} />
        <p>상세 정보: {editedProductInfo.description}</p>
        <p>판매상태: {editedProductInfo.availability ? '판매중' : '품절'}</p> {/* 추가: 품절 여부 표시 */}
      </div>

      {/* 수정 버튼 */}
      <div className="action-buttons">
        <button className="edit-button" onClick={openEditModal}>
          수정
        </button>
        <button className="delete-button">삭제</button>
        {/* <button className="soldout-button">매진</button> */}
      </div>

      {/* 수정 모달 */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>상품 정보 수정</h2>
            <div>
              <label htmlFor="editedName"> 상품 이름</label>
              <input
                type="text"
                id="editedName"
                value={editedProductInfo.name}
                onChange={(e) =>
                  setEditedProductInfo({ ...editedProductInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="editedPrice"> 상품 가격</label>
              <input
                type="text"
                id="editedPrice"
                value={editedProductInfo.price}
                onChange={(e) =>
                  setEditedProductInfo({ ...editedProductInfo, price: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="editedImage"> 상품 이미지 </label>
              <input
                  type="file"
                  id="editedRepresentativeImage"
                  onChange={handleImageUpload}
                />
              </div>

            <div>
              <label htmlFor="editedDescription"> 상세 정보</label>
              <textarea
                id="editedDescription"
                value={editedProductInfo.description}
                onChange={(e) =>
                  setEditedProductInfo({ ...editedProductInfo, description: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="editedAvailability"> 판매상태</label>
              <select
                id="editedAvailability"
                value={editedProductInfo.availability}
                onChange={(e) =>
                  setEditedProductInfo({
                    ...editedProductInfo,
                    availability: e.target.value === 'true',
                  })
                }
              >
                <option value={true}>판매중</option>
                <option value={false}>품절</option>
              </select>
            </div>
            <div>
              <button onClick={handleUpdate}>수정 완료</button>
              <button onClick={closeEditModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDetail;
