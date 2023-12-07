// ManagerMain.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import './ManagerMain.css';
import ProcessingOrders from './ProcessingOrders';
import InProgressOrders from './InProgressOrders';
import CancelledOrders from './CancelledOrders';
import DeliveredOrders from './DeliveredOrders';

const ManagerMain = () => {
  const [selectedTab, setSelectedTab] = useState('processing');
  const [currentPage, setCurrentPage] = useState(0);
  const [ordersPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(100);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
  const [perPage] = useState(5); // 페이지당 항목 수
  const [offset, setOffset] = useState(0);
  const [totalData, setTotalData] = useState(100);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100);


  const storeId = state && state.storeId;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?storeId=${storeId}`);
        setTotalOrders(response.data.length);
        setOrders(response.data);
      } catch (error) {
        console.error('주문 목록을 불러오는 데 실패했습니다:', error.message);
      }
    };

    fetchOrders();
  }, [storeId]);

  const processOrder = (orderId, status) => {
    console.log(`주문 ID ${orderId}를 ${status} 상태로 처리합니다.`);
    // 주문 처리 로직 추가
  };

  const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * perPage); // 수정: perPage를 곱해서 오프셋 설정
  };

  return (
    <div className="managermain-container">
      <h1>주문 관리 페이지</h1>

      <div className="order-buttons">
        <button onClick={() => setSelectedTab('processing')}>접수대기</button>
        <button onClick={() => setSelectedTab('inProgress')}>처리중</button>
        <button onClick={() => setSelectedTab('cancelled')}>주문취소</button>
        <button onClick={() => setSelectedTab('delivered')}>배달완료</button>
      </div>

      {selectedTab === 'processing' && (
        <ProcessingOrders orders={currentOrders} processOrder={processOrder} />
      )}
      {selectedTab === 'inProgress' && <InProgressOrders orders={currentOrders} />}
      {selectedTab === 'cancelled' && <CancelledOrders orders={currentOrders} />}
      {selectedTab === 'delivered' && <DeliveredOrders orders={currentOrders} />}

      <Pagination
  activePage={currentPage}
  itemsCountPerPage={perPage}
  totalItemsCount={totalData}
  pageRangeDisplayed={5}
  onChange={handlePageChange}
  prevPageText="<"
  nextPageText=">"
  firstPageText="<<"  // 수정: 첫 페이지로 이동하는 버튼
  lastPageText=">>"   // 수정: 마지막 페이지로 이동하는 버튼
  itemClass="page-item"
  linkClass="page-link"
  innerClass="pagination"
/>
    </div>
  );
};

export default ManagerMain;