import React, { useEffect, useState } from "react";
import "../styles/FilterSidebar.css";
import { BASE_URL } from "../config";
import { useHttp } from "../hooks/http.hook";

const FilterSidebar = ({ onFilterChange, isOpen, toggleSidebar }) => {
  const { request } = useHttp();
  const [categories, setCategories] = useState({
    authors: [],
    genres: [],
    languages: [],
    passTypes: [],
    releaseYears: [],
  });

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedExchangeType, setSelectedExchangeType] = useState("");

  const handleGenreChange = (event) => setSelectedGenre(event.target.value);
  const handleAuthorChange = (event) => setSelectedAuthor(event.target.value);
  const handleYearChange = (event) => setSelectedYear(event.target.value);
  const handleLanguageChange = (event) =>
    setSelectedLanguage(event.target.value);
  const handleExchangeTypeChange = (event) =>
    setSelectedExchangeType(event.target.value);

  useEffect(() => {
    async function fetchCategories() {
      const data = await request(`${BASE_URL}/categories/books`);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const applyFilters = () => {
    onFilterChange({
      genre: selectedGenre,
      author: selectedAuthor,
      year: selectedYear,
      language: selectedLanguage,
      exchangeType: selectedExchangeType,
    });
  };

  return (
    <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>
      <div className="filter-section">
        <h4>Жанр</h4>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Все</option>
          {categories.genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <h4>Автор</h4>
        <select value={selectedAuthor} onChange={handleAuthorChange}>
          <option value="">Все</option>
          {categories.authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <h4>Год выпуска</h4>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Все</option>
          {categories.releaseYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <h4>Язык</h4>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="">Все</option>
          {categories.languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <h4>Тип обмена</h4>
        <select
          value={selectedExchangeType}
          onChange={handleExchangeTypeChange}
        >
          <option value="">Все</option>
          {categories.passTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button onClick={applyFilters} className="apply-filters-button">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
