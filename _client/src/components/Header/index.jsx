import React from 'react';
import Logo from "../assets/logo.png";

export const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className="container">
        <a className='navbar-brand' href="/">
          <div className="d-flex">
            <img src={Logo} alt=""/>
            Project Management
          </div>
        </a>
      </div>
    </nav>
  )
}
