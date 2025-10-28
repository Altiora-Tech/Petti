import { Sun, Moon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full hover:bg-petti-light-blue/20 dark:hover:bg-petti-light-blue/10 transition-colors"
    >
      {isDark ? <Sun className="w-5 h-5 text-petti-accent" /> : <Moon className="w-5 h-5 text-petti-slider-dark" />}
    </button>
  );
};

export default ThemeToggle;
