import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Context } from "./context.js";

const ContextProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Persistent login
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/home/verify`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Persistent login verify error:", err);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [apiUrl]);

  // ✅ Logout
  const logoutUser = async () => {
    try {
      const res = await fetch(`${apiUrl}/home/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
      } else {
        toast.error("Logout failed!");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("An error occurred during logout");
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        logoutUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
