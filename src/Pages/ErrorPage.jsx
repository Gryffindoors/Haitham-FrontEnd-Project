import { Link } from "react-router"; 

import React from "react";
import images from "../Constants/Images";

export default function ErrorPage() {
    return (
        <div className="flex flex-col overflow-hidden bg-gray-800/80 text-gray-100 relative">
            <img loading="lazy" src={images.full2Ls} alt="" className="absolute -z-10 opacity-50 -top-32 object-contain"/>

            {/* Error message (auto height adjustment) */}
            <div className="flex-grow flex flex-col items-center justify-center text-center -z-0 py-28">
                <h1 className="text-[#F9F9F7] text-4xl font-bold">404 - Page Not Found</h1>
                <p className="text-[#F9F9F7] text-lg mt-4">Oops! The page you're looking for doesn't exist.</p>
                <Link
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to="/"
                    className="mt-6 px-6 py-2 bg-gray-900 text-[#F9F9F7] rounded-md hover:bg-gray-700 transition duration-200 shadow-md"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
