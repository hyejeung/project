// MenuDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MenuDetail.css';
const MenuDetail = ({ menu }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { itemId } = useParams();
  const [menuDetail, setMenuDetail] = useState({
    itemName: '',
    price: 0,
    storeId: 0,
    image: null,
    storeName: '',
    content: '',
    status: '',
  });
  const [editedProductInfo, setEditedProductInfo] = useState({ ...menuDetail });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log('useEffect: ', menuDetail?.itemName);

    const fetchMenuDetails = async () => {
      try {
        if (itemId) {
          const response = await axios.get(`/api/items/${itemId}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json',
            },
          });

          console.log('Response from server:', response.data);

          if (response.data) {
            const menuData = response.data;
            setMenuDetail(menuData);
            setEditedProductInfo({ ...menuData });
          }
        }
      } catch (error) {
        console.error('메뉴 상세 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchMenuDetails();
  }, [itemId, menuDetail?.itemName]);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`/api/items/${itemId}`, editedProductInfo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });

      console.log('상품 정보 수정 성공:', response.data);

      setMenuDetail(response.data);
      setModalOpen(false);
    } catch (error) {
      console.error('상품 정보 수정 실패:', error.response);
      // 에러 핸들링 로직 추가
    }
  };

  const openEditModal = () => {
    setEditedProductInfo({ ...menu }); // 수정된 부분: menu 대신 menuDetail을 사용합니다.
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditedProductInfo({ ...editedProductInfo, picture: file });
    }
  };

  return (
    <div className="MenuDetail">
      <h2>{menu.itemName}</h2>

      <div>
        <h3>상품 정보</h3>
        <p>이름: {menu.itemName}</p>
        <p>가격: {menu.price}원</p>
        {menuDetail.image && (
          <div>
            <p>이미지: {menu.image.name}</p>
            <img src={URL.createObjectURL(menuDetail.image)} alt={menuDetail.itemName} />
          </div>
        )}
        <p>상세 정보: {menu.content}</p>
        <p>판매상태: {menu.status}</p>
      </div>

      <div className="action-buttons">
        <button className="edit-button" onClick={openEditModal}>
          수정
        </button>
        <button className="delete-button">삭제</button>
      </div>

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
                value={editedProductInfo.content}
                onChange={(e) => setEditedProductInfo({ ...editedProductInfo, details: e.target.value })}
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