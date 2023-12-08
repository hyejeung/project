// ManagerMain.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import './ManagerMain.css';
import ProcessingOrders from './ProcessingOrders';
import InProgressOrders from './InProgressOrders';
import CancelledOrders from './CancelledOrders';
import DeliveredOrders from './DeliveredOrders';
import { useAuth } from '../AuthContext';

const ManagerMain = () => {
  const [selectedTab, setSelectedTab] = useState('processing');
  const [currentPage, setCurrentPage] = useState(0);
  const [ordersPerPage] = useState(10);
  const { updateOrders } = useAuth(); // orderContext 삭제
  const [perPage] = useState(5); // 페이지당 항목 수
  const [totalData, setTotalData] = useState(100);
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
      updateOrders(storeId, [...orders, orderData]); // 여기에서 updateOrders를 호출하여 주문 데이터를 업데이트
    });

    sse.addEventListener('processingOrder', e => {
      const orderData = JSON.parse(e.data);
      console.log("processingOrder event data: ", orderData);
      setProcessingOrders((prevOrders) => [...prevOrders, orderData]);
      updateOrders(storeId, [...orders, orderData]); // 여기에서 updateOrders를 호출하여 주문 데이터를 업데이트
    });
  }, [orders, updateOrders]);

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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // setOffset((pageNumber - 1) * perPage); // 이 줄은 현재 사용되지 않는 것 같아 주석 처리했습니다.
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

      <Pagination
        activePage={currentPage}
        itemsCountPerPage={perPage}
        totalItemsCount={totalData}
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
  );
};

export default ManagerMain;
