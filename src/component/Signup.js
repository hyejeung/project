import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [memberType, setMemberType] = useState('regular');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    if (!memberType) {
      setError('회원 유형을 선택하세요.');
      return;
    }

    // 회원가입 로직
    console.log('회원가입 시도:', {
      newUsername,
      newPassword,
      email,
      phoneNumber,
      address,
      gender,
      memberType,
    });

    axios.post("/api/users", {
      email: email,
      password: newPassword,
      name: newUsername,
      phone: phoneNumber,
      gender: gender,
      role: memberType
    })
    .then(res => {
      console.log("200", res.data);

      if (res.status === 200 || res.status === 201) {
        alert('회원가입에 성공했습니다.');
        navigate('/login');
      }
    })
    .catch(error => console.log(error))
  };

  const handleDuplicateCheck = () => {
    console.log('이메일 중복 확인 시도:', email);
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleMemberTypeChange = (selectedMemberType) => {
    setMemberType(selectedMemberType);
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
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="duplicate-check" onClick={handleDuplicateCheck}>
          중복확인
        </button>
      </div>
      <div>
        <label htmlFor="newPassword">비밀번호</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newUsername">아이디</label>
        <input
          type="text"
          id="newUsername"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">전화번호</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">주소</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label className="gender-label">성별</label>
        <div className="gender-options">
          <label htmlFor="MALE">
            <input
              type="radio"
              id="MALE"
              name="gender"
              value="MALE"
              checked={gender === 'MALE'}
              onChange={() => handleGenderChange('MALE')}
            />
            남성
          </label>
          <label htmlFor="FEMALE">
            <input
              type="radio"
              id="FEMALE"
              name="gender"
              value="FEMALE"
              checked={gender === 'FEMALE'}
              onChange={() => handleGenderChange('FEMALE')}
            />
            여성
          </label>
        </div>
      </div>
      <div>
        <label className="member-type-label">회원 유형</label>
        <div className="member-type-options">
          <label htmlFor="ROLE_USER">
            <input
              type="radio"
              id="ROLE_USER"
              name="memberType"
              value="ROLE_USER"
              checked={memberType === 'ROLE_USER'}
              onChange={() => handleMemberTypeChange('ROLE_USER')}
            />
            일반 회원
          </label>
          <label htmlFor="ROLE_ADMIN">
            <input
              type="radio"
              id="ROLE_ADMIN"
              name="memberType"
              value="ROLE_ADMIN"
              checked={memberType === 'ROLE_ADMIN'}
              onChange={() => handleMemberTypeChange('ROLE_ADMIN')}
            />
            가맹점
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
