import React, { useContext } from "react";
import { ProductContext } from "../APIContext/ProductContext";
import ProductCard from "../Fragments/ProductCard";
import images from "../Constants/Images";

export default function Products() {
  const { allProducts } = useContext(ProductContext);

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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-6 md:p-10 max-w-[95%] mx-auto">
        {allProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
      
    </div>
  );
}
