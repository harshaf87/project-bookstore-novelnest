import React, { useState, useEffect, useRef } from 'react';
import './LoginModal.css';

/**
 * LoginModal - A modal component for user login
 * 
 * @param {Object} props
 * @param {boolean} props.isVisible - Whether the modal is visible
 * @param {Function} props.onClose - Function to call when modal should close
 * @param {Function} props.onLogin - Function to call with login credentials
 * @param {Function} props.onRegisterClick - Function to call when register link is clicked
 * @param {Function} props.onForgotPassword - Function to call when forgot password is clicked
 */
function LoginModal({ 
  isVisible, 
  onClose, 
  onLogin, 
  onRegisterClick,
  onForgotPassword
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const modalRef = useRef(null);
  const emailInputRef = useRef(null);
  
  // Focus email input when modal becomes visible
  useEffect(() => {
    if (isVisible && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isVisible]);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    
    if (isVisible) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible]);
  
  const handleClose = () => {
    // Reset form state
    setEmail('');
    setPassword('');
    setError('');
    setIsLoading(false);
    
    if (onClose) {
      onClose();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call the login handler from props
      if (onLogin) {
        await onLogin({ email, password, rememberMe });
      }
      
      // Close modal on successful login
      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleForgotPassword = (e) => {
    e.preventDefault();
    handleClose();
    if (onForgotPassword) {
      onForgotPassword();
    }
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="login-modal-overlay">
      <div className="login-modal" ref={modalRef}>
        <button 
          className="login-modal__close-btn" 
          onClick={handleClose}
          aria-label="Close login form"
        >
          ✕
        </button>
        
        <div className="login-modal__header">
          <h2 className="login-modal__title">Log In</h2>
          <p className="login-modal__subtitle">Welcome back! Please enter your details.</p>
        </div>
        
        {error && (
          <div className="login-modal__error">
            {error}
          </div>
        )}
        
        <form className="login-modal__form" onSubmit={handleSubmit}>
          <div className="login-modal__form-group">
            <label htmlFor="email" className="login-modal__label">Email Address</label>
            <input
              id="email"
              ref={emailInputRef}
              type="email"
              className="login-modal__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="login-modal__form-group">
            <div className="login-modal__password-header">
              <label htmlFor="password" className="login-modal__label">Password</label>
              <button 
                className="login-modal__forgot-btn"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              className="login-modal__input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="login-modal__form-group login-modal__remember-me">
            <label className="login-modal__checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="login-modal__submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="login-modal__footer">
          <p>
            Don't have an account?{' '}
            <button 
              className="login-modal__register-btn"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;