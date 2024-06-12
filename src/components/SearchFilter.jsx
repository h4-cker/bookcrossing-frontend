import React from 'react';
import '../styles/SearchFilter.css';

const SearchFilter = ({ search, setSearch, genre, setGenre }) => {
    return (
        <div className="search-filter">
            <input
                type="text"
                placeholder="Search for books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
            </select>
        </div>
    );
};

export default SearchFilter;