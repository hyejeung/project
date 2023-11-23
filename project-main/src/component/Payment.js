// Payment.js
import React from 'react';
import './Payment.css'; 

const Payment = () => {
  return (
    <div className="payment-container">
      <h2>주문하기</h2>
     {/* 배송지 정보 */}
     <div className="address-section">
        <button className="load-address-button">기존 배송지 불러오기</button>
        <button className="new-address-button">신규 배송지 작성하기</button>
      </div>

      {/* 요청사항 및 결제수단 */}
      <div className="additional-info-section">
        <div className="request-section">
          <label htmlFor="request">요청사항:</label>
          <textarea id="request" rows="3" placeholder="특별한 요청이 있으시면 입력해주세요"></textarea>
        </div>

        <div className="payment-method-section">
          <label htmlFor="paymentMethod">결제수단:</label>
          <select id="paymentMethod">
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
          <span>총 결제 금액:</span>
          <span>16000원</span> {/* 여기에 실제 총 결제 금액을 동적으로 출력 */}
        </div>
      </div>

      {/* 결제 버튼 */}
      <button className="pay-button">결제하러 가기</button>
    </div>
  );
};

export default Payment;

