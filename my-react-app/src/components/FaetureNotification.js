import React, { useState, useEffect } from 'react';
import './FeatureNotification.css';
import { FaTimes, FaBookOpen } from 'react-icons/fa';

const FeatureNotification = ({ feature, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Add small delay before calling onClose to allow animation to complete
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  if (!feature) return null;

  return (
    <div className={`feature-notification ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="feature-notification-icon">
        <FaBookOpen />
      </div>
      <div className="feature-notification-content">
        <h3>New Feature!</h3>
        <p>{feature.description}</p>
      </div>
      <button className="feature-notification-close" onClick={handleClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default FeatureNotification;