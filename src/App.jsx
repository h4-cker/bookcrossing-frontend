import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./styles/App.css";
import ProfilePage from "./pages/ProfilePage.jsx";
import ContentPage from "./pages/ContentPage.jsx";

function App() {
    const isAuthenticated = true;
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={ <ContentPage/> }/>
                <Route path="/auth/register" element={ <Register/> }/>
                <Route path="/auth/login" element={ <Login/> }/>
                <Route path="/profile" element={ <ProfilePage/> }/>
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path="/auth/register" element={ <Register/> }/>
            <Route path="/auth/login" element={ <Login/> }/>
        </Routes>
    );
}

export default App;
