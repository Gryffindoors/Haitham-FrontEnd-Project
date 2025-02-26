import React,  { useContext } from "react";
import { ProductContext } from "../APIContext/ProductContext";
import ProductCard from "../Fragments/ProductCard";
import images from "../Constants/Images";

export default function Products() {
  const { allProducts } = useContext(ProductContext); // Correct context usage

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white/50 dark:bg-black/50 dark:text-[#F9F9F7] text-black relative overflow-hidden py-10">
      <img src={images.sidesEmptyLs} alt="Love Healthy Food" className="absolute -z-10 w-full opacity-50 translate-y-[5%]
" />
      {allProducts.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </div>
  );
}
