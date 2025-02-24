import CategoryLists from '../Fragments/CategoryCard'
import React, { useContext } from 'react'
import { ProductContext } from '../APIContext/ProductContext';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';




export default function Products() {
  const { categories, productsByCategory, allProducts, loading, error } = useContext(ProductContext);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;



  return <>

    
    

  </>
}
