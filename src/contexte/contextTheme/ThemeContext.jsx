import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../utils/api";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Charger immédiatement depuis localStorage au démarrage
    return localStorage.getItem("theme") || "light";
  });
  const [loading, setLoading] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false); // ⭐ NOUVEAU

  // Appliquer le thème au document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Charger le thème depuis l'API UNE SEULE FOIS
  // useEffect(() => {
  //   if (!apiLoaded) {
  //     loadThemeFromAPI();
  //   }
  // }, [apiLoaded]);

  const loadThemeFromAPI = async () => {
    try {
      const response = await api.get("/api/user-theme");
      if (response.data.success && response.data.theme) {
        setTheme(response.data.theme);
      }
    } catch (error) {
      console.log("ℹ️ API thème non disponible, utilisation localStorage");
    } finally {
      setLoading(false);
      setApiLoaded(true);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Sauvegarder dans la BD via API (en arrière-plan)
    try {
      await api.post("/api/user-theme", { theme: newTheme });
    } catch (error) {
      console.log("ℹ️ Thème sauvegardé localement uniquement");
    }
  };

  const setThemeValue = async (newTheme) => {
    setTheme(newTheme);

    try {
      await api.post("/api/user-theme", { theme: newTheme });
    } catch (error) {
      console.log("ℹ️ Impossible de sauvegarder le thème dans la BD");
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: setThemeValue, loading }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
