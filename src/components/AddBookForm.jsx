import React, { useState } from 'react';
import '../styles/AddBookForm.css';

const AddBookForm = ({ addBook, isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [exchangeOffers, setExchangeOffers] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({
            title,
            image,
            rating,
            description,
            exchangeOffers: exchangeOffers.split(',').map(offer => offer.trim())
        });
        setTitle('');
        setImage('');
        setRating('');
        setDescription('');
        setExchangeOffers('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="add-book-overlay" onClick={onClose}>
            <form className="add-book-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <textarea
                    placeholder="Exchange Offers (comma separated)"
                    value={exchangeOffers}
                    onChange={(e) => setExchangeOffers(e.target.value)}
                />
                <button type="submit">Add Book</button>
                <button type="button" className="close-button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default AddBookForm;