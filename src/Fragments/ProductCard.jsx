// @ts-nocheck
import { Link } from 'react-router';
import React from 'react';
import { IoIosCart } from "react-icons/io";
import { GiSelfLove } from "react-icons/gi";
import FavouriteButton from './Buttons';


export default function ProductCard({ item }) {
  return (
    <div className='relative text-center p-3 rounded-2xl border-2 border-gray-900 dark:border-[#F9F9F7] dark:text-[#F9F9F7] text-gray-900 flex flex-col gap-3 justify-between content-center'>
      <FavouriteButton product={item} />
      <button className='p-3 text-xl absolute top-5 end-3 rounded-full text-[#F9F9F7] dark:text-gray-900 bg-gray-900 dark:bg-[#F9F9F7]'>
        <IoIosCart />
      </button>
      {/* Product Image */}
      <div className='p-3 bg-gray-200 rounded-full w-1/4 mx-auto'>
        <img src={item.image} alt={item.product_name} className="w-full rounded-full  h-fit aspect-square" />
      </div>

      {/* Clickable Product Name */}
      <h3 className='text-2xl'>
        <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/products/${item.product_code}`} className="hover:underline">
          {item.product_name}
        </Link>
      </h3>

      {/* Product Nutrition Info */}
      <p className="text-sm text-gray-700 dark:text-gray-300">{item.product_nutrition_info.slice(0, 100)}...</p>

      {/* Product Price */}
      <p className="text-lg font-bold text-green-600 dark:text-green-400">${item.price.toFixed(2)}</p>

    </div>
  );
}
