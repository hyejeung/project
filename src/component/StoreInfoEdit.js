// StoreInfoEdit.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './StoreInfoEdit.css';
import MenuDetail from './MenuDetail';

const StoreInfoEdit = () => {
  const [activeTab, setActiveTab] = useState('storeInfo');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isNewMenuItemModalOpen, setNewMenuItemModalOpen] = useState(false);
  const [isAddMenuModalOpen, setAddMenuModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState({
    name: 'd',
    address: 'd',
    phone: 'd',
    picture: '',
    content: '',
    openTime: '',
    closeTime: '',
  });
  const [updatedStoreInfo, setUpdatedStoreInfo] = useState({ ...storeInfo });
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(storeInfo.picture);
  const [menuItems, setMenuItems] = useState([]); // 추가: 메뉴 품목 상태 추가
  const [totalData, setTotalData] = useState(0);
  const [selectedMenuItemDetails, setSelectedMenuItemDetails] = useState(null);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [id, setId] = useState(""); // 추가: id 변수 추가 및 초기값 설정
  const [newMenuItem, setNewMenuItem] = useState({  // 추가: newMenuItem 상태 추가
    name: '',
    price: '',
    status: '판매중',
    image: '',
    details: '',
  });

  const { id: storeIdFromLocalStorage } = useParams(); // storeId를 URL 파라미터에서 가져옴

  useEffect(() => {
    const storedStoreId = localStorage.getItem('storeId');
    const idToFetch = storedStoreId || storeIdFromLocalStorage;

    if (idToFetch) {
      axios.get(`/api/stores/${idToFetch}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          setStoreInfo(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('가게 정보를 불러오는 중 오류 발생:', error);
          setIsLoading(false);
        });

      // 추가: 메뉴 품목 가져오기
      axios.get(`/api/items/${idToFetch}`, {
      
        params: {
          offset: offset,
          limit: perPage,
          size: 5,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          setMenuItems(response.data.content);
          setTotalData(response.data.totalData);
        })
        .catch(error => {
          console.error('메뉴 품목을 불러오는 중 오류 발생:', error);
        });
    } else {
      console.error('storeId가 없습니다.');
      setIsLoading(false);
    }
  }, [offset, perPage, storeIdFromLocalStorage]);

  const handleAddMenu = async (e) => {
    e.preventDefault();

    try {
      const id = localStorage.getItem('storeId');
      const response = await axios.post(`api/stores/${id}`, newMenuItem, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });
      console.log('메뉴 추가 성공:', response.data);
      setAddMenuModalOpen(false);
    } catch (error) {
      console.error('메뉴 추가 실패:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setUpdatedStoreInfo({ ...updatedStoreInfo, picture: imageUrl });
    }
  };

  const openEditModal = () => {
    setUpdatedStoreInfo({
      name: storeInfo.name,
      location: storeInfo.address,
      phoneNumber: storeInfo.phone,
      details: storeInfo.content,
      picture: storeInfo.picture,
      openingTime: storeInfo.openTime,
      closingTime: storeInfo.closeTime,
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStoreInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const openAddMenuModal = () => {
    setAddMenuModalOpen(true);
  };

  const closeAddMenuModal = () => {
    setAddMenuModalOpen(false);


  };

  const handleMenuButtonClick = async (menu) => {
    try {
      const response = await axios.get(`/api/items/${menu.itemId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });
      setSelectedMenuItemDetails(response.data);
      setNewMenuItemModalOpen(true);
    } catch (error) {
      console.error('메뉴 상세 정보를 불러오는 중 오류 발생:', error);
    }
  };

  const openNewMenuItemModal = (menu) => {
    setSelectedMenuItem(menu);
    setNewMenuItemModalOpen(true);
  };

  const closeNewMenuItemModal = () => {
    setSelectedMenuItem(null);
    setNewMenuItemModalOpen(false);
  };
  const handleUpdate = async () => {
    // 수정 로직 추가
    try {
      const id = localStorage.getItem('storeId');
      const response = await axios.put(`api/stores/${id}`, updatedStoreInfo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });
      console.log('가게 정보 수정 성공:', response.data);
      setEditModalOpen(false);
    } catch (error) {
      console.error('가게 정보 수정 실패:', error);
    }
  };
  

  

  return (
    <div className="storeinfoedit-container">
      <h1>가게 정보</h1>
      <div className="tab-navigation">
      <button onClick={() => setActiveTab('storeInfo')}>가게 정보</button>
      <button onClick={() => setActiveTab('menuManagement')}>메뉴 관리</button>
    </div>

      {activeTab === 'storeInfo' && (
        <>
          <h2>가게 정보 수정</h2>
          <form>
            <div>
              <label htmlFor="name">가게 이름</label>
              <span>{storeInfo.name}</span>
            </div>
            <div>
              <label htmlFor="location">가게 위치</label>
              <span>{storeInfo.address}</span>
            </div>
            <div>
              <label htmlFor="phoneNumber">가게 전화번호</label>
              <span>{storeInfo.phone}</span>
            </div>

            <div>
              <label htmlFor="details">상세 내용</label>
              <span>{storeInfo.content}</span>
            </div>

            <div>
              <label htmlFor="editedRepresentativeImage"> 대표 사진</label>
              <span>{storeInfo.picture}</span>
            </div>
            {previewUrl && (
              <div>
                <h3>사진 미리보기</h3>
                <img
                  src={previewUrl}
                  alt="대표 사진 미리보기"
                  style={{ width: '200px', height: '300px' }}
                />
              </div>
            )}
            <div>
              <label htmlFor="openingTime">영업 오픈 시간</label>
              <span>{storeInfo.openTime}</span>
            </div>

            <div>
              <label htmlFor="closingTime">영업 종료 시간</label>
              <span>{storeInfo.closeTime}</span>
            </div>
            <button type="button" onClick={openEditModal}>
              가게 정보 수정
            </button>


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
                      setUpdatedStoreInfo({
                        ...updatedStoreInfo,
                        phoneNumber: e.target.value,
                      })
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
                      setUpdatedStoreInfo({
                        ...updatedStoreInfo,
                        details: e.target.value,
                      })
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
                      setUpdatedStoreInfo({
                        ...updatedStoreInfo,
                        openingTime: e.target.value,
                      })
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
                      setUpdatedStoreInfo({
                        ...updatedStoreInfo,
                        closingTime: e.target.value,
                      })
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
          </form>
        </>
      )}

{activeTab === 'menuManagement' && (
        <>
           <h2>메뉴 관리</h2>
          
        <div className="order-list">
          {/* 수정: 메뉴 품목을 map으로 렌더링 */}
          {menuItems.map((menu) => (
            <div key={menu.itemId} onClick={() => handleMenuButtonClick(menu)}>
              <span>{menu.itemName}</span>
              <span>{menu.price}원</span>
              <span className="status">{menu.status}</span>
            </div>
              
          ))}
        </div>
        <button onClick={openAddMenuModal}>메뉴 추가</button>

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
                      onChange={(e) =>
                        setNewMenuItem({ ...newMenuItem, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="menuPrice">가격:</label>
                    <input
                      type="text"
                      id="menuPrice"
                      value={newMenuItem.price}
                      onChange={(e) =>
                        setNewMenuItem({ ...newMenuItem, price: e.target.value })
                      }
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
                    <label htmlFor="menuDetails">상세 정보:</label>
                    <textarea
                      id="menuDetails"
                      value={newMenuItem.details}
                      onChange={(e) =>
                        setNewMenuItem({ ...newMenuItem, details: e.target.value })
                      }
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
        </>
      )}
    </div>
  );
};

export default StoreInfoEdit;