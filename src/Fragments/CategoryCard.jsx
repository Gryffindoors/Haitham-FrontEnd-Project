import { Link } from 'react-router'; 
import DietImages from '../Constants/DietImages';
import React from 'react';

const DietDescriptions = {
    "Keto Food": "Low-carb, high-fat meals designed to promote ketosis and support weight loss.",
    "Vegan": "Plant-based meals free from animal products, rich in nutrients and fiber.",
    "Atkins": "A low-carb diet focusing on protein and healthy fats for weight management.",
    "Smoothie": "Nutritious blended drinks packed with fruits, vegetables, and protein options.",
    "Healthy sweets": "Guilt-free desserts made with natural sweeteners and wholesome ingredients."
};

export default function CategoryCard({ item, disableLink = false }) {
    return (
        <div className='text-center p-3 rounded-2xl border-2 border-gray-900 dark:border-[#F9F9F7] dark:text-[#F9F9F7] text-gray-900 flex flex-col gap-3 justify-between content-center'>
            {/* Wrap image + title in Link conditionally */}
            {disableLink ? (
                // Disabled link: render as plain div
                <div>
                    <div className='p-3 bg-gray-200 rounded-full w-1/4 mx-auto'>
                        <img src={DietImages[item]} alt={item} className="w-full rounded-2xl h-fit aspect-square" />
                    </div>
                    <h3 className='text-2xl'>{item}</h3>
                </div>
            ) : (
                // Enabled link: wrap in Link component
                <Link to={`/category/${encodeURIComponent(item)}`} className="hover:underline">
                    <div className='p-3 bg-gray-200 rounded-full w-1/4 mx-auto'>
                        <img src={DietImages[item]} alt={item} className="w-full rounded-2xl h-fit aspect-square" />
                    </div>
                    <h3 className='text-2xl'>{item}</h3>
                </Link>
            )}
            <p>{DietDescriptions[item]}</p>
        </div>
    );
}