import { useState } from 'react';
import Header1 from '../components/Header1.jsx';
import SearchFilter from "../components/SearchFilter.jsx";
import BookCard from '../components/BookCard.jsx';
import BookDetailsModal from '../components/BookDetailsModal.jsx';
import AddBookForm from '../components/AddBookForm.jsx';
import '../styles/ContentPage.css';

const ContentPage = () => {
    const [books, setBooks] = useState([
        {
            title: 'Book 1',
            image: 'https://via.placeholder.com/150',
            rating: 4,
            description: 'Description of book 1',
            genre: 'Fiction',
            exchangeOffers: [
                {
                    user: 'User 1',
                    contact: 'user1@example.com',
                    phone: '123-456-7890',
                },
                {
                    user: 'User 2',
                    contact: 'user2@example.com',
                    phone: '987-654-3210',
                },
            ],
        },
        {
            title: 'Book 2',
            image: 'https://via.placeholder.com/150',
            rating: 5,
            description: 'Description of book 2',
            genre: 'Non-Fiction',
            exchangeOffers: [
                {
                    user: 'User 3',
                    contact: 'user3@example.com',
                    phone: '456-789-1230',
                },
            ],
        },
    ]);

    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddBookFormOpen, setIsAddBookFormOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual authentication logic

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) &&
        (genre === '' || book.genre === genre)
    );

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    const handleAddBookClick = () => {
        setIsAddBookFormOpen(true);
    };

    const handleAddBookFormClose = () => {
        setIsAddBookFormOpen(false);
    };

    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
        setIsAddBookFormOpen(false);
    };

    return (
        <div className="app">
            <div className="main-content">
                <Header1
                    onAddBookClick={handleAddBookClick}
                    isAuthenticated={isAuthenticated}
                />
                <SearchFilter
                    search={search}
                    setSearch={setSearch}
                    genre={genre}
                    setGenre={setGenre}
                />
                <div className="book-list">
                    {filteredBooks.map((book, index) => (
                        <BookCard
                            key={index}
                            book={book}
                            onClick={() => handleBookClick(book)}
                        />
                    ))}
                </div>
                <BookDetailsModal
                    book={selectedBook}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                />
                {isAddBookFormOpen && (
                    <AddBookForm onClose={handleAddBookFormClose} addBook={handleAddBook} />
                )}
            </div>
        </div>
    );
};

export default ContentPage;