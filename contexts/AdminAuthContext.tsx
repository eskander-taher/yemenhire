"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { adminAxios } from "@/lib/admin-api";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const AUTH_KEY = "admin-authenticated";
const TOKEN_KEY = "admin-token";

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(AUTH_KEY) === "true");
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await adminAxios.post("/auth/login", { username, password });
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(TOKEN_KEY, res.data.token);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      toast.error("Invalid username or password");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}



