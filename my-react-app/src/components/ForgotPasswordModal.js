import React, { useState, useEffect, useRef } from 'react';
import './ForgotPasswordModal.css';

/**
 * ForgotPasswordModal - A modal for password reset request
 * 
 * @param {Object} props
 * @param {boolean} props.isVisible - Whether the modal is visible
 * @param {Function} props.onClose - Function to call when modal should close
 * @param {Function} props.onSubmit - Function to call with the email for password reset
 * @param {Function} props.onBackToLogin - Function to call when user wants to go back to login
 */
function ForgotPasswordModal({ 
  isVisible, 
  onClose, 
  onSubmit,
  onBackToLogin
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const modalRef = useRef(null);
  const emailInputRef = useRef(null);
  
  // Focus email input when modal becomes visible
  useEffect(() => {
    if (isVisible && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isVisible]);
  
  // Reset state when modal opens/closes
  useEffect(() => {
    if (isVisible) {
      setEmail('');
      setError('');
      setSuccess(false);
      setIsLoading(false);
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
    
    try {
      setIsLoading(true);
      
      // Call the submit handler from props
      if (onSubmit) {
        await onSubmit(email);
      }
      
      // Show success message instead of closing
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBackToLogin = () => {
    handleClose();
    if (onBackToLogin) {
      onBackToLogin();
    }
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="forgot-password-modal-overlay">
      <div className="forgot-password-modal" ref={modalRef}>
        <button 
          className="forgot-password-modal__close-btn" 
          onClick={handleClose}
          aria-label="Close form"
        >
          ✕
        </button>
        
        <div className="forgot-password-modal__header">
          <h2 className="forgot-password-modal__title">Reset Password</h2>
          {!success ? (
            <p className="forgot-password-modal__subtitle">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          ) : (
            <p className="forgot-password-modal__subtitle">
              Check your email for password reset instructions.
            </p>
          )}
        </div>
        
        {error && (
          <div className="forgot-password-modal__error">
            {error}
          </div>
        )}
        
        {!success ? (
          <form className="forgot-password-modal__form" onSubmit={handleSubmit}>
            <div className="forgot-password-modal__form-group">
              <label htmlFor="forgot-email" className="forgot-password-modal__label">
                Email Address
              </label>
              <input
                id="forgot-email"
                ref={emailInputRef}
                type="email"
                className="forgot-password-modal__input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              className="forgot-password-modal__submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="forgot-password-modal__success">
            <div className="forgot-password-modal__success-icon">✓</div>
            <p className="forgot-password-modal__success-message">
              We've sent recovery instructions to <strong>{email}</strong>
            </p>
            <p className="forgot-password-modal__success-note">
              If you don't see the email, check your spam folder.
            </p>
          </div>
        )}
        
        <div className="forgot-password-modal__footer">
          <button 
            className="forgot-password-modal__back-btn"
            onClick={handleBackToLogin}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;