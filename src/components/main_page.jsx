import React, { useState } from 'react';
import Header from './Header1.jsx';
import SearchFilter from "./SearchFilter.jsx";
import BookCard from './BookCard.jsx';
import BookDetailsModal from './BookDetailsModal.jsx';
import AddBookForm from './AddBookForm.jsx';
import '../styles/main_page.css';

const Main_page = () => {
    const [books, setBooks] = useState([
        {
            title: 'Book 1',
            image: 'https://via.placeholder.com/150',
            rating: 4,
            description: 'Description of book 1',
            genre: 'Fiction'
        },
        // Add more book objects here
    ]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    const addBook = (book) => {
        setBooks([...books, book]);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) &&
        (genre === '' || book.genre === genre)
    );

    return (
        <div className="app">
            <Header />
            <SearchFilter search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} />
            <div className="book-list">
                {filteredBooks.map((book, index) => (
                    <BookCard key={index} book={book} onClick={setSelectedBook} />
                ))}
            </div>
            <BookDetailsModal book={selectedBook} isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} />
            <AddBookForm addBook={addBook} />
        </div>
    );
};

export default Main_page;