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
  const [searchTerm, setSearchTerm] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    author: "",
    genre: "",
    language: "",
    passTypes: "",
    releaseYear: "",
  });
  const [categoriesApplied, setCategoriesApplied] = useState(false);
  const [searchApplied, setSearchApplied] = useState(false);
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("currentLocation")) || "Москва"
  );
  const [message, setMessage] = useState("");

  const handleBookClick = (book) => setSelectedBook(book);
  const closeBookDetails = () => setSelectedBook(null);
  const openAddBookModal = () => setAddBookModalOpen(true);
  const closeAddBookModal = () => setAddBookModalOpen(false);

  const { request } = useHttp();

  const addBook = (newBook) => {
    setBooks([...books, { id: books.length + 1, ...newBook }]);
  };

  useEffect(() => {
    async function fetchAds() {
      try {
        let queryParams = new URLSearchParams({});

        const filledCategories = {};

        for (let category in selectedCategories) {
          if (selectedCategories[category]) {
            filledCategories[category] = selectedCategories[category];
          }
        }

        if (filledCategories) {
          queryParams = new URLSearchParams(filledCategories);
        }

        if (searchValue) {
          queryParams.append(searchTerm, searchValue);
        }

        let data = await request(
          `${BASE_URL}/ads/locations/${location}/books?${queryParams.toString()}`
        );

        setMessage("");
        setBooks(data);
      } catch (error) {
        setMessage(error.message);
        setBooks([]);
      }
    }
    fetchAds();
  }, [location, categoriesApplied, searchApplied]);

  const handleLocationChange = async (event) => {
    setLocation(event.target.value);
    localStorage.setItem("currentLocation", JSON.stringify(event.target.value));

    setSearchTerm("name");
    setSearchValue("");
    setSelectedCategories({
      author: "",
      genre: "",
      language: "",
      passTypes: "",
      releaseYear: "",
    });
  };

  const handleCategoriesApplying = () => {
    setCategoriesApplied(!categoriesApplied);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchApplying = () => {
    setSearchApplied(!searchApplied);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="content-page">
      <Header
        onAddBookClick={openAddBookModal}
        location={location}
        handleLocationChange={handleLocationChange}
        toggleSidebar={toggleSidebar}
      />
      <div className="content-container">
        <FilterSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          handleCategoriesApplying={handleCategoriesApplying}
        />
        <div className="books-section">
          <div className="search-container">
            <div className="search-bar">
              <select
                className="search-select"
                value={searchTerm}
                onChange={handleSearchChange}
              >
                <option value="name">Название</option>
                <option value="ISBN">ISBN</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="search-input"
              />
              <button className="search-button" onClick={handleSearchApplying}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
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
      </div>
      {selectedBook && (
        <BookDetailsModal book={selectedBook} onClose={closeBookDetails} />
      )}
      {isAddBookModalOpen && (
        <AddBookModal onClose={closeAddBookModal} onAddBook={addBook} />
      )}
      <button className="floating-add-button" onClick={openAddBookModal}>
        <i className="fa fa-plus"></i>
      </button>
    </div>
  );
};

export default ContentPage;
