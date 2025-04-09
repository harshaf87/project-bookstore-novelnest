import React from 'react';
import { newBooks } from '../data/booksData';
import BookCard from '../components/BookCard';
import './NewBooks.css';

function NewBooks({ showCartNotification }) {
  return (
    <section id="new-books" className="page-section">
      <h2 className="page-title">New Books</h2>
      <div className="books-grid">
        {newBooks.map((book, index) => (
          <BookCard 
            key={index} 
            book={book} 
            onAddToCart={showCartNotification} 
          />
        ))}
      </div>
    </section>
  );
}

export default NewBooks;