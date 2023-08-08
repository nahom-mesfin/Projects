import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/login', {
        email: email,
        password: pass,
      })
      .then((res) => {
        console.log('Response:', res.data);
        if (res.data.user) {
          if (res.data.user.email === 'nahommesfin116@gmail.com') {
            console.log('Logged in as Admin');
            alert('Successfully logged in to Admin Account');
            localStorage.setItem('token', res.data.token);
            navigate('/admin');
          } else {
            console.log('Logged in');
            alert('Successfully logged in');
            localStorage.setItem('token', res.data.token);
            navigate('/paidpage');
          }
        } else {
          if (res.data.error === 'Invalid email or password') {
            console.log('Invalid email or password');
            setErrorMessage('Wrong email or password');
          } else {
            console.log('Unknown email');
            setErrorMessage('Unknown email');
          }
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        setErrorMessage('An error occurred during login');
      });
  };

  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <div className="login-form">
          <h2 className="form-title"> Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="email">
              <strong><label htmlFor="email">Email:</label></strong><br />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"

              />
            </div>
            <div className="password">
              <strong><label htmlFor="password">Password:</label></strong><br />
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                name="password"
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="router-login">
          <span>Don't have an account?</span>
          <Link to="/register"> Register here.</Link>
        </div>
      </div>
    </div>
  );
};