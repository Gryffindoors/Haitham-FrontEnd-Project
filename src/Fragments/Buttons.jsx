import React, { useContext } from "react";
import { FavouritesContext } from "../Context/FavouritesContext"; // Import FavouritesContext
import { GiSelfLove } from "react-icons/gi";
import { AuthContext } from "../Context/AuthContext"; // Ensure correct path
import { IoIosCart } from "react-icons/io";
import { CartContext } from "../Context/CartContext";

export default function FavouriteButton({ product }) {
  const { user } = useContext(AuthContext); // Get user for login status
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext); // ✅ Extract context functions

  const isFav = user && isFavourite(product.product_code); // ✅ Only check if user is logged in

  return (
    <button
      onClick={() => toggleFavourite(product)}
      className={`p-3 text-xl absolute top-4 left-4 rounded-full cursor-pointer shadow-md transition
    ${isFav
          ? "text-red-500 dark:text-red-400 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
          : "text-white dark:text-gray-900 bg-gray-900 dark:bg-[#F9F9F7] hover:bg-gray-700 dark:hover:bg-gray-300"}`}    >
      <GiSelfLove />
    </button>

  );
}

export function AddToCartButton({ product }) {
  const { user } = useContext(AuthContext); // Get user for login status
  const { toggleCart, isInCart } = useContext(CartContext); // Extract cart functions

  const inCart = user && isInCart(product.product_code); // Check if in cart only when logged in

  return (
    <button
      onClick={() => toggleCart(product)}
      className={`p-3 text-xl absolute top-4 right-4 rounded-full cursor-pointer shadow-md transition
        ${inCart
          ? "text-green-500 dark:text-green-400 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
          : "text-white dark:text-gray-900 bg-gray-900 dark:bg-[#F9F9F7] hover:bg-gray-700 dark:hover:bg-gray-300"
        }`}
    >
      <IoIosCart />
    </button>
  );
}