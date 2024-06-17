import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book, onClick }) => {
    return (
        <div className="book-card" onClick={() => onClick(book)}>
            <img src={book.image} alt={book.title} className="book-image" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-rating">Rating: {book.rating}/5</p>
        </div>
    );
};

export default BookCard;