import React, { useState } from 'react';
import '../styles/AddBookForm.css';

const AddBookForm = ({ addBook }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({ title, image, rating, description });
        setTitle('');
        setImage('');
        setRating('');
        setDescription('');
    };

    return (
        <form className="add-book-form" onSubmit={handleSubmit}>
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
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBookForm;