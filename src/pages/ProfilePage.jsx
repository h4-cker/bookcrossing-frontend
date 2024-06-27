import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // импортируем хук useNavigate
import Header from '../components/Header';
import '../styles/ProfilePage.css';
import { useHttp } from "../hooks/http.hook.js";
import { BASE_URL } from "../config.jsx";

const ProfilePage = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userBooks, setUserBooks] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();

    const [editingProfile, setEditingProfile] = useState(false);
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

    const { request } = useHttp();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await request(`${BASE_URL}/profile/${userData.userId}`, "GET", null, {
                    Authorization: `Bearer ${userData.accessToken}`
                });
                setUserName(data.userInfo.name);
                setUserEmail(data.userInfo.email);
                setUserAvatar(data.userInfo.avatarUrl);
            } catch (e) {
                setUserName('');
                setUserEmail('');
                setUserAvatar('');
            }
        }

        async function fetchUserBooks() {
            try {
                const data = await request(`${BASE_URL}/ads/users/${userData.userId}/books`, "GET", null, {
                    Authorization: `Bearer ${userData.accessToken}`
                });
                setUserBooks(data);
            } catch (e) {
                setUserBooks([]);
            }
        }

        fetchUserData();
        fetchUserBooks();
    }, [request, userData.accessToken, userData.userId]);

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setUserAvatar(e.target.result);
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

    const handleLogout = () => {
        localStorage.removeItem("userData");
        navigate('/auth/login');
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-container">
                <div className="profile-info">
                    <img src={userAvatar} alt="Avatar" className="avatar" />
                    {editingProfile ? (
                        <div className="edit-profile">
                            <input type="file" onChange={handleAvatarChange} />
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="text"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <button onClick={toggleEditingProfile}>Сохранить</button>
                        </div>
                    ) : (
                        <div className="profile-details">
                            <h2>{userName}</h2>
                            <p>{userEmail}</p>
                            <button onClick={toggleEditingProfile}>Изменить</button>
                        </div>
                    )}
                    <button onClick={handleLogout} className="logout-button">Выйти</button>
                </div>
                <div className="user-books">
                    <h3>Мои книги</h3>
                    {userBooks.length > 0 ? (
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
                    ) : (
                        <p className="no-books">У вас пока нет объявлений.</p>
                    )}
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
