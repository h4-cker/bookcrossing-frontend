import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [accessTokenExpirationDate, setAccessTokenExpirationDate] =
    useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((accessToken, accessTokenExpirationDate, id) => {
    setAccessToken(accessToken);
    setAccessTokenExpirationDate(accessTokenExpirationDate);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        accessToken: accessToken,
        accessTokenExpirationDate: accessTokenExpirationDate,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setUserId(null);
    setAccessTokenExpirationDate(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.accessToken && data.accessTokenExpirationDate) {
      login(data.accessToken, data.accessTokenExpirationDate, data.userId);
    }
    setReady(true);
  }, [login]);

  return {
    login,
    logout,
    accessToken,
    accessTokenExpirationDate,
    userId,
    ready,
  };
};
