import { Link } from "react-router";
import images from "../Constants/Images";
import React, { useContext } from "react";
import { ProductContext } from "../APIContext/ProductContext";
import CategoryLists from "../Fragments/CategoryCard";
import ProductCard from "../Fragments/ProductCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function Home() {
  const { categories, allProducts, loading, error } = useContext(ProductContext);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
    
      <div className="bg-white/50 dark:bg-gray-600/50">
        {/* HERO SECTION */}
        <section className="relative bg-white/50 dark:bg-black/50 text-black dark:text-[#F9F9F7] overflow-hidden">
          <img src={images.bottomEmptyLs} alt="Background Image" className="hidden md:block absolute -z-10 w-full opacity-70 dark:opacity-90 -top-1/2" />
          <img src={images.bottomEmptyPt} alt="Background Image" className="block md:hidden absolute -z-10 w-full opacity-70 dark:opacity-90 -top-1/2" />
          <div className="p-20 text-center max-w-4xl mx-auto">
            <h1 className="text-xl md:text-4xl font-extrabold my-5">Tastiest food for your health</h1>
            <h2 className="text-xl md:text-3xl font-semibold my-5">Only the best for you</h2>
            <p className="font-medium w-full md:w-3/4 mx-auto">
              Discover your palate. Healthy food no longer means boring.
            </p>
            <div className="flex justify-center gap-5 mt-7">
              <Link to="/favourites">
                <button className="px-6 py-3 text-sm font-bold uppercase bg-red-600 text-[#F9F9F7] dark:bg-[#F9F9F7] dark:text-red-600 rounded-full hover:scale-105 transition-transform">
                  Order your meal
                </button>
              </Link>
              <Link to="/products">
                <button className="px-6 py-3 text-sm font-bold uppercase bg-[#F9F9F7] text-red-600 dark:bg-red-600 dark:text-[#F9F9F7] rounded-full hover:scale-105 transition-transform">
                  Explore the menu
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US? */}
        <section className="py-16 bg-gray-100 dark:bg-gray-800 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Fresh Ingredients</h3>
              <p className="text-gray-600 dark:text-gray-300">We use only the finest, freshest ingredients.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Expert Chefs</h3>
              <p className="text-gray-600 dark:text-gray-300">Our chefs craft meals with passion and expertise.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Healthy & Delicious</h3>
              <p className="text-gray-600 dark:text-gray-300">Meals that are both nutritious and mouth-watering.</p>
            </div>
          </div>
        </section>


        {/* FEATURED PRODUCTS */}
        <section className="py-16 bg-white dark:bg-black text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {allProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.product_code} item={product} />
            ))}
          </div>
          <Link to="/products">
            <button className="mt-6 px-6 py-3 text-sm font-bold uppercase bg-green-600 text-[#F9F9F7] dark:bg-green-500 dark:text-gray-900 rounded-full hover:scale-105 transition-transform">
              View All Products
            </button>
          </Link>
        </section>

        {/* CATEGORIES BROWSER */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Browse by Category</h2>
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
              1024: { slidesPerView: 3 },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryLists item={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* CUSTOMER TESTIMONIALS */}
        <section className="py-16 bg-white dark:bg-black text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">What Our Customers Say</h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            "Absolutely love the flavors and freshness! My go-to place for healthy meals."
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-400">- Satisfied Customer</p>
        </section>
      </div>
    </>
  );
}
