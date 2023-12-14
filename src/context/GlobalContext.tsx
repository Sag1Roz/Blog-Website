import { ReactNode, createContext, useContext, useState } from "react";

type GlobalContextType = {
  isDarkMode: boolean;
  isMenuOpen: boolean;
  toggleDarkMode: () => void;
  toggleMenuOpen: () => void;
};

const GlobalContext = createContext({} as GlobalContextType);

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storageValue = localStorage.getItem("rozi-mode");
    document.body.classList.toggle("dark", storageValue === "dark");
    return storageValue === "dark";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleDarkMode() {
    setIsDarkMode((preValue) => {
      const newValue = !preValue;
      document.body.classList.toggle("dark", newValue);
      localStorage.setItem("rozi-mode", newValue ? "dark" : "light");
      return !preValue;
    });
  }

  function toggleMenuOpen() {
    setIsMenuOpen((preValue) => !preValue);
  }

  return (
    <GlobalContext.Provider
      value={{ isDarkMode, toggleDarkMode, toggleMenuOpen, isMenuOpen }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
