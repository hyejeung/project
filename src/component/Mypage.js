
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPage.css'; // 스타일링을 위한 CSS 파일을 import
import ReviewModal from './ReviewModal';
import Pagination from 'react-js-pagination';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [activeTab, setActiveTab] = useState('orderHistory'); // 'orderHistory' 또는 'userInfo'
  
 
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 1,
      date: '2023-01-01',
      items: [
        { id: 101, name: '엽기떡볶이', price: 15000, reviewed: false },
        { id: 102, name: '버거킹', price: 10000, reviewed: true },
      ],
      reviewed: false,
    },
    // ... 다른 주문 내역들 추가
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setOrderHistoryModalOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo });
  const [selectedOrder, setSelectedOrder] = useState(null); // 선택한 주문 정보를 담는 상태
  const [reviewOrder, setReviewOrder] = useState(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    // 회원 정보 및 주문 내역을 서버에서 가져오는 로직
    axios.get('/api/user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setUserInfo(response.data);
        return response;
      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));

      axios.get('/api/orders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          setOrderHistory(response.data);
        })
        .catch(error => console.log(error));
  }, []);

  const handleUpdate = async () => {
    try {
      // 사용자 정보 업데이트 로직
      // const response = await updateUser(updatedUserInfo);
      setUserInfo(updatedUserInfo);
      setModalOpen(false); // 업데이트 성공 시 모달 닫기
      // 업데이트 성공에 대한 추가적인 로직
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error.message);
      // 에러 핸들링 로직 추가
    }
  };

  const handleWithdrawal = () => {
    const confirmWithdrawal = window.confirm('정말로 회원을 탈퇴하시겠습니까?');

    if (confirmWithdrawal) {
      try {
        // 회원 탈퇴 로직
        // const response = await withdrawUser();
        // 탈퇴 성공에 대한 추가적인 로직
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

  const viewOrderHistory = (order) => {
    setSelectedOrder(order);
    setReviewOrder(null);
    setActiveTab('orderHistory');
  };

  const closeOrderHistoryModal = () => {
    setSelectedOrder(null);
    setOrderHistoryModalOpen(false); 
  };
  const writeReview = (order, item) => {
    // 리뷰 작성, 수정, 삭제 등의 로직을 여기에 추가
    // order와 item 정보를 이용하여 필요한 동작을 수행
    console.log('리뷰 작성 함수 호출', order, item);
  };
  const openReviewModal = (order) => {
    setReviewOrder(order);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  const submitReview = (reviewData) => {
    // 여기에서 리뷰 작성 로직을 수행
    console.log('리뷰 작성:', reviewData);
    // 예시로 콘솔에 리뷰 데이터 출력
  };

  const confirmReviewDeletion = (order, item) => {
    const confirmDeletion = window.confirm('정말로 리뷰를 삭제하시겠습니까?');
  
    if (confirmDeletion) {
      // 리뷰 삭제 로직을 수행하는 함수를 호출
      deleteReview(order, item);
    }
  };
  const deleteReview = (order, item) => {
    // 리뷰 삭제 로직을 수행하는 함수를 호출
    // 여기에서 필요한 서버 호출 등을 추가하면 됩니다.
    console.log('리뷰 삭제 함수 호출', order, item);
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
     <div className="my-page-container">
      <h2>마이페이지</h2>
      <div className="tab-navigation">
        <button onClick={() => setActiveTab('orderHistory')}>주문 내역</button>
        <button onClick={() => setActiveTab('userInfo')}>회원 정보</button>
      </div>

      {activeTab === 'orderHistory' && (
        <>
          <h3>주문 내역</h3>
          {/* 주문 내역에 관련된 UI 및 로직 추가 */}
          {/* 예시로 첫 번째 주문 내역을 기준으로 보여주겠습니다. */}
          {orderHistory.length > 0 && (
            <div>
              <h4>주문일자: {orderHistory[0].date}</h4>
              <ul>
                {orderHistory[0].items.map((item) => (
                  <li key={item.id}>
                    {item.name} - 수량: {item.quantity} - 가격: {item.price }원
                    {item.reviewed ? (
                      <>
                        <button onClick={() => openReviewModal(orderHistory[0], item)}>리뷰 수정</button>
                        <button>리뷰 삭제</button>
                      </>
                    ) : (
                      <button onClick={() => openReviewModal(orderHistory[0])}>리뷰 쓰기</button>
                    )}
                  </li>
                ))}
              </ul>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={orderHistory.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                prevPageText="<"
                nextPageText=">"
                firstPageText="<<"
                lastPageText=">>"
                itemClass="page-item"
                linkClass="page-link"
                innerClass="pagination"
              />
            </div>
          )}
        </>
      )}

      {activeTab === 'userInfo' && (
        <>
          <h3>회원 정보</h3>
          {/* 회원 정보에 관련된 UI 및 로직 추가 */}
          {/* 현재 유저 정보를 기준으로 보여주겠습니다. */}
          <p>사용자 이름: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <p>전화번호: {userInfo.phone}</p>
          <p>비밀번호: {userInfo.password}</p>
          <p>성별: {userInfo.gender}</p>
          <p>적립금: {userInfo.points} 포인트</p>
          <p>등급: {userInfo.grade}</p>
          <p>주소: {userInfo.address}</p>
          <button onClick={openModal}>회원정보 수정</button>
          <button onClick={handleWithdrawal}>회원탈퇴</button>
        </>
      )}
      


      {/* 수정 모달 */}
      {isModalOpen && (
        <div className="mypage-modal-overlay">
        <div className="mypage-modal">
            <h2>회원정보 수정</h2>
            <div>
              <label htmlFor="updatedUsername"> 사용자 이름</label>
              <input
                type="text"
                id="updatedUsername"
                value={updatedUserInfo.username}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updatedEmail">이메일</label>
              <input
                type="text"
                id="updatedEmail"
                value={updatedUserInfo.email}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updatedPhoneNumber"> 전화번호</label>
              <input
                type="text"
                id="updatedPhoneNumber"
                value={updatedUserInfo.phoneNumber}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updatedPassword"> 비밀번호</label>
              <input
                type="password"
                id="updatedPassword"
                value={updatedUserInfo.password}
                onChange={(e) =>
                  setUpdatedUserInfo({ ...updatedUserInfo, password: e.target.value })
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
    
   
    {isOrderHistoryModalOpen && (
        <div className="modal-overlay">{isOrderHistoryModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>주문 내역</h2>
              {selectedOrder ? (
                <>
                  <ul>
                    {selectedOrder.items.map((item) => (
                      <li key={item.id}>
                        {item.name} - {item.price}원
                        {/* 각 아이템에 대한 리뷰 상태 확인 */}
                        {item.reviewed ? (
                          <>
                            <button onClick={() => openReviewModal(selectedOrder, item)}>리뷰 수정</button>
                            <button onClick={() => confirmReviewDeletion(selectedOrder, item)}>리뷰 삭제</button>
                          </>
                        ) : (
                          <button onClick={() => openReviewModal(selectedOrder)}>리뷰 쓰기</button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>선택된 주문 내역이 없습니다.</p>
              )}
              <button onClick={closeOrderHistoryModal}>닫기</button>
            </div>
          </div>
        )}
          <div className="modal">
            <h2>주문 내역</h2>
            {selectedOrder ? (
              <>
                <ul>
                  {selectedOrder.items.map((item) => (
                    <li key={item.id}>
                      {item.name} - {item.price}원
                      {/* 각 아이템에 대한 리뷰 상태 확인 */}
                      {item.reviewed ? (
                        <>
                          <button>리뷰 수정</button>
                          <button>리뷰 삭제</button>
                        </>
                      ) : (
                        <button onClick={() => openReviewModal(selectedOrder)}>리뷰 쓰기</button>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>선택된 주문 내역이 없습니다.</p>
            )}
            <button onClick={closeOrderHistoryModal}>닫기</button>
          </div>
        </div>
      )}

      {/* 리뷰 작성 모달 */}
      {reviewOrder && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => {
            setReviewOrder(null);
            setReviewModalOpen(false);
          }}
          onSubmit={submitReview}
        />
      )}
    </div>
  );
};

export default MyPage;