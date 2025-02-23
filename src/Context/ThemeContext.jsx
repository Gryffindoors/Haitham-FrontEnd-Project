import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext("light");

const ThemeProvider = ({ children }) => {
  // Load theme from localStorage or default to 'light'
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  // Apply theme to <html> and store in localStorage when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <
// @ts-ignore
    ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider