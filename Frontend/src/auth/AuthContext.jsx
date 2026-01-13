import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 LOGIN
  const login = async (username, password) => {
    const res = await api.post("/accounts/login/", {
      username,
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    await fetchUser(); // load user after login
  };

  // 👤 FETCH CURRENT USER
  const fetchUser = async () => {
    try {
      const res = await api.get("/accounts/me/");
      setUser(res.data);
    } catch (err) {
      console.error("Auth error", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
