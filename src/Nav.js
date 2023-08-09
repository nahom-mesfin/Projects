import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  return (
    <header className="header">
        <h1 className='main-header'>Addis Tenders</h1>
        <ul>
          <li>
            <Link to="/" className="navLink">
              Home
            </Link>
          </li>
          <li>
            <Link to="/free" className="navLink">
              Free
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navLink">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/Login" className="navLink">
              Login
            </Link>
          </li>
        </ul>
      </header>

  )
}

export default Nav