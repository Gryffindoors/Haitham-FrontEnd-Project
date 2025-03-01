// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import { ProductContext } from "../APIContext/ProductContext";
import { FavouritesContext } from "../Context/FavouritesContext";
import { CartContext } from "../Context/CartContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryLists from "../Fragments/CategoryCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import images from "../Constants/Images";
import FavouriteButton, { AddToCartButton } from "../Fragments/Buttons";

export default function ProductDetails() {
  const { id } = useParams();
  const { categories, productsByCategory, allProducts, loading, error } = useContext(ProductContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);
  const { addToCart, isInCart } = useContext(CartContext);

  // Skeleton Loading State
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // Ensure the skeleton stays for at least 800ms
    const timer = setTimeout(() => setShowSkeleton(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSkeleton) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-6 animate-pulse">
        {/* Skeleton Image */}
        <div className="w-[70%] h-80 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

        {/* Skeleton Title */}
        <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Skeleton Category */}
        <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Skeleton Health Benefits */}
        <div className="w-[80%] h-16 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Skeleton Ingredients */}
        <div className="w-[80%] h-16 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Skeleton Price */}
        <div className="w-32 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Find the category associated with this product
  const productCategory = Object.keys(productsByCategory).find((category) =>
    productsByCategory[category].some((p) => p.product_code.toString() === id)
  );
  const product = allProducts.find((p) => p.product_code.toString() === id);

  if (!product) {
    return (
      <div className="bg-white/50 dark:bg-gray-600/50 relative overflow-hidden">
        <img src={images.rightEmptyPt} alt="Background Image" className="absolute -z-10 h-full opacity-70 dark:opacity-90 -top-1/2" />

        <div className="max-w-[90%] mx-auto px-4 z-10 py-8">
          <div className="bg-[#F9F9F7]/50 dark:bg-gray-900/50 dark:text-[#F9F9F7] text-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-6">

            {/* Product Not Found Message */}
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">Oops! Product Not Found 😢</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              It looks like the product you're searching for doesn't exist or was removed.
            </p>

            {/* Suggested Products Section */}
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Check out these similar products:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
              {allProducts.slice(0, 3).map((suggested) => (
                <Link key={suggested.product_code} to={`/products/${suggested.product_code}`} className="block border rounded-lg p-4 shadow-md hover:shadow-lg transition">
                  <img src={suggested.image} alt={suggested.product_name} className="w-full h-40 object-cover rounded-md" />
                  <h3 className="mt-2 font-semibold text-lg text-center">{suggested.product_name}</h3>
                </Link>
              ))}
            </div>

            {/* Browse Products Button */}
            <Link to="/products" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md">
              Browse More Products
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white/50 dark:bg-gray-600/50 relative overflow-hidden">
      <img src={images.rightEmptyPt} alt="Background Image" className="absolute -z-10 h-full opacity-70 dark:opacity-90 -top-1/2" />

      <div id={"product" + product.product_code} className="max-w-[90%] mx-auto px-4 z-10 py-8">
        <div className="bg-[#F9F9F7]/50 dark:bg-gray-900/50 dark:text-[#F9F9F7] text-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-6 relative">

          {/* Favorite & Cart Buttons */}
          <div className="absolute top-6 right-16 flex flex-col gap-3">
            {/* Favourite Button */}
            <FavouriteButton product={product} />

            {/* Add to Cart Button */}
            <AddToCartButton product={product} />
          </div>


          {/* Product Image */}
          <div className="bg-gray-200/50 dark:bg-gray-800/50 rounded-xl p-4 w-full max-w-md">
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
          <div className="w-full bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Health Benefits</h3>
            <p className="text-gray-600 dark:text-gray-200">{product.product_nutrition_info}</p>
          </div>

          {/* Product Ingredients */}
          <div className="w-full bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
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
    </div>
  );
}
