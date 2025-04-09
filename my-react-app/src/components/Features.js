import React from 'react';
import './Features.css';

function Features() {
  return (
    <div className="features">
      <div className="feature">
        <span className="feature-icon">🚚</span>
        <h3>Free Shipping</h3>
        <p>Order More Than Rs 99</p>
      </div>
      
      <div className="feature">
        <span className="feature-icon">🔒</span>
        <h3>Secure Payment</h3>
        <p>100% Secure Payment</p>
      </div>
      
      <div className="feature">
        <span className="feature-icon">🎧</span>
        <h3>24/7 Support</h3>
        <p>Call us anytime</p>
      </div>
    </div>
  );
}

export default Features;