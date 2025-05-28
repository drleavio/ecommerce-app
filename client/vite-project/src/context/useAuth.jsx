import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", `Bearer ${token}`);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Custom setter to update both state and localStorage
  const setTokenState = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setTokenState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
