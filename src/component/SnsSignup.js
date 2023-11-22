// SnsSignup.js

import React, { useState } from 'react';
import './SnsSignup.css';

const SnsSignup = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSignup = () => {
    // 회원가입 로직 구현: 서버로 입력한 정보 전송 등
    console.log('회원가입 시도:', { name, phoneNumber, address });
  };

  return (
    <div>
      <h2>소셜 회원가입 </h2>
      <div>
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          className="sns-signup-input"  // 수정된 부분
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">전화번호:</label>
        <input
          type="tel"
          id="phoneNumber"
          className="sns-signup-input"  // 수정된 부분
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">주소:</label>
        <input
          type="text"
          id="address"
          className="sns-signup-input"  // 수정된 부분
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
};

export default SnsSignup;
