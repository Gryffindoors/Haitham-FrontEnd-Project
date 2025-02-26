// @ts-nocheck
import { Link } from 'react-router'; // Fixed incorrect import
import React from 'react';
import { IoIosCart } from "react-icons/io";
import FavouriteButton from './Buttons';

export default function ProductCard({ item }) {
  return (
    <div className="relative text-center p-5 rounded-xl border border-gray-300 dark:border-gray-600 dark:text-[#F9F9F7] text-gray-900 flex flex-col gap-4 justify-between shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-gray-800/50">
      
      {/* Favorite Button */}
      <FavouriteButton product={item} />

      {/* Cart Button (Hover Effect) */}
      <button className="p-3 text-xl absolute top-4 right-4 cursor-pointer rounded-full text-white dark:text-gray-900 bg-gray-900 dark:bg-[#F9F9F7] shadow-md hover:bg-gray-700 dark:hover:bg-gray-300 transition">
        <IoIosCart />
      </button>

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

      {/* Product Nutrition Info (Truncated) */}
      <p className="text-sm text-gray-800 dark:text-gray-200">
        {item.product_nutrition_info.length > 100
          ? `${item.product_nutrition_info.slice(0, 100)}... `
          : item.product_nutrition_info
        }
        {item.product_nutrition_info.length > 100 && (
          <Link to={`/products/${item.product_code}`} className="text-green-600 dark:text-green-400 hover:underline">Read more</Link>
        )}
      </p>

      {/* Product Price */}
      <p className="text-lg font-bold text-green-700 dark:text-green-400">
        ${item.price.toFixed(2)}
      </p>

    </div>
  );
}
