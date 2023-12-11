// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Login = () => {
  const { login } = useAuth();
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
      login();
      navigate('/');
    }

    function success_store() {
      login();
      navigate('/managermain');
    }

    function success_admin() {
      login();
      navigate('/managermain');
    }

    function fail() {
      alert('로그인 실패했습니다.');
    };

    axios.post('/api/login', user, {
      headers: { // 로컬 스토리지에서 액세스 토큰 값을 가져와 헤더에 추가
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('서버 응답:', response); //테스트 코드
      if (response.status === 200 || response.status === 201) {
          localStorage.setItem('access_token', response.data.token);
          localStorage.setItem('store_id', response.data.storeId);
          localStorage.setItem('user_id', response.data.id);

          if (response.data.role === 'ROLE_STORE') {
            //해당 유저의 음식점이 있으면 true, 없으면 false

            return success_store();
          }
          else if (response.data.role === 'ROLE_ADMIN') {
            return success_admin();
          }
          else {
            return success_user();
          }
      } 
      else {
          console.log('error res:', response.data);
          return fail();
      }
    })
    .catch(function (error) {
      alert(error.response.data);
      console.log('서버 에러 코드:', error);
    });
  };

  const handleSocialLogin = (provider) => {
    console.log(`SNS ${provider} 계정으로 로그인 시도`);
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

export default Login;
