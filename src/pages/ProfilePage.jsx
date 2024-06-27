import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/ProfilePage.css';

const initialUserData = {
    name: 'John Doe',
    phone: '123-456-7890',
    description: 'Book lover and exchange enthusiast',
    avatar: 'https://via.placeholder.com/150',
};

const initialUserBooks = [
    {
        id: 1,
        title: 'Book Title 1',
        author: 'Author 1',
        image: 'https://via.placeholder.com/150',
        description: 'Description 1',
        genre: 'Fiction',
        isbn: '1234567890',
        language: 'English',
        year: '2020',
    },
    {
        id: 2,
        title: 'Book Title 2',
        author: 'Author 2',
        image: 'https://via.placeholder.com/150',
        description: 'Description 2',
        genre: 'Non-Fiction',
        isbn: '0987654321',
        language: 'English',
        year: '2018',
    },
];

const ProfilePage = () => {
    const [editingProfile, setEditingProfile] = useState(false);
    const [avatar, setAvatar] = useState(initialUserData.avatar);
    const [name, setName] = useState(initialUserData.name);
    const [phone, setPhone] = useState(initialUserData.phone);
    const [description, setDescription] = useState(initialUserData.description);
    const [userBooks, setUserBooks] = useState(initialUserBooks);
    const [editingBook, setEditingBook] = useState(null);
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [bookIsbn, setBookIsbn] = useState('');
    const [bookLanguage, setBookLanguage] = useState('');
    const [bookYear, setBookYear] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setAvatar(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const toggleEditingProfile = () => setEditingProfile(!editingProfile);

    const handleEditBook = (book) => {
        setEditingBook(book);
        setBookTitle(book.title);
        setBookAuthor(book.author);
        setBookDescription(book.description);
        setBookGenre(book.genre);
        setBookIsbn(book.isbn);
        setBookLanguage(book.language);
        setBookYear(book.year);
    };

    const handleSaveBook = () => {
        setUserBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.id === editingBook.id
                    ? {
                        ...book,
                        title: bookTitle,
                        author: bookAuthor,
                        description: bookDescription,
                        genre: bookGenre,
                        isbn: bookIsbn,
                        language: bookLanguage,
                        year: bookYear
                    }
                    : book
            )
        );
        setEditingBook(null);
    };

    const handleDeleteBook = () => {
        setUserBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookToDelete));
        setBookToDelete(null);
        setShowConfirmDelete(false);
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-container">
                <div className="profile-info">
                    <img src={avatar} alt="Avatar" className="avatar" />
                    {editingProfile ? (
                        <div className="edit-profile">
                            <input type="file" onChange={handleAvatarChange} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button onClick={toggleEditingProfile}>Сохранить</button>
                        </div>
                    ) : (
                        <div className="profile-details">
                            <h2>{name}</h2>
                            <p>{phone}</p>
                            <p>{description}</p>
                            <button onClick={toggleEditingProfile}>Изменить</button>
                        </div>
                    )}
                </div>
                <div className="user-books">
                    <h3>Мои книги</h3>
                    <div className="book-list">
                        {userBooks.map((book) => (
                            <div key={book.id} className="book-card">
                                <img src={book.image} alt={book.title} />
                                <div className="book-info">
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                    <button onClick={() => handleEditBook(book)}>Изменить</button>
                                    <button onClick={() => { setBookToDelete(book.id); setShowConfirmDelete(true); }}>Удалить</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {editingBook && (
                        <div className="edit-book-modal">
                            <h3>Изменить</h3>
                            <label>
                                Название
                                <input
                                    type="text"
                                    value={bookTitle}
                                    onChange={(e) => setBookTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                Автор
                                <input
                                    type="text"
                                    value={bookAuthor}
                                    onChange={(e) => setBookAuthor(e.target.value)}
                                />
                            </label>
                            <label>
                                Описание
                                <textarea
                                    value={bookDescription}
                                    onChange={(e) => setBookDescription(e.target.value)}
                                />
                            </label>
                            <label>
                                Жанр
                                <input
                                    type="text"
                                    value={bookGenre}
                                    onChange={(e) => setBookGenre(e.target.value)}
                                />
                            </label>
                            <label>
                                ISBN
                                <input
                                    type="text"
                                    value={bookIsbn}
                                    onChange={(e) => setBookIsbn(e.target.value)}
                                />
                            </label>
                            <label>
                                Язык
                                <input
                                    type="text"
                                    value={bookLanguage}
                                    onChange={(e) => setBookLanguage(e.target.value)}
                                />
                            </label>
                            <label>
                                Год выпуска
                                <input
                                    type="text"
                                    value={bookYear}
                                    onChange={(e) => setBookYear(e.target.value)}
                                />
                            </label>
                            <button onClick={handleSaveBook}>Сохранить</button>
                            <button onClick={() => setEditingBook(null)}>Отменить</button>
                        </div>
                    )}
                    {showConfirmDelete && (
                        <div className="confirm-delete-modal">
                            <p>Вы уверены, что хотите удалить книгу?</p>
                            <button onClick={handleDeleteBook}>Да</button>
                            <button onClick={() => setShowConfirmDelete(false)}>Нет</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
