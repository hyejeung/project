import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenuDetail.css';

const MenuDetail = ({ itemId }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedProductInfo, setEditedProductInfo] = useState({
    itemName: '',
    price: 0,
    image: '',
    details: '',
    status: '', // 또는 'SOLD_OUT'로 초기화
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await axios.get(`/api/items/${itemId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
        });
        setEditedProductInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('메뉴 상세 정보를 불러오는 중 오류 발생:', error);
        setIsLoading(false);
      }
    };

    fetchMenuDetails();
  }, [itemId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/items/${itemId}`, {
        itemName: editedProductInfo.itemName,
        price: editedProductInfo.price,
        image: editedProductInfo.image,
        details: editedProductInfo.details,
        status: editedProductInfo.status,
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });
      console.log('상품 정보 수정 성공:', response.data);
      closeEditModal();
      // 업데이트 성공에 대한 추가적인 로직을 수행할 수 있습니다.
    } catch (error) {
      console.error('상품 정보 수정 실패:', error);
    }
  };

  const [previewUrl, setPreviewUrl] = useState(editedProductInfo.image);
  const [updatedStoreInfo, setUpdatedStoreInfo] = useState({ ...editedProductInfo });
  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setUpdatedStoreInfo({ ...updatedStoreInfo, image: imageUrl });
    }
  };

  return (
    <div className="MenuDetail">
      <h2>{editedProductInfo.itemName}</h2>

      {/* 상품에 대한 정보 */}
      <div>
        <h3>상품 정보</h3>
        <p>이름: {editedProductInfo.itemName}</p>
        <p>가격: {editedProductInfo.price}원</p>
        <p>이미지: {editedProductInfo.image}</p>
        <img src={editedProductInfo.image} alt={editedProductInfo.itemName} />
        <p>상세 정보: {editedProductInfo.details}</p>
        <p>판매상태: {editedProductInfo.status}</p>
      </div>

      {/* 수정 버튼 */}
      <div className="action-buttons">
        <button className="edit-button" onClick={openEditModal}>
          수정
        </button>
        <button className="delete-button">삭제</button>
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
                value={editedProductInfo.itemName}
                onChange={(e) => setEditedProductInfo({ ...editedProductInfo, itemName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="editedPrice"> 상품 가격</label>
              <input
                type="text"
                id="editedPrice"
                value={editedProductInfo.price}
                onChange={(e) => setEditedProductInfo({ ...editedProductInfo, price: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="editedImage"> 상품 이미지 </label>
              <input
                type="file"
                id="editedImage"
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <label htmlFor="editedDetails"> 상세 정보</label>
              <textarea
                id="editedDetails"
                value={editedProductInfo.details}
                onChange={(e) =>
                  setEditedProductInfo({ ...editedProductInfo, details: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="editedStatus"> 판매상태</label>
              <select
                id="editedStatus"
                value={editedProductInfo.status}
                onChange={(e) => setEditedProductInfo({ ...editedProductInfo, status: e.target.value })}
              >
                <option value="SALE">판매중</option>
                <option value="SOLD_OUT">품절</option>
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
