import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import './Signup.css';

const AddressModal = ({ isOpen, onClose, onSelect }) => {
  const handleAddressSelect = (data) => {
    onSelect(data);
    onClose();
  };

  const [visible, setVisible] = useState(false); // 우편번호 컴포넌트의 노출여부 상태

  useEffect(() => {
    // isOpen이 변경될 때마다 visible 상태 업데이트
    setVisible(isOpen);
  }, [isOpen]);

  return (
    <>
      {visible && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <button title="닫기" onClick={() => setVisible(false)} >닫기</button> 
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

const InputField = ({ label, type, value, placeholder, onChange, error }) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <input type={type} id={label} placeholder={placeholder} value={value} onChange={onChange} />
    {error && <p className="error-message">{error}</p>}
  </div>
);

const RadioInputGroup = ({ label, options, selectedValue, onChange, error }) => {
  return (
    <div className="radio-input-group">
      <label>{label}</label>
      <div className="radio-options">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
    newUsername: '',
    phoneNumber: '',
    address: '',
    gender: '',
    memberType: 'ROLE_USER',
  });

  const [errors, setErrors] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: '',
    memberType: '',
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, address: '' }));
  }, []);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^010-\d{4}-\d{4}$/;
    return phoneNumberRegex.test(value);
  };

  const validateGender = (value) => {
    return value === 'FEMALE' || value === 'MALE';
  };

  const validateMemberType = (value) => {
    return value === 'ROLE_USER' || value === 'ROLE_STORE';
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      newPassword: '',
      confirmPassword: '',
      phoneNumber: '',
      gender: '',
      memberType: '',
    };

    if (!validateEmail(form.email)) {
      newErrors.email = '이메일 형식이 올바르지 않습니다.';
    }

    if (!validatePassword(form.newPassword)) {
      newErrors.newPassword = '비밀번호는 8자리 이상이어야 하며, 특수문자를 포함해야 합니다.';
    }

    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!validatePhoneNumber(form.phoneNumber)) {
      newErrors.phoneNumber = '전화번호 형식이 올바르지 않습니다.';
    }

    if (!validateGender(form.gender)) {
      newErrors.gender = '성별을 선택하세요.';
    }

    if (!validateMemberType(form.memberType)) {
      newErrors.memberType = '회원 유형을 선택하세요.';
    }

    setErrors(newErrors);

    // 에러가 하나라도 있으면 유효하지 않음
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSignup = () => {
    if (validateForm()) {
      console.log('회원가입 시도:', form);

      axios.post("/api/users", {
        email: form.email,
        password: form.newPassword,
        name: form.newUsername,
        phone: form.phoneNumber,
        gender: form.gender,
        role: form.memberType,
      })
        .then(res => {
          console.log("200", res.data);

          if (res.status === 200 || res.status === 201) {
            alert('회원가입에 성공했습니다.');
            navigate('/login');
          }
        })
        .catch(error => console.log(error))
    } else {
      console.log('유효성 검사 실패');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <InputField
        label="이메일"
        type="text"
        placeholder="이메일을 입력하세요"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
      />
      <InputField
        label="비밀번호"
        type="password"
        value={form.newPassword}
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        error={errors.newPassword}
      />
      <InputField
        label="비밀번호 확인"
        type="password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
      />
      <InputField
        label="이름"
        type="text"
        value={form.newUsername}
        onChange={(e) => setForm({ ...form, newUsername: e.target.value })}
      />
      <InputField
        label="전화번호"
        type="text"
        placeholder="전화번호를 입력하세요(010-0000-0000)"
        value={form.phoneNumber}
        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        error={errors.phoneNumber}
      />
      <InputField
        label="주소"
        type="text"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <button className="search-address" onClick={() => setIsAddressModalOpen((prev) => !prev)}>
        주소검색
      </button>
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen((prev) => !prev)} onSelect={(data) => setForm({ ...form, address: data.roadAddress })} />
      <RadioInputGroup
        label="성별 선택"
        options={[
          { label: '여성', value: 'FEMALE' },
          { label: '남성', value: 'MALE' },
        ]}
        selectedValue={form.gender}
        onChange={(value) => setForm({ ...form, gender: value })}
        error={errors.gender}
      />
      <RadioInputGroup
        label="회원 유형 선택"
        options={[
          { label: '일반 회원', value: 'ROLE_USER' },
          { label: '가맹점', value: 'ROLE_STORE' },
        ]}
        selectedValue={form.memberType}
        onChange={(value) => setForm({ ...form, memberType: value })}
        error={errors.memberType}
      />
      <div className="signup-button-container">
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
};

export default Signup;