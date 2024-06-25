import React from 'react';
import '../styles/BookDetailsModal.css';

const BookDetailsModal = ({ book, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={book.image} alt={book.title} className="book-image" />
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <p>{book.description}</p>
                <div className="exchange-offers">
                    <h4>Exchange Offers:</h4>
                    {/* Replace with real data */}
                    <div className="offer">
                        <p><strong>User:</strong> User1</p>
                        <p><strong>Contact:</strong> user1@example.com</p>
                    </div>
                    <div className="offer">
                        <p><strong>User:</strong> User2</p>
                        <p><strong>Contact:</strong> user2@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsModal;
