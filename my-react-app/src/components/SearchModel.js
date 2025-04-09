import React, { useState, useEffect, useRef } from 'react';
import './SearchModal.css';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Mock search function - in a real app, you would connect to your API
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock results
      const mockResults = [
        {
          id: 1,
          title: 'The Great Gatsby',
          description: 'F. Scott Fitzgerald\'s classic novel about the American Dream'
        },
        {
          id: 2,
          title: 'To Kill a Mockingbird',
          description: 'Harper Lee\'s renowned novel about justice and race in the American South'
        },
        {
          id: 3,
          title: '1984',
          description: 'George Orwell\'s dystopian masterpiece about totalitarianism'
        }
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 300);
  };

  const handleResultClick = (result) => {
    // Handle the result click (e.g., navigate to book page)
    console.log('Selected:', result);
    onClose();
  };

  return (
    <div className={`search-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search for books, authors, or genres..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="search-modal-body">
          {isLoading ? (
            <div className="no-results">Searching...</div>
          ) : searchResults.length > 0 ? (
            <ul className="search-results">
              {searchResults.map((result) => (
                <li 
                  key={result.id} 
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="result-title">{result.title}</div>
                  <div className="result-description">{result.description}</div>
                </li>
              ))}
            </ul>
          ) : searchQuery.trim() !== '' ? (
            <div className="no-results">No results found</div>
          ) : null}
        </div>
        
        <div className="search-modal-footer">
          <span>Search results</span>
          <div className="keyboard-shortcuts">
            <div className="keyboard-shortcut">
              <span className="key">↑</span>
              <span className="key">↓</span>
              <span>to navigate</span>
            </div>
            <div className="keyboard-shortcut">
              <span className="key">ESC</span>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;