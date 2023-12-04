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
              <label htmlFor="editedImage"> 상품 이미지 URL</label>
              <input
                type="text"
                id="editedImage"
                value={editedProductInfo.image}
                onChange={(e) =>
                  setEditedProductInfo({ ...editedProductInfo, image: e.target.value })
                }
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
