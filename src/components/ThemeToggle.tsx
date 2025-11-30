import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all flex items-center gap-2"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <span>🌙</span>
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <span>☀️</span>
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
}
