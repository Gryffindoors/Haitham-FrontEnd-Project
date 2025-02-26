// @ts-nocheck
import React, { createContext, useState, useEffect } from "react";
import AxiosInstance from "../Axios/AxiosInstance"; // Import existing Axios instance

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user & token from localStorage on page load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const storedToken = localStorage.getItem("token");

    if (loggedInUser && storedToken) {
      setUser({ ...loggedInUser, token: storedToken });
    }
  }, []);

  // ✅ Signup Function (Now sends a request to the API)
  const signup = async ({ username, profileImage }) => {
    try {
        // Construct the signup data with static and dynamic values
        const signupData = {
            email: `${username}@mail.com`,  
            password: "123456789",          
            name: username,                 
            first_name: "Healthy",          
            last_name: "Customer",          
            role: "customer",               
            address: "Egypt",               
            phone: "01001001001",           
            customer_prefrences: profileImage
        };

        const response = await AxiosInstance.post("signup", signupData);
        
        if (response.data.status === "success") {
            // ✅ Auto-login after successful signup
            return await login({ email: signupData.email, password: signupData.password });
        }

        return { success: false, message: "Signup failed" };
    } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Signup failed" };
    }
};


  // ✅ Login Function (Same as before)
  const login = async (credentials) => {
    try {
      const response = await AxiosInstance.post("login", credentials);
      const userData = response.data.data;
      const token = userData.token;

      setUser(userData);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      localStorage.setItem("token", token);

      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  // ✅ Logout Function (Same as before)
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await AxiosInstance.post("logout", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setUser(null);
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("token");

      return { success: true, message: "Logout successful" };
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      return { success: false, message: "Logout failed" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
