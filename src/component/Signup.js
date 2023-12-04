import React, { useState ,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
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
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');  // Add these lines
  const [passwordError, setPasswordError] = useState('');  // Add these lines
  const [confirmPasswordError, setConfirmPasswordError] = useState('');  // Add these lines
  const [phoneNumberError, setPhoneNumberError] = useState('');  // Add these lines
  const [genderError, setGenderError] = useState('');  // Add these lines
  const [memberTypeError, setMemberTypeError] = useState(''); 
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // 모달이 열릴 때 주소 상태 초기화
    setAddress('');
  }, [isAddressModalOpen]);

  const handleSignup = () => {
     // 유효성 검사
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


  const handleAddressSelect = (data) => {
    // 선택한 주소를 상태에 설정하거나 필요한 작업을 수행합니다
    setAddress(data.roadAddress);  // 예시: roadAddress를 사용
    console.log('주소 설정 완료:', data.roadAddress);
    // 모달을 닫습니다
    setIsAddressModalOpen(false);

    // 여기에서 추가 작업을 수행할 수 있습니다.
  };

  // 이 함수는 DaumPostcode에서 호출될 것입니다.
  const onCompletePost = (data) => {
    console.log('주소 검색 완료:', data);
    handleAddressSelect(data);
    // 추가로 실행해야 할 코드가 있다면 이곳에 작성합니다.
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
        <label htmlFor="email">이메일</label>
        <div className="email-input-container">
          <input
            type="text"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="duplicate-check" onClick={handleDuplicateCheck}>
            중복확인
          </button>
        </div>
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
        <label htmlFor="newUsername">닉네임</label>
        <input
          type="text"
          id="newUsername"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div className="address-container">
        <label htmlFor="address">주소</label>
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

      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} onSelect={onCompletePost} />
      <div className="gender-and-member-type-container">
        <div className="gender-options">
          <label htmlFor="MALE">
            남성
            <input
              type="radio"
              id="MALE"
              name="gender"
              value="MALE"
              checked={gender === 'MALE'}
              onChange={() => handleGenderChange('MALE')}
            />
          </label>
          <label htmlFor="FEMALE">
            여성
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
        <div className="member-type-options">
          <label htmlFor="ROLE_USER">
            일반 회원
            <input
              type="radio"
              id="ROLE_USER"
              name="memberType"
              value="ROLE_USER"
              checked={memberType === 'ROLE_USER'}
              onChange={() => handleMemberTypeChange('ROLE_USER')}
            />
          </label>
          <label htmlFor="ROLE_ADMIN">
            가맹점
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
      <div className="signup-button-container">
        {error && <p>{error}</p>}
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
};

export default Signup;  