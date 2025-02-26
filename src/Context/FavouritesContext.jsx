// @ts-nocheck
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import authentication context

// Create Favourites Context
export const FavouritesContext = createContext({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  isFavourite: (_productId) => false,
  toggleFavourite: (product) => {},
});

// Favourites Provider
export function FavouritesContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);

  // Load favourites from local storage when component mounts
  useEffect(() => {
    try {
      const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
      setFavourites(storedFavourites);
    } catch (error) {
      console.error("Error parsing favourites from localStorage:", error);
      setFavourites([]);
    }
  }, []);

  // Save favourites to local storage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }, [favourites, user]); // ✅ Now dependent on user

  // Clear favourites when the user logs out
  useEffect(() => {
    if (!user) {
      setFavourites([]); // ✅ Clear favourites on logout
      localStorage.removeItem("favourites"); // Remove favourites from local storage
    }
  }, [user]); // ✅ Runs when user changes

  // Check if a product is already in favourites
  const isFavourite = (productId) => favourites.some((p) => p.product_code === productId);

  // Function to toggle favourite status
  const toggleFavourite = (product) => {
    if (!user) {
      alert("You need to log in first!");
      return;
    }

    if (isFavourite(product.product_code)) {
      removeFromFavourites(product.product_code);
    } else {
      addToFavourites(product);
    }
  };

  // Function to add a product to favourites
  const addToFavourites = (product) => {
    const updatedFavourites = [...favourites, product];
    setFavourites(updatedFavourites);
  };

  // Function to remove a product from favourites
  const removeFromFavourites = (productId) => {
    const updatedFavourites = favourites.filter((p) => p.product_code !== productId);
    setFavourites(updatedFavourites);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
