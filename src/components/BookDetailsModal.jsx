import React from 'react';
import '../styles/BookDetailsModal.css';

const BookDetailsModal = ({ book, isOpen, onClose }) => {
    if (!isOpen || !book) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-header">
                    <h2>{book.title}</h2>
                    <p>Rating: {book.rating}/5</p>
                </div>
                <div className="modal-body">
                    <img src={book.image} alt={book.title} className="modal-book-image" />
                    <p>{book.description}</p>
                </div>
                <div className="modal-footer">
                    <h3>Exchange Offers</h3>
                    {book.exchangeOffers.map((offer, index) => (
                        <div key={index} className="offer-details">
                            <p><strong>User:</strong> {offer.user}</p>
                            <p><strong>Contact:</strong> {offer.contact}</p>
                            <p><strong>Phone:</strong> {offer.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetailsModal;