import { useParams } from 'react-router';
import React, { useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ProductContext } from '../APIContext/ProductContext';
import CategoryCard from '../Fragments/CategoryCard';
import ProductCard from '../Fragments/ProductCard';

export default function Category() {
  const { categories = [], productsByCategory = {}, loading, error } = useContext(ProductContext);
  const { categoryName } = useParams();

  

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get products for the selected category
  const products = productsByCategory[categoryName] || [];

  // Find remaining categories (excluding the selected one)
  const remainingCategories = categories.filter(cat => cat !== categoryName);


  return (
    <div className="bg-white dark:bg-gray-800 dark:text-[#F9F9F7] text-black relative overflow-hidden py-5">
      
      {/* Selected Category Card */}
      <div className='w-1/4 mx-auto my-3'>
        {/* Disable link for the selected category */}
        <CategoryCard item={categoryName} disableLink={true} />
      </div>

      {/* Products Swiper */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-4 text-center">{categoryName}</h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            460: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <SwiperSlide className='mx-auto' key={product.product_code}>
                <ProductCard item={product} />
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </Swiper>
      </div>

      {/* Remaining Categories Section */}
      {remainingCategories.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Other Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {remainingCategories.map((cat) => (
              <CategoryCard key={cat} item={cat} disableLink={false} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}