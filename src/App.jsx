import "./styles/App.css";
import React from "react";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { accessToken, accessTokenExpirationDate, login, logout, userId } =
    useAuth();
  const isAuthenticated = !!accessToken;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        accessTokenExpirationDate,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Toaster />
      {isAuthenticated}
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
