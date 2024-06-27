import React from "react";
import "../styles/BookCard.css";
import { DEFAULT_BOOK_IMAGE_URL } from "../config";

const BookCard = ({ book, onClick }) => (
  <div className="book-card" onClick={onClick}>
    <img
      src={book.imageUrl || DEFAULT_BOOK_IMAGE_URL}
      alt={book.content.name}
    />
    <div className="book-details">
      <h4>{book.content.name}</h4>
      <p>{book.content.author}</p><br/>
        <p className={"exchangetype"}>{book.type}</p>
    </div>
  </div>
);

export default BookCard;
