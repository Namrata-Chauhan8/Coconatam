"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { authAPI } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  // login: (email: string, password: string) => Promise<void>;
  // register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // const checkAuth = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const response = await authAPI.getProfile();
  //       if (response?.status === 200) {
  //         setUser(response.data.data.user);
  //       } else if (response?.status === 401) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user");
  //       } else {
  //       }
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const login = async (email: string, password: string) => {
  //   try {
  //     const response = await authAPI.login({ email, password });
  //     if (response?.status === 200) {
  //       const { token, user } = response?.data?.data;

  //       localStorage.setItem("token", token);
  //       localStorage.setItem("user", JSON.stringify(user));
  //       setUser(user);
  //     } else {
  //       alert("Login failed. Please check your credentials.");
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const register = async (name: string, email: string, password: string) => {
  //   try {
  //     const response = await authAPI.register({ name, email, password });
  //     if (response?.status === 201) {
  //       alert("Registration successful! Please log in.");
  //     } else {
  //       alert("Registration failed. Please try again.");
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    // login,
    // register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
