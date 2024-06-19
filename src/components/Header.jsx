import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ onAddBookClick }) => {
    return (
        <header className="header">
            <Link to="/" className="header-logo">BookHaven</Link>
            <div className="header-links">
                <Link to="/profile" className="header-link">Profile</Link>
                <button className="add-book-button" onClick={onAddBookClick}>Add Book</button>
            </div>
        </header>
    );
};

export default Header;
