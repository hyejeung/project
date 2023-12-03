// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = user;

  const handleUser = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    console.log('로그인 시도:', { email, password });

    function success_user() {
      navigate('/');
    }

    function success_admin() {
      navigate('/managermain');
    }

    function fail() {
      alert('로그인 실패했습니다.');
    }

    httpRequest('/api/login', user, success_user, success_admin, fail);
  };

  const handleSocialLogin = (provider) => {
    console.log(`SNS ${provider} 계정으로 로그인 시도`);
  };

  const handleSignUp = () => {
    console.log('회원가입 페이지로 이동');
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <div>
        <label htmlFor="email">아이디</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleUser}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={handleUser}
            className="password-input"
          />
          <div className="toggle-password" onClick={handleTogglePassword}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </div>
        </div>
      </div>
      <div>
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>
      </div>
      <div>
        <Link to="/sns-signup">
          <button className="social-button-google" onClick={() => handleSocialLogin('Google')}>Google로 로그인</button>
        </Link>
        <Link to="/sns-signup">
          <button className="social-button-facebook" onClick={() => handleSocialLogin('Facebook')}>Facebook으로 로그인</button>
        </Link>
      </div>
      <div className="signup-text">
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

function httpRequest(url, body, success_user, success_admin, fail) {
  axios.post(url, body, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('access_token', response.data.token);
        console.log('response 값 출력', response.data.role);

        if (response.data.role === 'ROLE_ADMIN') {
          return success_admin();
        }
        else {
          return success_user();
        }

      }
      else {
        return fail();
      }
    })
    .catch(error => {
      console.error('에러 발생:', error);
      fail(); // 에러 발생 시도 실패로 처리
    });
}

export default Login;
