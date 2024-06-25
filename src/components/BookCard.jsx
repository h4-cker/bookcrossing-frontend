import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book, onClick }) => (
    <div className="book-card" onClick={onClick}>
        <img src={book.image} alt={book.title} />
        <div className="book-details">
            <h4>{book.title}</h4>
            <p>{book.author}</p>
        </div>
    </div>
);

export default BookCard;
