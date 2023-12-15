import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faPhone, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Signup.css';

const AddressModal = ({ isOpen, onClose, onSelect }) => {
  const handleAddressSelect = (data) => {
    onSelect(data);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <DaumPostcode
            onComplete={handleAddressSelect}
            autoClose
            animation
            height={500}
          />
        </div>
      )}
    </>
  );
};

const Signup = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [memberType, setMemberType] = useState('regular');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [memberTypeError, setMemberTypeError] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAddress('');
  }, [isAddressModalOpen]);
  
  useEffect(() => {
    // 비밀번호 확인이 변경될 때마다 일치 여부를 확인하고 상태 업데이트
    setIsPasswordMatched(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handleSignup = () => {
    if (!isValidEmail(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return;
    } else {
      setEmailError('');
    }

    if (!isValidPassword(newPassword)) {
      setPasswordError('비밀번호는 8자리 이상이어야 하며, 특수문자를 포함해야 합니다.');
      return;
    } else {
      setPasswordError('');
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setConfirmPasswordError('');
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError('전화번호 형식이 올바르지 않습니다.');
      return;
    } else {
      setPhoneNumberError('');
    }

    if (!gender) {
      setGenderError('성별을 선택하세요.');
      return;
    } else {
      setGenderError('');
    }

    if (!memberType) {
      setMemberTypeError('회원 유형을 선택하세요.');
      return;
    } else {
      setMemberTypeError('');
    }

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

  const handleAddressSelect = (data) => {
    setAddress(data.roadAddress);
    console.log('주소 설정 완료:', data.roadAddress);
    setIsAddressModalOpen(false);
  };

  const onCompletePost = (data) => {
    console.log('주소 검색 완료:', data);
    handleAddressSelect(data);
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
      <div className="email-container">
        <label htmlFor="email">  <FontAwesomeIcon icon={faEnvelope} className="icon" />
        이메일</label>
        <div className="email-input-container">
          <input
            type="text"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              isValidEmail(e.target.value)
                ? setEmailError('')
                : setEmailError('이메일 형식이 올바르지 않습니다.');
            }}
          />
          <button className="duplicate-check" onClick={handleDuplicateCheck}>
            중복확인
          </button>
        </div>
        {emailError && <p className="error-message">{emailError}</p>}
      </div>
      <div>
      <label htmlFor="newPassword">
          <FontAwesomeIcon icon={faLock} className="icon" />
          비밀번호
        </label>
        <input
          type="password"
          id="newPassword"
          placeholder="비밀번호를 입력하세요"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            // 비밀번호 확인 창이 있고, 비밀번호가 일치할 때 체크 표시
            setIsPasswordMatched(newPassword !== '' && e.target.value === confirmPassword);
            isValidPassword(e.target.value)
              ? setPasswordError('')
              : setPasswordError('비밀번호는 8자리 이상이어야 하며, 특수문자를 포함해야 합니다.');
          }}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <div>
      <label htmlFor="confirmPassword">
          <FontAwesomeIcon icon={faLock} className="icon" />
          비밀번호 확인
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setIsPasswordMatched(newPassword !== '' && newPassword === e.target.value);
              e.target.value === newPassword
                ? setConfirmPasswordError('')
                : setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            }}
          />
          {isPasswordMatched && confirmPassword !== '' && (
            <span style={{ position: 'absolute', right: '5px', top: '30%', transform: 'translateY(-50%)', color: 'green' }}>
              ✔
            </span>
          )}
        </div>
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
      </div>
      <div>
      <label htmlFor="newUsername">
          <FontAwesomeIcon icon={faUser} className="icon" />
          닉네임
        </label>
        <input
          type="text"
          id="newUsername"
          placeholder="닉네임을 입력하세요"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div>
      <label htmlFor="phoneNumber">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          전화번호
        </label>
  <input
    type="text"
    id="phoneNumber"
    placeholder="전화번호를 입력하세요(010-0000-0000)"
    value={phoneNumber}
    onChange={(e) => {
      setPhoneNumber(e.target.value);
      isValidPhoneNumber(e.target.value)
        ? setPhoneNumberError('')
        : setPhoneNumberError('전화번호 형식이 올바르지 않습니다.');
    }}
  />
  {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
</div>
      <div className="address-container">
      <label htmlFor="address">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          주소
        </label>
        <div className="address-input-container">
          <input
            type="text"
            id="address"
            placeholder="주소를 입력하세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="search-address" onClick={() => setIsAddressModalOpen(true)}>
            주소검색
          </button>
        </div>
      </div>
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(true)} onSelect={onCompletePost} />
      <div className="gender-and-member-type-container">
        <div className="gender-options">
          <label>성별 선택</label>
          <div>
            <label htmlFor="FEMALE">
             <span>여성</span> 
              <input
                type="radio"
                id="FEMALE"
                name="gender"
                value="FEMALE"
                checked={gender === 'FEMALE'}
                onChange={() => handleGenderChange('FEMALE')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="MALE">
            <span>남성</span> 
              <input
                type="radio"
                id="MALE"
                name="gender"
                value="MALE"
                checked={gender === 'MALE'}
                onChange={() => handleGenderChange('MALE')}
              />
            </label>
          </div>
        </div>
        <div className="member-type-options">
          <label>회원 유형 선택</label>
          <div>
            <label htmlFor="ROLE_USER">
            <span>일반 회원</span> 
              <input
                type="radio"
                id="ROLE_USER"
                name="memberType"
                value="ROLE_USER"
                checked={memberType === 'ROLE_USER'}
                onChange={() => handleMemberTypeChange('ROLE_USER')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="ROLE_ADMIN">
            <span>가맹점</span> 
              <input
                type="radio"
                id="ROLE_ADMIN"
                name="memberType"
                value="ROLE_ADMIN"
                checked={memberType === 'ROLE_ADMIN'}
                onChange={() => handleMemberTypeChange('ROLE_ADMIN')}
              />
            </label>
          </div>
        </div>
      </div>
      {genderError && <p className="error-message">{genderError}</p>}
      {memberTypeError && <p className="error-message">{memberTypeError}</p>}
      <div className="signup-button-container">
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
};

export default Signup;
