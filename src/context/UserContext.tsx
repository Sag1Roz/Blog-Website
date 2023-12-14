import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/user";
import { getUser } from "../services/user";

type UserContextType = {
  user: User | null;
  updateToken: (newToken: string) => void;
  logout: () => void;
};

const UserContext = createContext({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(() => {
    const tokenStorage = localStorage.getItem("Rozi-token");
    if (tokenStorage === null) return "";
    return tokenStorage;
  });
  useEffect(() => {
    if (token === "") return;
    getUser(token).then((data) => {
      if (data !== null) setUser(data);
    });
  }, [token]);

  function updateToken(newToken: string) {
    setToken(newToken);
    localStorage.setItem("Rozi-token", newToken);
    getUser(token).then((res) => {
      if (res !== null) setUser(res);
    });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("Rozi-token");
  }

  <UserContext.Provider value={{ user, updateToken, logout }}>
    {children}
  </UserContext.Provider>;
}
