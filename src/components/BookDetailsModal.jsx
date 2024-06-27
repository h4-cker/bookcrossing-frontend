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
        <p>
          <strong>Описание:</strong> {book.description}
        </p>
        <p>
          <strong>Жанр:</strong> {book.content.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book.content.ISBN}
        </p>
        <p>
          <strong>Язык:</strong> {book.content.language}
        </p>
        <p>
          <strong>Год выпуска:</strong> {book.content.releaseYear}
        </p>
        <p>
          <strong>Город:</strong> {book.location}
        </p>
        <div className="exchange-offers">
          <div className="offer">
            <p>
              <strong>Владелец:</strong> {book.user.name}
            </p>
            <p>
              <strong>Контакт:</strong> {book.contacts}
            </p>
            <p>
              <strong>Тип обмена: </strong> {book.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
