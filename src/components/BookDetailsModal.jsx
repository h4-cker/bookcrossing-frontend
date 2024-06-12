import React from 'react';
import '../styles/BookDetailsModal.css';

const BookDetailsModal = ({ book, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BookDetailsModal;