// ManagerMain.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
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

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
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

      <ReactPaginate
         prevPageText="<"
         nextPageText=">"
         firstPageText="<<"
         lastPageText=">>"
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(totalOrders / ordersPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
      />
    </div>
  );
};

export default ManagerMain;
