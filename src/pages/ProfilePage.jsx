import React, { useState } from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        phone: '123-456-7890',
        description: 'Book lover and avid reader.',
        avatar: 'https://via.placeholder.com/150',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [offers, setOffers] = useState([
        {
            title: 'Book 1',
            image: 'https://via.placeholder.com/150',
            rating: 4,
            description: 'Description of book 1',
        },
        {
            title: 'Book 2',
            image: 'https://via.placeholder.com/150',
            rating: 5,
            description: 'Description of book 2',
        },
    ]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUser({ ...user, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={user.avatar} alt="Avatar" />
                    {isEditing && <input type="file" onChange={handleAvatarChange} />}
                </div>
                <div className="profile-details">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleInputChange}
                            />
                            <textarea
                                name="description"
                                value={user.description}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleEditToggle}>Save</button>
                        </>
                    ) : (
                        <>
                            <h3>{user.name}</h3>
                            <p>{user.phone}</p>
                            <p>{user.description}</p>
                            <button onClick={handleEditToggle}>Edit Profile</button>
                        </>
                    )}
                </div>
            </div>
            <div className="profile-offers">
                <h3>My Offers</h3>
                <div className="offers-list">
                    {offers.map((offer, index) => (
                        <div key={index} className="offer-card">
                            <img src={offer.image} alt={offer.title} />
                            <div className="offer-details">
                                <h4>{offer.title}</h4>
                                <p>Rating: {offer.rating}/5</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default ProfilePage;