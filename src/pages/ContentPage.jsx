import React, { useState } from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import BookDetailsModal from '../components/BookDetailsModal';
import AddBookModal from '../components/AddBookModal';
import FilterSidebar from '../components/FilterSidebar';
import '../styles/ContentPage.css';

const initialBooks = [
    {
        id: 1,
        title: 'Book Title 1',
        author: 'Author 1',
        image: 'https://via.placeholder.com/150',
        description: 'Description 1',
        offers: [
            { id: 1, user: 'User A', contact: 'contactA@example.com' },
            { id: 2, user: 'User B', contact: 'contactB@example.com' },
        ],
    },
    {
        id: 2,
        title: 'Book Title 2',
        author: 'Author 2',
        image: 'https://via.placeholder.com/150',
        description: 'Description 2',
        offers: [
            { id: 3, user: 'User C', contact: 'contactC@example.com' },
            { id: 4, user: 'User D', contact: 'contactD@example.com' },
        ],
    },
];

const ContentPage = () => {
    const [books, setBooks] = useState(initialBooks);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isAddBookModalOpen, setAddBookModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        genre: '',
        author: '',
        year: '',
        language: '',
        exchangeType: '',
    });

    const handleBookClick = (book) => setSelectedBook(book);
    const closeBookDetails = () => setSelectedBook(null);
    const openAddBookModal = () => setAddBookModalOpen(true);
    const closeAddBookModal = () => setAddBookModalOpen(false);

    const applyFilters = (newFilters) => setFilters(newFilters);

    const addBook = (newBook) => {
        setBooks([...books, { id: books.length + 1, ...newBook }]);
    };

    const filteredBooks = books.filter((book) => {
        return (
            (filters.genre === '' || book.genre === filters.genre) &&
            (filters.author === '' || book.author === filters.author) &&
            (filters.year === '' || book.year === filters.year) &&
            (filters.language === '' || book.language === filters.language) &&
            (filters.exchangeType === '' || book.exchangeType === filters.exchangeType)
        );
    });

    return (
        <div className="content-page">
            <Header onAddBookClick={openAddBookModal} />
            <div className="content-container">
                <FilterSidebar onFilterChange={applyFilters} />
                <div className="books-grid">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} onClick={() => handleBookClick(book)} />
                    ))}
                </div>
            </div>
            {selectedBook && <BookDetailsModal book={selectedBook} onClose={closeBookDetails} />}
            {isAddBookModalOpen && <AddBookModal onClose={closeAddBookModal} onAddBook={addBook} />}
        </div>
    );
};

export default ContentPage;
