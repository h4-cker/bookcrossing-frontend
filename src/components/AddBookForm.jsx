import React, { useState } from 'react';
import '../styles/AddBookForm.css';

const AddBookForm = ({ addBook, isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phone) {
            alert('Phone number is required');
            return;
        }
        addBook({ title, image, rating, description, genre, exchangeOffers: [{ user: 'Current User', contact: 'current@example.com', phone }] });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="add-book-overlay">
            <form className="add-book-form" onSubmit={handleSubmit}>
                <h2>Add New Book</h2>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <button type="submit">Add Book</button>
                <button type="button" className="close-button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default AddBookForm;