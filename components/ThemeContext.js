"use client";
import { createContext, useContext, useState } from "react";
import { themes } from "./theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("blue");
  const theme = themes[mode];

  function toggleMode() {
    setMode((current) => (current === "blue" ? "white" : "blue"));
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
}
