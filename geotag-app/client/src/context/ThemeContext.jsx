import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage (or system preference)
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") return true;
    if (stored === "false") return false;
    // fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Sync class and localStorage whenever `dark` changes
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
