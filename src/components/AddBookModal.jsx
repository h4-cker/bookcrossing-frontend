import React, { useContext, useState } from "react";
import "../styles/AddBookForm.css";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

const AddBookModal = ({ onClose, onAddBook }) => {
  const [image, setImage] = useState("");
  const [form, setForm] = useState({
    bookName: "",
    bookAuthor: "",
    description: "",
    imageUrl: "",
    contacts: "",
    bookGenre: "",
    bookISBN: "",
    bookLanguage: "",
    bookReleaseYear: null,
    type: "",
    location: "",
  });
  const [formData, setFormData] = useState(null);
  const auth = useContext(AuthContext);

  const handleImageChange = (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("image", file);

    setFormData(formData);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sendObj = form;

    if (formData) {
      const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      setForm({ ...form, imageUrl: BASE_URL + "/" + data.url });
      sendObj.imageUrl = BASE_URL + "/" + data.url;
    }

    setForm({
      ...form,
      location: JSON.parse(localStorage.getItem("currentLocation")) || "Москва",
    });
    sendObj.location =
      JSON.parse(localStorage.getItem("currentLocation")) || "Москва";

    console.log(sendObj);

    const response = await fetch(`${BASE_URL}/ads/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj),
    });

    const data = await response.json();
    console.log(data);

    onClose();
    setForm({
      bookName: "",
      bookAuthor: "",
      description: "",
      imageUrl: "",
      contacts: "",
      bookGenre: "",
      bookISBN: "",
      bookLanguage: "",
      bookReleaseYear: null,
      type: "",
      location: "",
    });
    setFormData(null);
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="add-book-modal-overlay">
      <div className="add-book-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Добавить новую книгу</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="bookName"
            placeholder="Название"
            value={form.bookName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Автор"
            name="bookAuthor"
            value={form.bookAuthor}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Жанр"
            value={form.bookGenre}
            name="bookGenre"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="ISBN"
            name="bookISBN"
            value={form.bookISBN}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Язык"
            name="bookLanguage"
            value={form.bookLanguage}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Год издания"
            name="bookReleaseYear"
            value={form.bookReleaseYear}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Тип обмена"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Описание"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input type="file" onChange={handleImageChange} required />
          {image && <img src={image} alt="Book" className="preview-image" />}
          <input
            type="text"
            placeholder="Контакт"
            name="contacts"
            value={form.contacts}
            onChange={handleChange}
            required
          />
          <button type="submit">Разместить</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
