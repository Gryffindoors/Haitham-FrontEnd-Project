import { Link } from 'react-router'
import images from '../Constants/Images'
import React, { useContext } from 'react'
import { ProductContext } from '../APIContext/ProductContext';
import CategoryLists from '../Fragments/CategoryCard'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function Home() {
  const { categories, productsByCategory, allProducts, loading, error } = useContext(ProductContext);
  
    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error: {error}</p>;
  
  return <>
    <section className='bg-white/50 dark:bg-black/50 dark:text-[#F9F9F7] text-black relative overflow-hidden'>
      <img src={images.bottomEmptyLs} alt="Background Image" className="hidden md:block absolute -z-10 w-full opacity-70 dark:opacity-90 -top-1/2" />
      <img src={images.bottomEmptyPt} alt="Background Image" className="block md:hidden absolute -z-10 w-full opacity-70 dark:opacity-90 -top-1/2" />
      <div className="p-20">

        <h1 className='text-center text-xl md:text-4xl font-extrabold my-7'>Tastiest food for you health</h1>
        <h2 className='text-center text-xl md:text-3xl font-bold my-7'>Only the best for you</h2>
        <p className='text-center font-bold w-full md:w-1/4 mx-auto'>Discover your palate, Healthy food no longer equals unappetizine</p>
        <div className="flex flex-row w-full md:w-1/2 p-3 mx-auto gap-5 items-center justify-around">
          <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to="/favourites"><button className='border-2 border-gray-900 dark:border-[#F9F9F7] bg-red-600 text-[#F9F9F7] dark:bg-[#F9F9F7] dark:text-red-600 rounded-full p-5 cursor-pointer hover:scale-[1.05] duration-1000 text-sm'>Order your meal </button></Link>
          <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to="/products"><button className='border-2 border-gray-900 dark:border-[#F9F9F7] dark:bg-red-600 dark:text-[#F9F9F7] bg-[#F9F9F7] text-red-600 rounded-full p-5 cursor-pointer hover:scale-[1.05] duration-1000 text-sm'>Explore the menu</button></Link>
        </div>
      </div>

    </section>
    <section className='bg-white/50 dark:bg-black/50 dark:text-[#F9F9F7] text-black overflow-hidden'>
      <h2 className='text-center text-xl md:text-3xl font-bold my-7 capitalize'>Browse your favourite category</h2>
      <div className='bg-white/50 dark:bg-black/50 dark:text-[#F9F9F7] text-black relative overflow-hidden p-10'>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          // slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          effect="smooth"
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },  // 1 slide on small screens
            460: { slidesPerView: 2 },  // 2 slides on medium screens
            1024: { slidesPerView: 3 }  // 3 slides on large screens (max 3)
          }}


        >

          {categories.map((category, index) =>

            <SwiperSlide> <CategoryLists key={index} item={category} /></SwiperSlide>

          )}
          ...
        </Swiper>

      </div>
    </section>

  </>
}
