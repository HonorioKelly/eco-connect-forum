
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState, User } from "@/types";
import { toast } from "@/components/ui/sonner";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data (in a real app this would come from an API/database)
const mockUsers: User[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@example.com",
    avatar: "/placeholder.svg",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao@example.com",
    avatar: "/placeholder.svg",
    role: "user",
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ecoUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // In a real app, this would be an API request
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (user && password === "password") { // Simple password check for demo
          setAuthState({ user, isAuthenticated: true, isLoading: false });
          localStorage.setItem("ecoUser", JSON.stringify(user));
          toast.success("Login bem-sucedido!");
          resolve();
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          toast.error("Credenciais inválidas.");
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // In a real app, this would be an API request to create a new user
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (existingUser) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          toast.error("Email já está em uso.");
          reject(new Error("Email already in use"));
        } else {
          // Create new user with mock data
          const newUser: User = {
            id: `${mockUsers.length + 1}`,
            name,
            email,
            avatar: "/placeholder.svg",
            role: "user",
            createdAt: new Date().toISOString(),
          };
          
          // In a real app we would save this to the database
          mockUsers.push(newUser);
          
          setAuthState({ user: newUser, isAuthenticated: true, isLoading: false });
          localStorage.setItem("ecoUser", JSON.stringify(newUser));
          toast.success("Registro bem-sucedido!");
          resolve();
        }
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem("ecoUser");
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    toast.info("Você saiu da sua conta.");
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
