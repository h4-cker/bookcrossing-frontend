import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BookCard from "../components/BookCard";
import BookDetailsModal from "../components/BookDetailsModal";
import AddBookModal from "../components/AddBookModal";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/ContentPage.css";
import { useHttp } from "../hooks/http.hook";
import { BASE_URL } from "../config";

const ContentPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAddBookModalOpen, setAddBookModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    year: "",
    language: "",
    exchangeType: "",
  });

  const handleBookClick = (book) => setSelectedBook(book);
  const closeBookDetails = () => setSelectedBook(null);
  const openAddBookModal = () => setAddBookModalOpen(true);
  const closeAddBookModal = () => setAddBookModalOpen(false);

  const applyFilters = (newFilters) => setFilters(newFilters);

  const addBook = (newBook) => {
    setBooks([...books, { id: books.length + 1, ...newBook }]);
  };

  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("currentLocation")) || "Москва"
  );
  const [message, setMessage] = useState("");

  const { request } = useHttp();

  useEffect(() => {
    async function fetchAds() {
      let data = await request(`${BASE_URL}/ads/locations/${location}/books`);
      if (data.message) {
        setBooks([]);
        setMessage(data.message);
      } else {
        setMessage("");
        setBooks(data);
      }
    }
    fetchAds();
  }, [location]);

  const handleLocationChange = async (event) => {
    setLocation(event.target.value);
    localStorage.setItem("currentLocation", JSON.stringify(event.target.value));
  };

  return (
    <div className="content-page">
      <Header
        onAddBookClick={openAddBookModal}
        location={location}
        handleLocationChange={handleLocationChange}
      />
      <div className="content-container">
        <FilterSidebar onFilterChange={applyFilters} />
        <div className="books-grid">
          {message
            ? message
            : books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => handleBookClick(book)}
                />
              ))}
        </div>
      </div>
      {selectedBook && (
        <BookDetailsModal book={selectedBook} onClose={closeBookDetails} />
      )}
      {isAddBookModalOpen && (
        <AddBookModal onClose={closeAddBookModal} onAddBook={addBook} />
      )}
    </div>
  );
};

export default ContentPage;
