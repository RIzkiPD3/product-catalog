import { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
}

interface RegisteredUser {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (email: string, password: string): boolean => {
    // Get existing users from localStorage
    const usersJson = localStorage.getItem("registeredUsers");
    const users: RegisteredUser[] = usersJson ? JSON.parse(usersJson) : [];

    // Check if user already exists
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      return false; // Registration failed - user exists
    }

    // Add new user
    users.push({ email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    
    return true; // Registration successful
  };

  const login = (email: string, password: string): boolean => {
    // Get registered users from localStorage
    const usersJson = localStorage.getItem("registeredUsers");
    const users: RegisteredUser[] = usersJson ? JSON.parse(usersJson) : [];

    // Find user with matching credentials
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const currentUser = { email: foundUser.email };
      setUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      return true; // Login successful
    }
    
    return false; // Login failed - user not found or wrong password
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus digunakan di dalam AuthProvider");
  return ctx;
}
