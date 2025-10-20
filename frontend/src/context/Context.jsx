import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  })

  return (
    <Context.Provider
      value={{
        isLoggedIn, setIsLoggedIn,
        user, setUser
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

