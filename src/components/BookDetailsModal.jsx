import React from "react";
import "../styles/BookDetailsModal.css";
import { DEFAULT_BOOK_IMAGE_URL } from "../config";

const BookDetailsModal = ({ book, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <img
          src={book.imageUrl || DEFAULT_BOOK_IMAGE_URL}
          alt={book.content.name}
          className="book-image"
        />
        <h2>{book.content.name}</h2>
        <h3>{book.content.author}</h3>
        <p>{book.description}</p>
        <div className="exchange-offers">
          <div className="offer">
            <p>
              <strong>User:</strong> {book.user.name}
            </p>
            <p>
              <strong>Contact:</strong> {book.contacts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
