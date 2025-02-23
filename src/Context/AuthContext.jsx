// import React, { createContext, useState, useEffect } from "react";
// import ProfileImg from "../Constants/ProfileImg";

// // Create Context (JavaScript version, without TypeScript annotations)
// export const AuthContext = createContext({
//   user: null,
//   login: () => {},  // No TypeScript type annotations
//   logout: () => {},
// });

// export const AuthProvider = ({ children }) => {
//     const storedUser = JSON.parse(localStorage.getItem("user")) || null;
//     const [user, setUser] = useState(storedUser);
  
//     useEffect(() => {
//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//       } else {
//         localStorage.removeItem("user");
//       }
//     }, [user]);
  
//     const login = (userData) => {
//       setUser(userData); // 🔹 Update state
//       localStorage.setItem("user", JSON.stringify(userData)); // 🔹 Store in localStorage
//     };
  
//     const logout = () => {
//       setUser(null);
//       localStorage.removeItem("user");
//     };
  
//     return (
//       <AuthContext.Provider value={{ user, login, logout }}>
//         {children}
//       </AuthContext.Provider>
//     );
//   };
  
import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for a logged-in user on initial load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData); // Update the user state
    localStorage.setItem("loggedInUser", JSON.stringify(userData)); // Store the logged-in user in localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem("loggedInUser"); // Remove the logged-in user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};