import { createContext, useState, useEffect } from "react";
import {
  loginUser,
  logoutUser,
  signupUser,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (data) => {
    const response = await loginUser(data);
    setUser(response.user);
    return response;
  };

  //Signup Function
  const signup = async (data) => {
    const response = await signupUser(data);
    setUser(response.user);
    return response;
  };

  // Logout function
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
