import React, { useEffect, useRef } from 'react';
import { books } from '../data/booksData';
import './BookDisplay.css';

function BookDisplay() {
  const bookDisplayRef = useRef(null);
  
  useEffect(() => {
    const bookDisplay = bookDisplayRef.current;
    
    const scrollInterval = setInterval(() => {
      if (
        bookDisplay && 
        bookDisplay.scrollLeft < bookDisplay.scrollWidth - bookDisplay.clientWidth
      ) {
        bookDisplay.scrollLeft += 200;
      } else if (bookDisplay) {
        bookDisplay.scrollLeft = 0;
      }
    }, 3000);
    
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="book-display" ref={bookDisplayRef}>
      {books.map((book, index) => (
        <div className="book" key={index}>
          <div style={{ 
            height: '100%', 
            backgroundColor: book.color,
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: 'white', 
            textAlign: 'center', 
            padding: '20px'
          }}>
            <h3 style={{ marginBottom: '15px' }}>{book.title}</h3>
            <div style={{ 
              border: '1px solid rgba(255,255,255,0.3)', 
              width: '80%', 
              margin: '10px auto'
            }}></div>
            <p style={{ fontStyle: 'italic', marginTop: '15px' }}>A captivating story</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookDisplay;