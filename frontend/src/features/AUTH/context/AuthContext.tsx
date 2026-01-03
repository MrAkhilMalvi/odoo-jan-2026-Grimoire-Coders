import React, { createContext, useContext, useState } from "react";
import { User } from "@/shared/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  loginSuccess: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginSuccess = (user: User) => {
    setUserState(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserState(null);
    setIsAuthenticated(false);
  };

  const setUser = (user: User | null) => {
    setUserState(user);
    setIsAuthenticated(!!user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
