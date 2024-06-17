import React, { useState } from 'react';
import SearchFilter from "../components/SearchFilter.jsx";
import BookCard from '../components/BookCard.jsx';
import BookDetailsModel from '../components/BookDetailsModel.jsx';
import AddBookForm from '../components/AddBookForm.jsx';
import '../styles/MainPage.css';
import Header from "../components/Header.jsx";

const MainPage = () => {
    const [books, setBooks] = useState([
        {
            title: 'Book 1',
            image: 'https://via.placeholder.com/150',
            rating: 4,
            description: 'Description of book 1',
            genre: 'Fiction',
            exchangeOffers: ['Offer 1', 'Offer 2']
        },
        // Add more book objects here
    ]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [isAddBookFormOpen, setIsAddBookFormOpen] = useState(false);

    const addBook = (book) => {
        setBooks([...books, book]);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) &&
        (genre === '' || book.genre === genre)
    );

    return (
        <div className="app">
            <Header onAddBookClick={() => setIsAddBookFormOpen(true)} />
            <SearchFilter search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} />
            <div className="book-list">
                {filteredBooks.map((book, index) => (
                    <BookCard key={index} book={book} onClick={setSelectedBook} />
                ))}
            </div>
            <BookDetailsModel book={selectedBook} isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} />
            <AddBookForm addBook={addBook} isOpen={isAddBookFormOpen} onClose={() => setIsAddBookFormOpen(false)} />
        </div>
    );
};


export default MainPage;