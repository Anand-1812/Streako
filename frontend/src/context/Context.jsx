import toast from "react-hot-toast";
import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {

  // url from .env
  const apiUrl = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Persistent login
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
          toast.success("logged out sucssefully")
        } else {
          toast.err("logged failed")
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
  }, []);

  // logout user
  const logoutUser = async () => {
    try {
      const res = await fetch(`${apiUrl}/home/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        setIsLoggedIn(false);
      } else {
        toast.error("Logout failed!");
      }
    } catch (err) {
      console.error("Logout error:", err);
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
        logoutUser
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

