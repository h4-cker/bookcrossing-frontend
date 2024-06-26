import React, { useEffect, useState } from "react";
import "../styles/FilterSidebar.css";
import { BASE_URL } from "../config";
import { useHttp } from "../hooks/http.hook";

const FilterSidebar = ({
  isOpen,
  toggleSidebar,
  selectedCategories,
  setSelectedCategories,
  handleCategoriesApplying,
}) => {
  const { request } = useHttp();
  const [categories, setCategories] = useState({
    authors: [],
    genres: [],
    languages: [],
    passTypes: [],
    releaseYears: [],
  });

  useEffect(() => {
    async function fetchCategories() {
      const data = await request(`${BASE_URL}/categories/books`);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleCategoriesChange = (event) => {
    setSelectedCategories({
      ...selectedCategories,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>
      <div className="filter-section">
        <h4>Жанр</h4>
        <select
          value={selectedCategories.genre}
          name="genre"
          onChange={handleCategoriesChange}
        >
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
        <select
          value={selectedCategories.author}
          name="author"
          onChange={handleCategoriesChange}
        >
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
        <select
          value={selectedCategories.releaseYear}
          onChange={handleCategoriesChange}
          name="releaseYear"
        >
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
        <select
          value={selectedCategories.language}
          onChange={handleCategoriesChange}
          name="language"
        >
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
          value={selectedCategories.passType}
          onChange={handleCategoriesChange}
          name="passType"
        >
          <option value="">Все</option>
          {categories.passTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCategoriesApplying}
        className="apply-filters-button"
      >
        Применить фильтры
      </button>
    </div>
  );
};

export default FilterSidebar;
