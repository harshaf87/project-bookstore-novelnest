import React, { useState, useEffect } from 'react';
import './CartNotification.css';

/**
 * CartNotification - A component to show notifications when items are added to cart
 * 
 * @param {Object} props
 * @param {boolean} props.visible - Whether the notification is visible
 * @param {Object} props.item - The item that was added to cart
 * @param {Function} props.onClose - Callback function when notification is closed
 * @param {Function} props.onViewCart - Callback function when "View Cart" is clicked
 * @param {number} props.autoHideDuration - Time in ms before notification auto-hides (0 for no auto-hide)
 */
function CartNotification({ 
  visible = false, 
  item = null, 
  onClose, 
  onViewCart,
  autoHideDuration = 5000 
}) {
  const [isVisible, setIsVisible] = useState(visible);
  
  // Update visibility when prop changes
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  
  // Handle auto-hide timer
  useEffect(() => {
    if (isVisible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  const handleViewCart = () => {
    handleClose();
    if (onViewCart) {
      onViewCart();
    }
  };
  
  if (!isVisible || !item) {
    return null;
  }
  
  return (
    <div className="cart-notification">
      <div className="cart-notification__content">
        <div className="cart-notification__image">
          {item.imageUrl && (
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="cart-notification__product-image"
            />
          )}
        </div>
        
        <div className="cart-notification__info">
          <h4 className="cart-notification__title">Added to Cart</h4>
          <p className="cart-notification__product-name">{item.name}</p>
          {item.variant && (
            <p className="cart-notification__product-variant">{item.variant}</p>
          )}
          <p className="cart-notification__product-price">${item.price.toFixed(2)}</p>
        </div>
        
        <button 
          className="cart-notification__close-btn"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
      
      <div className="cart-notification__actions">
        <button 
          className="cart-notification__view-cart-btn"
          onClick={handleViewCart}
        >
          View Cart
        </button>
        <button 
          className="cart-notification__continue-btn"
          onClick={handleClose}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartNotification;