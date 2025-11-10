import React, { useState } from 'react';
import './Navigation.css';

function Navigation({ activePage, setActivePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">🌆</div>
          <span className="logo-text">IOTTech Consulting</span>
        </div>
        <nav className="nav">
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <button
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activePage === 'services' ? 'active' : ''}`}
                onClick={() => handleNavClick('services')}
              >
                Services
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activePage === 'case-studies' ? 'active' : ''}`}
                onClick={() => handleNavClick('case-studies')}
              >
                Case Studies
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact Us
              </button>
            </li>
          </ul>
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
