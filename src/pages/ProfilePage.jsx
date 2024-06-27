import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/ProfilePage.css";
import { useHttp } from "../hooks/http.hook.js";
import { BASE_URL } from "../config.jsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userAds, setUserAds] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("currentLocation")) || "Москва"
  );

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAdId, setEditingAdId] = useState(null);
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookLanguage, setBookLanguage] = useState("");
  const [bookReleaseYear, setBookReleaseYear] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);

  const { request } = useHttp();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await request(
          `${BASE_URL}/profile/${userData.userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${userData.accessToken}`,
          }
        );
        setUserName(data.userInfo.name);
        setUserEmail(data.userInfo.email);
        setUserAvatar(data.userInfo.avatarUrl);
        console.log(data);
      } catch (e) {
        setUserName("");
        setUserEmail("");
        setUserAvatar("");
      }
    }

    async function fetchUserBooks() {
      try {
        const data = await request(
          `${BASE_URL}/ads/users/${userData.userId}/books`,
          "GET",
          null,
          {
            Authorization: `Bearer ${userData.accessToken}`,
          }
        );
        console.log(data[0]._id);
        setUserAds(data);
      } catch (e) {
        setUserAds([]);
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

      const formData = new FormData();
      formData.append("image", file);
      const responseImage = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
        body: formData,
      });
      const data = await responseImage.json();
      const fileURL = BASE_URL + "/" + data.url;
      console.log(fileURL);

      await fetch(`${BASE_URL}/profile/setAvatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarUrl: fileURL,
        }),
      });
    }
  };

  const toggleEditingProfile = async () => {
    setEditingProfile(!editingProfile);
    const responseName = await request(
      `${BASE_URL}/profile/name`,
      "PATCH",
      {
        userId: userData.userId,
        name: userName,
      },
      {
        Authorization: `Bearer ${userData.accessToken}`,
      }
    );
    const responseEmail = await request(
      `${BASE_URL}/profile/email`,
      "PATCH",
      {
        userId: userData.userId,
        email: userEmail,
      },
      {
        Authorization: `Bearer ${userData.accessToken}`,
      }
    );
  };

  const handleEditAd = (ad, adId) => {
    setEditingAdId(adId);
    setBookName(ad.content.name);
    setBookAuthor(ad.content.author);
    setBookDescription(ad.description);
    setBookGenre(ad.content.genre);
    setBookISBN(ad.content.ISBN);
    setBookLanguage(ad.content.language);
    setBookReleaseYear(ad.content.releaseYear);
  };

  const handleSaveBook = async () => {
    const data = await request(
        `${BASE_URL}/ads/books/${editingAdId}`,
        "PATCH",
        {
          description: bookDescription,
          bookName: bookName,
          bookAuthor: bookAuthor,
          bookGenre: bookGenre,
          bookISBN: bookISBN,
          bookLanguage: bookLanguage,
          bookReleaseYear: bookReleaseYear,
        },
        {
          Authorization: `Bearer ${userData.accessToken}`,
        }
    );
    setEditingAdId(null);
    window.location.reload();
  };

  const handleDeleteBook = async () => {
    const data = await request(
        `${BASE_URL}/ads/books/${adToDelete}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${userData.accessToken}`,
        }
    );
    setAdToDelete(null);
    setShowConfirmDelete(false);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  };

  const handleLocationChange = async (event) => {
    setLocation(event.target.value);
    localStorage.setItem("currentLocation", JSON.stringify(event.target.value));
  };

  return (
    <div className="profile-page">
      <Header
        // onAddBookClick={openAddBookModal}
        location={location}
        handleLocationChange={handleLocationChange}
      />
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
          <button onClick={handleLogout} className="logout-button">
            Выйти
          </button>
        </div>
        <div className="user-books">
          <h3>Мои книги</h3>
          {userAds.length > 0 ? (
            <div className="book-list">
              {userAds.map((ad) => (
                <div key={ad._id} className="book-card">
                  <img src={ad.imageUrl} alt={ad.content.name} />
                  <div className="book-info">
                    <h3>{ad.content.name}</h3>
                    <p>{ad.content.author}</p>
                    <button onClick={() => handleEditAd(ad, ad._id)}>
                      Изменить
                    </button>
                    <button
                      onClick={() => {
                        setAdToDelete(ad._id);
                        setShowConfirmDelete(true);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-books">У вас пока нет объявлений.</p>
          )}
          {editingAdId && (
            <div className="edit-book-modal">
              <h3>Изменить</h3>
              <label>
                Название
                <input
                  type="text"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
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
                  value={bookISBN}
                  onChange={(e) => setBookISBN(e.target.value)}
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
                  value={bookReleaseYear}
                  onChange={(e) => setBookReleaseYear(e.target.value)}
                />
              </label>
              <button onClick={ handleSaveBook }>Сохранить</button>
              <button onClick={() => setEditingAdId(null)}>Отменить</button>
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
