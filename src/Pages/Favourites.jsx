import React, { useContext } from "react";
import { FavouritesContext } from "../Context/FavouritesContext";
import ProductCard from "../Fragments/ProductCard";
import images from "../Constants/Images";

export default function Favourites() {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="relative overflow-hidden py-10 bg-white/50 dark:bg-gray-900/80 dark:text-[#F9F9F7] text-black">

      {/* Background Overlay for Better Contrast */}
      <div className="absolute inset-0 -z-10 bg-black/10 dark:bg-black/40"></div>

      {/* Decorative Background Image */}
      <img
        src={images.sidesEmptyLs}
        alt="Love Healthy Food"
        className="absolute -z-10 w-full max-w-6xl opacity-40 dark:opacity-80 left-1/2 -translate-x-1/2 translate-y-8"
      />

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8">
        My Favourite Items
      </h2>

      {/* Favourites Section */}
      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-6 md:p-10 max-w-[95%] mx-auto">
          {favourites.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      ) : (
        // No Favourites Found Message
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
          <img 
            src={images.emptyFavorites} 
            alt="No Favourites Found" 
            className="w-40 h-40 opacity-60 mb-4"
          />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            No favourites found. Start adding items you love! ❤️
          </p>
        </div>
      )}

    </div>
  );
}
