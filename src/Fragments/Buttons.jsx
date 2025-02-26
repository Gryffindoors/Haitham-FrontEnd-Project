import React, { useContext } from "react";
import { FavouritesContext } from "../Context/FavouritesContext"; // Import FavouritesContext
import { GiSelfLove } from "react-icons/gi";
import { AuthContext } from "../Context/AuthContext"; // Ensure correct path

export default function FavouriteButton({ product }) {
  const { user } = useContext(AuthContext); // Get user for login status
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext); // ✅ Extract context functions

  const isFav = user && isFavourite(product.product_code); // ✅ Only check if user is logged in

  return (
    <button
      onClick={() => toggleFavourite(product)}
      className={`p-3 text-xl absolute top-5 start-3 rounded-full 
        ${isFav 
          ? "text-red-500 dark:text-red-400 bg-gray-200 dark:bg-gray-800" 
          : "text-[#F9F9F7] dark:text-gray-900 bg-gray-900 dark:bg-[#F9F9F7]"}
      `}
    >
      <GiSelfLove />
    </button>
  );
}

