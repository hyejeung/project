// MenuDetail.js

import React, { useState, useEffect } from 'react';
 import './MenuDetail.css'; // MenuDetail.css 파일이 필요하다면 추가하세요.

const MenuDetail = ({ selectedItem, onClose }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedProductInfo, setEditedProductInfo] = useState({});

  // 선택된 메뉴 정보가 변경될 때마다 상태 업데이트
  useEffect(() => {
    setEditedProductInfo(selectedItem);

    console.log(selectedItem.picture);
  }, [selectedItem]);

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

  };

  return (
    <div className="MenuDetail">
      <h2>{editedProductInfo.itemName}</h2>

      {/* 상품에 대한 정보 */}
      <div>
        <h3>상품 정보</h3>
        <p>가격: {editedProductInfo.price}원</p>
        <img src={`${editedProductInfo.picture}`} alt={editedProductInfo.name} />
        {/* <img class="temp_img" alt='이미지' src='/img/temp2.png'></img> */}
        <p>상세 정보: {editedProductInfo.content}</p>
        <p>판매상태: {editedProductInfo.itemStatus ? '판매중' : '품절'}</p> {/* 추가: 품절 여부 표시 */}
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
                value={editedProductInfo.content}
                onChange={(e) =>
                  setEditedProductInfo({ ...editedProductInfo, content: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="editedAvailability"> 판매상태</label>
              <select
                id="editedAvailability"
                value={editedProductInfo.itemStatus}
                onChange={(e) =>
                  setEditedProductInfo({
                    ...editedProductInfo,
                    itemStatus: e.target.value === 'true',
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
