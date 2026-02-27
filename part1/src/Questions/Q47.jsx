import React, { createContext, useContext, useState } from "react";

//Create Context
const ThemeContext = createContext();

//Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

//Custom Hook (Cleaner usage)
function useTheme() {
  return useContext(ThemeContext);
}

//Component Using Theme
function ThemedBox() {
  const { theme } = useTheme();

  const styles = {
    padding: "40px",
    marginTop: "20px",
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    transition: "0.3s"
  };

  return <div style={styles}>Current Theme: {theme}</div>;
}

//ThemeApp
export default function ThemeApp() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

function Main() {
  const { toggleTheme } = useTheme();

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ThemedBox />
    </div>
  );
}