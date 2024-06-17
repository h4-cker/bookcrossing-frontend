import React from 'react';
import '../styles/BookDetailsModal.css';

const BookDetailsModel = ({ book, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <h3>Exchange Offers:</h3>
                <ul className="exchange-offers">
                    {book.exchangeOffers.map((offer, index) => (
                        <li key={index}>{offer}</li>
                    ))}
                </ul>
                <button className="modal-close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BookDetailsModel;