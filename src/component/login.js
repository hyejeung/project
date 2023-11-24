// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직 구현: 서버로 아이디와 비밀번호 전송 등
    console.log('로그인 시도:', { username, password });
    // 여기에서 로그인 성공 여부를 판단하여 페이지 이동
    const loginSuccessful = true; // 예시로 성공했다고 가정

    if (loginSuccessful) {
      // Link 컴포넌트를 사용하여 관리자 페이지로 이동
      return (
        <Link to="/register" />
      );
    } else {
      alert('로그인 실패. 올바른 사용자 이름과 비밀번호를 입력하세요.');
    }
  };
  

  const handleSocialLogin = (provider) => {
    // SNS 로그인 로직 구현
    console.log(`SNS ${provider} 계정으로 로그인 시도`);
  };

  const handleSignUp = () => {
    // 회원가입 페이지로 이동 또는 회원가입 모달 표시 등의 로직
    console.log('회원가입 페이지로 이동');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label htmlFor="username">아이디:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className="login-button" onClick={handleLogin}>로그인</button>
      </div>
      <div>
      <Link to="/sns-signup">
          <button className="social-button-google" onClick={() => handleSocialLogin('Google')}>Google로 로그인</button>
        </Link>
        <Link to="/sns-signup">
          <button className="social-button-facebook" onClick={() => handleSocialLogin('Facebook')}>Facebook으로 로그인</button>
        </Link>
      </div>
      {/* <div className="signup-text" onClick={handleSignUp}>아직 회원이 아니신가요?</div>
      <button className="signup-link" onClick={handleSignUp}>회원가입</button> */}
       <div className="signup-text">
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default Login;