// Signup.js

import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState(''); // 추가: 주소 상태 추가
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    // 유효성 검사
    if (!isValidEmail(email)) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    }

    if (!isValidPassword(newPassword)) {
      setError('비밀번호는 8자리 이상이어야 하며, 특수문자를 포함해야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError('전화번호 형식이 올바르지 않습니다.');
      return;
    }

    if (!gender) {
      setError('성별을 선택하세요.');
      return;
    }

    // 회원가입 로직을 구현합니다.
    console.log('회원가입 시도:', { newUsername, newPassword, email, phoneNumber, address, gender });
  };

  const handleDuplicateCheck = () => {
    console.log('아이디 중복 확인 시도:', newUsername);
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const isValidPhoneNumber = (value) => {
    const phoneNumberRegex = /^010-\d{4}-\d{4}$/;
    return phoneNumberRegex.test(value);
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <div>
        <label htmlFor="newUsername">아이디:</label>
        <input
          type="text"
          id="newUsername"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button className="duplicate-check" onClick={handleDuplicateCheck}>중복확인</button>
      </div>
      <div>
        <label htmlFor="newPassword">비밀번호:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">비밀번호 확인:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">이메일:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">전화번호:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">주소:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label className="gender-label">성별:</label>
        <div className="gender-options">
          <label htmlFor="male">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={() => handleGenderChange('male')}
            />
            남성
          </label>
          <label htmlFor="female">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={() => handleGenderChange('female')}
            />
            여성
          </label>
        </div>
      </div>
      <div>
        {error && <p>{error}</p>}
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
};

export default Signup;