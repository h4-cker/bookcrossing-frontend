import '../styles/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo_container">
                <img src="public/logo.png" className="logo_img"></img>
                <h3 className="logo_text">BookHaven</h3>
            </div>
            <div className="search_container">
                <div className="search_box">
                    <label htmlFor="search-input" className="visually-hidden">
                    </label>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search books"
                        className="search-input"
                    />
                    <img
                        loading="lazy"
                        src="public/search.png"
                        alt="Search icon"
                        className="search-icon"
                    />
                </div>
            </div>
            <button className="join_button">Join now</button>
            <div className={"user_field"}>
                <button className={"user_profile_button"}>
                    <img src="public/profile.png" className="profile_img"/>
                </button>
                <h3>User</h3>
                <button className={"logout_buttom"}></button>
            </div>
        </header>
    );
};

export default Header;