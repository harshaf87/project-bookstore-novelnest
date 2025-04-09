import React from 'react';
import './BookCard.css';

function BookCard({ book, onAddToCart }) {
  // Create star rating based on book rating
  const createStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }
    
    // Add half star if needed
    if (halfStar) {
      stars.push(<span key="half" className="star">★</span>);
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star" style={{ opacity: 0.3 }}>★</span>);
    }
    
    return stars;
  };

  return (
    <div className="book-card">
      <div className="book-card-img">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-card-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-price">
          <span className="current-price">{book.price.toFixed(2)}</span>
          <span className="original-price">{book.originalPrice.toFixed(2)}</span>
        </div>
        <div className="book-rating">
          {createStarRating(book.rating)}
        </div>
        <button className="add-to-cart" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default BookCard;