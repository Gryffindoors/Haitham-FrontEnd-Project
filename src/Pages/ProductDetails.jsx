import React, { useContext } from "react";
import { useParams } from "react-router";
import { ProductContext } from "../APIContext/ProductContext";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryLists from '../Fragments/CategoryCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function ProductDetails() {
  const { id } = useParams();
  const { categories, productsByCategory, allProducts, loading, error } = useContext(ProductContext);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Find the category associated with this product
  const productCategory = Object.keys(productsByCategory).find((category) =>
    productsByCategory[category].some((p) => p.product_code.toString() === id)
  );
  const product = allProducts.find((p) => p.product_code.toString() === id);

  if (!product) {
    return <div className="text-center text-red-500">Product not found.</div>;
  }

  return (
    <div id={"product" + product.product_code} className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-[#F9F9F7] dark:bg-gray-900 dark:text-[#F9F9F7] text-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-6">
        
        {/* Product Image */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl p-4 w-full max-w-md">
          <img
            src={product.image}
            alt={product.product_name}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Product Name */}
        <h2 className="text-3xl md:text-4xl font-bold text-center">{product.product_name}</h2>

        {/* Product Category */}
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Category: <span className="text-gray-900 dark:text-gray-100">{productCategory || "Unknown"}</span>
        </h3>

        {/* Product Nutrition Info */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Health Benefits</h3>
          <p className="text-gray-600 dark:text-gray-200">{product.product_nutrition_info}</p>
        </div>

        {/* Product Ingredients */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Ingredients</h3>
          <p className="text-gray-600 dark:text-gray-200">{product.product_ingredients}</p>
        </div>

        {/* Product Price */}
        <h3 className="text-2xl text-green-700 dark:text-green-400 font-semibold flex items-center gap-2">
          Price:
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        </h3>
      </div>

      {/* Related Products Section */}
      <section className="mt-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 capitalize">
          Discover More Products
        </h2>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            speed={1000}
            effect="smooth"
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },  // 1 slide on small screens
              460: { slidesPerView: 2 },  // 2 slides on medium screens
              1024: { slidesPerView: 3 }  // 3 slides on large screens (max 3)
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.name}>  
                <CategoryLists item={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
