// @ts-nocheck
import { Link } from "react-router";
import React, { useState, useEffect, useContext } from "react";
import { IoIosCart } from "react-icons/io";
import FavouriteButton, { AddToCartButton } from "./Buttons";
import { CartContext } from "../Context/CartContext";

export default function ProductCard({ item, showQuantityControls = false }) {
  const { updateQuantity } = useContext(CartContext);

  // Loading state (forces skeleton to appear for at least 800ms)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // If still loading OR `item` is undefined, show skeleton
  if (loading || !item) {
    return (
      <div className="relative text-center p-5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 shadow-lg flex flex-col gap-4 animate-pulse">
        
        {/* Image Skeleton */}
        <div className="w-[70%] h-40 mx-auto rounded-lg bg-gray-300 dark:bg-gray-700"></div>

        {/* Title Skeleton */}
        <div className="w-3/4 h-6 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Price Skeleton */}
        <div className="w-1/2 h-5 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Quantity Controls Skeleton (only in Cart) */}
        {showQuantityControls && (
          <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 rounded-md p-3 mt-3">
            <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>
            <div className="w-16 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
            <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>
          </div>
        )}
      </div>
    );
  }

  // Render actual product card when loading is complete
  return (
    <div className="relative text-center p-5 rounded-xl border border-gray-300 dark:border-gray-600 dark:text-[#F9F9F7] text-gray-900 flex flex-col gap-4 justify-between shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-gray-800/50">

      {/* Favorite Button */}
      <FavouriteButton product={item} />

      {/* Cart Button (Hover Effect) */}
      <AddToCartButton product={item} />

      {/* Product Image */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl w-[70%] mx-auto shadow-sm">
        <img
          src={item.image}
          alt={item.product_name}
          className="w-full h-auto rounded-lg object-cover aspect-square"
        />
      </div>

      {/* Clickable Product Name */}
      <h3 className="text-lg md:text-xl font-semibold">
        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to={`/products/${item.product_code}`}
          className="hover:underline hover:text-green-600 dark:hover:text-green-400 transition">
          {item.product_name}
        </Link>
      </h3>

      {/* Product Price */}
      <p className="text-lg font-bold text-green-700 dark:text-green-400">
        ${item.price.toFixed(2)}
      </p>

      {/* Show Quantity Controls ONLY in Cart */}
      {showQuantityControls && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-md p-3 mt-3">

          {/* - Button */}
          <button
            onClick={() => updateQuantity(item.product_code, -1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white text-lg"
          >
            −
          </button>

          {/* Quantity & Total Price */}
          <div className="text-center flex flex-col items-center">
            <p className="text-lg font-semibold">
              Quantity: <span className="text-2xl">{item.quantity ?? 1}</span>
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
              Total: <span className="text-2xl text-green-700 dark:text-green-400">
                ${(item.price * (item.quantity ?? 1)).toFixed(2)}
              </span>
            </p>
          </div>

          {/* + Button */}
          <button
            onClick={() => updateQuantity(item.product_code, 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white text-lg"
          >
            +
          </button>

        </div>
      )}

    </div>
  );
}
