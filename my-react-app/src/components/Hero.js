import React, { useEffect, useRef } from 'react';
import BookDisplay from './BookDisplay';
import './Hero.css';

function Hero({ onExplore }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Browse & Select E-Books</h1>
        <p>Find the best e-books from your favorite writers, explore hundreds of books with all possible categories, take advantage of the 50% discount and much more.</p>
        <button className="explore-btn" onClick={onExplore}>Explore Now</button>
      </div>
      <BookDisplay />
    </div>
  );
}

export default Hero;