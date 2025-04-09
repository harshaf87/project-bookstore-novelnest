import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import './Header.css';

function Header({ showSearch, showFeatureInDevelopment, showLogin, isLoggedIn, username }) {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <header>
      <div className="logo">
        <span>📚</span> Novelnest Bookstore
      </div>
      
      <nav className="nav-menu">
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <a 
              href="#" 
              onClick={() => showFeatureInDevelopment('Featured Books', 'Our featured books section is coming soon! We are carefully selecting the best titles for you.')}
            >
              Featured
            </a>
          </li>
          <li>
            <Link 
              to="/discount" 
              className={location.pathname === '/discount' ? 'active' : ''}
            >
              Discount
            </Link>
          </li>
          <li>
            <Link 
              to="/new-books" 
              className={location.pathname === '/new-books' ? 'active' : ''}
            >
              New Books
            </Link>
          </li>
          <li>
            <a 
              href="#" 
              onClick={() => showFeatureInDevelopment('Customer Testimonials', 'We are collecting customer reviews and testimonials. This section will be available soon!')}
            >
              Testimonial
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="nav-icons">
        <button onClick={showSearch}>🔍</button>
        <button onClick={isLoggedIn ? () => {} : showLogin}>
          {isLoggedIn ? '✓' : '👤'}
        </button>
        <button onClick={toggleDarkMode}>
          <span id="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;