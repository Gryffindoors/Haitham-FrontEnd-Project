// @ts-nocheck
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import authentication context

// Create Cart Context
export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  isInCart: (_productId) => false,
  toggleCart: (product) => {},
  updateQuantity: () => {},
});

// Cart Provider
export function CartContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Load cart from local storage when component mounts
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      setCart([]);
    }
  }, []);

  // Save cart to local storage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  // Clear cart when the user logs out
  useEffect(() => {
    if (!user) {
      setCart([]); // Clear cart on logout
      localStorage.removeItem("cart");
    }
  }, [user]);

  // Check if a product is already in the cart
  const isInCart = (productId) => cart.some((p) => p.product_code === productId);

  // Function to toggle cart status
  const toggleCart = (product) => {
    if (!user) {
      alert("You need to log in first!");
      return;
    }

    if (isInCart(product.product_code)) {
      removeFromCart(product.product_code);
    } else {
      addToCart(product);
    }
  };

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((p) => p.product_code === product.product_code);

      if (existingProduct) {
        return prev; // Product already exists, do nothing
      }

      return [...prev, { ...product, quantity: 1 }]; // ✅ Ensure new products start with quantity 1
    });
  };

  // Function to update quantity
  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_code === productId
          ? { ...item, quantity: Math.max(1, (item.quantity ?? 1) + change) } // Prevent quantity < 1
          : item
      )
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((p) => p.product_code !== productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, toggleCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
