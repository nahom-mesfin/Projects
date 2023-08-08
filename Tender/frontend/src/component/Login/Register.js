import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from "../../HomePage";
import axios from 'axios';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const navigate = useNavigate('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/register', {
      email: email,
      password: pass,
      name: name,
      mobile: mobile
    })
      .then((res) => {
        alert('Successfully registered and logged in');
        // Save the JWT token to local storage
        localStorage.setItem('token', res.data.token);
        // Redirect to the desired page
        navigate('/login');
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="auth-form-container">
        <div className= "auth-container">
        <h2 className="form-title">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
         <div className="form-row"> 
         

         <label htmlFor="name">

          
            <strong>Full Name:</strong>
          </label>
          <br />
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Full Name"
            required
          /> 
          </div>
          <br />
          <div className="form-row">
          <label htmlFor="email">
            <strong>Email:   </strong>
          </label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            required
          />
          </div>
          <br />

          <div className="form-row"> 
          <label htmlFor="mobileNumber">
            <strong>Mobile Number:</strong>
          </label>
          
          <br />
          <div className="form-row">
            <select name="countryCode" className="select-country-code">
              <option value="+1">+251</option>
              <option value="+1">+252</option>
              <option value="+91">+253</option>
              <option value="+44">+254</option>
              <option value="+86">+255</option>
            </select>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              pattern="[0-9]{9}"
              placeholder="911 - 11 - 11 - 11"
            />
          </div>
          </div>
          <br />

          <div className="form-row">
          <label htmlFor="password">
            <strong>Password:</strong>
          </label>
          <br />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
          />
          </div>

          <br />
          <button type="submit">Register:</button>
        </form>
        <div className="router-login">
          <span className="sub-title">Already have an account?</span>
          <Link to="/login"> Login here.</Link>
        </div>
      </div>
      </div>

    </>
  );
}

export default Register;