// ManagerMain.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [processingOrders, setProcessingOrders] = useState([]);

  // 주문 목록이 업데이트되면 로그에 출력
  useEffect(() => {
    const storeId = localStorage.getItem('storeId');
    console.log('storeId:', storeId);

    // SSE 이벤트 수신
    const sse = new EventSource(`/api/connect`);

    sse.addEventListener('connect', async (event) => {
      const { data: receiveConnectData } = event;
      console.log('connect event data: ', receiveConnectData);
    });

    sse.addEventListener('newOrder', e => {
      const orderData = JSON.parse(e.data);
      console.log("newOrder event data: ", orderData);
      setOrders((prevOrders) => [...prevOrders, orderData]);
    });

    sse.addEventListener('processingOrder', e => {
      const orderData = JSON.parse(e.data);
      console.log("processingOrder event data: ", orderData);
      setProcessingOrders((prevOrders) => [...prevOrders, orderData]);
    });
  }, []);

  const processOrder = (orderId, status) => {
    console.log(`주문 ID ${orderId}를 ${status} 상태로 처리합니다.`);
    // 주문 처리 로직 추가
    axios.patch(`/api/orders/${orderId}/${status}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
      .catch(error => console.error('Error fetching menu list:', error));
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
        <ProcessingOrders orders={orders} processOrder={processOrder} />
      )}
      {selectedTab === 'inProgress' && <InProgressOrders orders={processingOrders} processOrder={processOrder} />}
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
