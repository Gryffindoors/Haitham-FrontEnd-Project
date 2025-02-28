import { Link } from "react-router";
import DietImages from "../Constants/DietImages";
import React, { useState, useEffect } from "react";

const DietDescriptions = {
  "Keto Food": "Low-carb, high-fat meals designed to promote ketosis and support weight loss.",
  "Vegan": "Plant-based meals free from animal products, rich in nutrients and fiber.",
  "Atkins": "A low-carb diet focusing on protein and healthy fats for weight management.",
  "Smoothie": "Nutritious blended drinks packed with fruits, vegetables, and protein options.",
  "Healthy sweets": "Guilt-free desserts made with natural sweeteners and wholesome ingredients."
};

export default function CategoryCard({ item, disableLink = false }) {
  // Skeleton Loading State
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Show Skeleton if loading OR if item is missing
  if (showSkeleton || !item) {
    return (
      <div className="text-center p-5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg flex flex-col gap-4 animate-pulse">
        
        {/* Image Skeleton */}
        <div className="p-4 bg-gray-300 dark:bg-gray-700 rounded-xl w-2/5 md:w-1/3 mx-auto"></div>

        {/* Title Skeleton */}
        <div className="w-3/4 h-6 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Description Skeleton */}
        <div className="w-[80%] h-4 bg-gray-300 dark:bg-gray-700 mx-auto rounded"></div>
      </div>
    );
  }

  return (
    <div className="text-center p-5 rounded-xl border border-gray-300 dark:border-gray-600 dark:text-[#F9F9F7] text-gray-900 flex flex-col gap-4 justify-between shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">

      {/* Conditional Wrapper for Image + Title */}
      {disableLink ? (
        <div>
          <div className="p-4 bg-gray-100 dark:bg-[#F9F9F7] rounded-xl w-2/5 md:w-1/3 mx-auto shadow-sm transition-transform hover:scale-105">
            <img src={DietImages[item]} alt={item} className="w-full rounded-lg object-cover aspect-square" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">{item}</h3>
        </div>
      ) : (
        <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/category/${encodeURIComponent(item)}`} className="hover:underline">
          <div className="p-4 bg-gray-100 dark:bg-[#F9F9F7] rounded-xl w-2/5 md:w-1/3 mx-auto shadow-sm transition-transform hover:scale-105">
            <img src={DietImages[item]} alt={item} className="w-full rounded-lg object-cover aspect-square" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">{item}</h3>
        </Link>
      )}

      {/* Category Description */}
      <p className="text-sm text-gray-800 dark:text-gray-300">
        {DietDescriptions[item]}
      </p>

    </div>
  );
}
