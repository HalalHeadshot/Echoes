import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  // Optional: persist in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setDark(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    if(dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
