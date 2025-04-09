import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NewBooks from './pages/NewBooks';
import Discount from './pages/Discount';
import SearchModal from './components/SearchModal';
import FeatureNotification from './components/FeatureNotification';
import CartNotification from './components/CartNotification';
import LoginModal from './components/LoginModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [featureNotification, setFeatureNotification] = useState({
    visible: false,
    title: '',
    message: ''
  });
  const [cartNotificationVisible, setCartNotificationVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Function to show feature notification
  const showFeatureInDevelopment = (title, message) => {
    setFeatureNotification({
      visible: true,
      title,
      message
    });
  };

  // Function to show search modal
  const showSearch = () => {
    setSearchVisible(true);
  };

  // Function to show cart notification
  const showCartNotification = () => {
    setCartNotificationVisible(true);
  };

  // Function to show login modal
  const showLogin = () => {
    setLoginModalVisible(true);
  };

  // Function to show forgot password modal
  const showForgotPassword = () => {
    setLoginModalVisible(false);
    setForgotPasswordVisible(true);
  };

  // Function to handle successful login
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setLoginModalVisible(false);
    showFeatureInDevelopment('Welcome', `You've successfully logged in as ${user.username}!`);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header 
            showSearch={showSearch} 
            showFeatureInDevelopment={showFeatureInDevelopment}
            showLogin={showLogin}
            isLoggedIn={isLoggedIn}
            username={username}
          />
          
          <main>
            <Routes>
              <Route path="/" element={<Home showFeatureInDevelopment={showFeatureInDevelopment} />} />
              <Route path="/new-books" element={<NewBooks showCartNotification={showCartNotification} />} />
              <Route path="/discount" element={<Discount showCartNotification={showCartNotification} />} />
            </Routes>
          </main>

          {/* Modals */}
          <SearchModal 
            isVisible={searchVisible} 
            closeSearch={() => setSearchVisible(false)} 
          />
          
          <FeatureNotification 
            isVisible={featureNotification.visible}
            title={featureNotification.title}
            message={featureNotification.message}
            onClose={() => setFeatureNotification({...featureNotification, visible: false})}
          />
          
          <CartNotification 
            isVisible={cartNotificationVisible}
            onClose={() => setCartNotificationVisible(false)}
          />
          
          <LoginModal 
            isVisible={loginModalVisible}
            onClose={() => setLoginModalVisible(false)}
            onForgotPassword={showForgotPassword}
            onLoginSuccess={handleLoginSuccess}
            onRegister={() => {
              setLoginModalVisible(false);
              showFeatureInDevelopment('Registration', 'The registration feature is coming soon! You will be able to create a new account and access exclusive features.');
            }}
          />
          
          <ForgotPasswordModal 
            isVisible={forgotPasswordVisible}
            onClose={() => setForgotPasswordVisible(false)}
            backToLogin={() => {
              setForgotPasswordVisible(false);
              setLoginModalVisible(true);
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;