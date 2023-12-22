// Payment.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import './Payment.css';

const Payment = ({  }) => {
  const location = useLocation();
  const totalPayment = location.state ? location.state.totalPayment : 0;
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [request, setRequest] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [isLoadAddressClicked, setIsLoadAddressClicked] = useState(false);
  const [isNewAddressClicked, setIsNewAddressClicked] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const fetchUserAddress = async () => {
    setIsLoadingAddress(true);
    try {
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      });
      setUserAddress(response.data.address);
    } catch (error) {
      console.error('Error fetching user address:', error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  useEffect(() => {
    // 기존 배송지 정보를 서버에서 가져오는 로직
    fetchUserAddress();
  }, []); // []를 전달하여 한 번만 실행되도록

  const handleLoadAddressClick = async () => {
    setIsLoadAddressClicked(true);
    setIsNewAddressClicked(false);

    // 기존 주소 불러오기
    await fetchUserAddress();

    setIsAddressModalOpen(false); // 다음 API 모달 닫기
  };

  const handleNewAddressClick = () => {
    setIsNewAddressClicked(true);
    setIsLoadAddressClicked(false);
    setIsAddressModalOpen(true);
  };
  const handleModalClose = () => {
    setIsAddressModalOpen(false);
  };

  const handleAddressSelect = (data) => {
    setSelectedAddress(data.address);

    // 신규 배송지일 경우에만 userAddress를 설정
    if (isNewAddressClicked) {
      setUserAddress(data.address);
    }

    setIsAddressModalOpen(false);
  };

  const handlePayment = () => {
    // 결제 로직
  };

  return (
    <div className="payment-container">
      <h2>주문하기</h2>
      {/* 배송지 정보 */}
      <div className="address-section">
        <button className="load-address-button" onClick={handleLoadAddressClick} disabled={isLoadingAddress}>
          {isLoadingAddress ? '로딩 중...' : '기존 배송지 불러오기'}
        </button>
        <button className="new-address-button" onClick={handleNewAddressClick}>
          신규 배송지 작성하기
        </button>
      </div>
      {/* 주소 입력칸 */}
      {isLoadAddressClicked && (
        <div>
          <label htmlFor="selectedAddress">기존 배송지:</label>
          <input type="text" id="selectedAddress" value={userAddress} readOnly />
        </div>
      )}
      {isNewAddressClicked && (
        <div>
          <label htmlFor="newAddress">신규 배송지 입력:</label>
          <input type="text" id="newAddress" value={userAddress} readOnly />
        </div>
      )}
      {/* 다음 우편번호 모달 */}
      {isAddressModalOpen && (
        <div className="daum-postcode-modal">
            <button className="modal-close-button" onClick={handleModalClose}>
            x
          </button>
          <DaumPostcode onComplete={handleAddressSelect} autoClose animation height={500} />
        </div>
      )}
      {/* 요청사항 및 결제수단 */}
      <div className="additional-info-section">
        <div className="request-section">
          <label htmlFor="request">요청사항:</label>
          <textarea id="request" rows="3" placeholder="특별한 요청이 있으시면 입력해주세요" value={request} onChange={(e) => setRequest(e.target.value)}></textarea>
        </div>
        <div className="payment-method-section">
          <label htmlFor="paymentMethod">결제수단:</label>
          <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="creditCard">신용카드</option>
            <option value="bankTransfer">만나서 직접결제</option>
          </select>
        </div>
      </div>
      {/* 예상 소요시간과 총 결제금액 */}
      <div className="summary-section">
        <div className="delivery-time">
          <span>예상 소요시간:</span>
          <span>30분</span>
        </div>
        <div className="total-price">
          <span>총 결제 금액: {totalPayment}원</span>
        </div>
      </div>
      {/* 결제 버튼 */}
      {/* <button className="pay-button" onClick={handlePayment}>
        결제하러 가기
      </button> */}
    </div>
  );
};

export default Payment;