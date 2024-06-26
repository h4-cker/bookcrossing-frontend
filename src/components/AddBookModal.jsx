import React, { useState } from 'react';
import '../styles/AddBookForm.css';

const AddBookModal = ({ onClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [contact, setContact] = useState('');
    const [genre, setGenre] = useState('');
    const [isbn, setIsbn] = useState('');
    const [language, setLanguage] = useState('');
    const [year, setYear] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            title,
            author,
            description,
            image,
            contact,
            genre,
            isbn,
            language,
            year,
            offers: [],
        };
        onAddBook(newBook);
        onClose();
    };

    return (
        <div className="add-book-modal-overlay">
            <div className="add-book-modal">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input type="file" onChange={handleImageChange} required />
                    {image && <img src={image} alt="Book" className="preview-image" />}
                    <input
                        type="text"
                        placeholder="Contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                    <button type="submit">Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;
