import { createContext, useState, useEffect } from "react";
import api from "../src/pages/Api";

export const AuthContext = createContext(); // ✅ THIS WAS MISSING

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count , setCount] = useState(0);

  

  const fetchUser = async () => {
  try {
    const res = await api.get(
      "https://fan-platform-backend.onrender.com/user/me",
      {
        withCredentials: true,
      }
    );

    setUser(res.data);

  } catch (err) {

    setUser(null);

  } finally {

    setLoading(false);

  }
};




  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
    }
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        fetchUser,
        setLoading,
        setCount,
        count,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};