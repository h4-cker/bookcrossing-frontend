import React, { useState } from 'react';
import '../styles/FilterSidebar.css';

const genres = ['Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Biography'];
const authors = ['Author 1', 'Author 2', 'Author 3'];
const years = ['2022', '2021', '2020'];
const languages = ['English', 'Russian', 'Spanish'];
const exchangeTypes = ['Direct Exchange', 'Exchange for Points'];

const FilterSidebar = ({ onFilterChange, isOpen, toggleSidebar }) => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedExchangeType, setSelectedExchangeType] = useState('');

    const handleGenreChange = (event) => setSelectedGenre(event.target.value);
    const handleAuthorChange = (event) => setSelectedAuthor(event.target.value);
    const handleYearChange = (event) => setSelectedYear(event.target.value);
    const handleLanguageChange = (event) => setSelectedLanguage(event.target.value);
    const handleExchangeTypeChange = (event) => setSelectedExchangeType(event.target.value);

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
        <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? 'Close Filters' : 'Open Filters'}
            </button>
            <div className="filter-section">
                <h4>Genres</h4>
                <select value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">All</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-section">
                <h4>Authors</h4>
                <select value={selectedAuthor} onChange={handleAuthorChange}>
                    <option value="">All</option>
                    {authors.map((author) => (
                        <option key={author} value={author}>
                            {author}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-section">
                <h4>Year</h4>
                <select value={selectedYear} onChange={handleYearChange}>
                    <option value="">All</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-section">
                <h4>Language</h4>
                <select value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="">All</option>
                    {languages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-section">
                <h4>Exchange Type</h4>
                <select value={selectedExchangeType} onChange={handleExchangeTypeChange}>
                    <option value="">All</option>
                    {exchangeTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={applyFilters} className="apply-filters-button">Apply Filters</button>
        </div>
    );
};

export default FilterSidebar;
