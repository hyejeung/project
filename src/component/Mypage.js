import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPage.css'; // 스타일링을 위한 CSS 파일을 import
import ReviewModal from './ReviewModal';
import Pagination from 'react-js-pagination';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [activeTab, setActiveTab] = useState('orderHistory');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [orderHistory, setOrderHistory] = useState([
    {
      order_id: 1,
      orderDate: '2023-01-01',
      orderItems: [
        { id: 101, itemName: '엽기떡볶이', orderPrice: 15000, count: 1, reviewed: false },
        { id: 102, itemName: '버거킹', orderPrice: 10000, count: 1, reviewed: true },
      ],
      reviewed: false,
    },
    // ... 다른 주문 내역들 추가
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setOrderHistoryModalOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({ ...userInfo });
  const [selectedOrder, setSelectedOrder] = useState(null);
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
        // userInfo에서 사용자 ID 추출
        const userId = response.data.id;
        // 사용자의 주문 가져오기
        return axios.get(`/api/orders/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
        });
      })
      .then(response => {
        setOrderHistory(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const viewOrderHistory = (orderId) => {
    axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setSelectedOrder(response.data[0]);
        setOrderHistoryModalOpen(true);
      })
      .catch(error => console.log(error));
  };




  const handleUpdate = async () => {
    try {
      // 사용자 정보 업데이트 로직
      const response = await axios.put('/api/user', updatedUserInfo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });

      setUserInfo(response.data);
      setModalOpen(false); // 업데이트 성공 시 모달 닫기
      // 업데이트 성공에 대한 추가적인 로직
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error.message);
      // 에러 핸들링 로직 추가
    }
  };

  

  const handleWithdrawal = async () => {
    const confirmWithdrawal = window.confirm('정말로 회원을 탈퇴하시겠습니까?');
    
    if (confirmWithdrawal) {
      try {
        // 회원 탈퇴 로직
        const response = await axios.delete('/api/user', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
        });
  
        // 탈퇴 성공에 대한 추가적인 로직 (예: 로그아웃 등)
        console.log('회원 탈퇴 성공:', response.data);
  
        // 예를 들어 로그아웃 등의 추가 작업을 수행할 수 있습니다.
        // ...
  
      } catch (error) {
        console.error('회원 탈퇴 실패:', error.message);
        // 에러 핸들링 로직 추가
      }
    }
  };
 

  const openModal = () => {
    // 모달이 열릴 때, 현재 사용자 정보로 초기화
    setUpdatedUserInfo({ ...userInfo });
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const submitReview = async (reviewData) => {
    try {
      // 리뷰 작성 로직
      const response = await axios.post('/api/review', reviewData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });
  
      
      console.log('리뷰 작성 성공:', response.data);
  
      // 여기에서 필요한 추가적인 작업 수행
    } catch (error) {
      console.error('리뷰 작성 실패:', error.message);
      // 에러 핸들링 로직 추가
    } finally {
      // 모달을 닫는 로직 등을 추가할 수 있습니다.
      setReviewOrder(null);
      setReviewModalOpen(false);
    }
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
        <button
          onClick={() => setActiveTab('orderHistory')}
          onMouseEnter={() => setHoveredTab('orderHistory')}
          onMouseLeave={() => setHoveredTab(null)}
          className={activeTab === 'orderHistory' || hoveredTab === 'orderHistory' ? 'active' : ''}
        >
          주문 내역
        </button>
        <button
          onClick={() => setActiveTab('userInfo')}
          onMouseEnter={() => setHoveredTab('userInfo')}
          onMouseLeave={() => setHoveredTab(null)}
          className={activeTab === 'userInfo' || hoveredTab === 'userInfo' ? 'active' : ''}
        >
          회원 정보
        </button>
      </div>


      {activeTab === 'orderHistory' && (
  <>
    <h3>주문 내역</h3>
    {orderHistory.length > 0 ? (
      <div>
        <ul>
          {orderHistory.map((order) => (
            <li key={order.order_id}>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                   주문일자: {order.orderDate}  {item.itemName} 수량: {item.count}  가격: {item.orderPrice}원
                    {item.reviewed ? (
                      <>
                        <button onClick={() => openReviewModal(order, item)}>리뷰 수정</button>
                        <button onClick={() => confirmReviewDeletion(order, item)}>리뷰 삭제</button>
                      </>
                    ) : (
                      <button onClick={() => openReviewModal(order)}>리뷰 쓰기</button>
                    )}
                  </li>
                ))}
              </ul>
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
    ) : (
      <p>주문 내역이 없습니다.</p>
    )}
  </>
)}

      {activeTab === 'userInfo' && (
        <>
         <h3>회원 정보</h3>
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
                <td>적립금</td>
                <td>{userInfo.points} 포인트</td>
              </tr>
              <tr>
                <td>등급</td>
                <td>{userInfo.grade}</td>
              </tr>
              <tr>
                <td>주소</td>
                <td>{userInfo.address}</td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
      <button onClick={openModal}>회원정보 수정</button>
      <button onClick={handleWithdrawal}>회원탈퇴</button>
    </div>
        </>
      )}
      


      
{isModalOpen && (
  <div className="mypage-modal-overlay">
    <div className="mypage-modal">
      <h2>회원정보 수정</h2>
      <div>
        <label htmlFor="updatedUsername"> 사용자 이름</label>
        <input
          type="text"
          id="updatedUsername"
          value={updatedUserInfo.name}
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
          value={updatedUserInfo.phone}
          onChange={(e) =>
            setUpdatedUserInfo({ ...updatedUserInfo, phoneNumber: e.target.value })
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
                        <button className="update-review">리뷰수정</button>
                        <button className="delete-review">리뷰삭제</button>
                      

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