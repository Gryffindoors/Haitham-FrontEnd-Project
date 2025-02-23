import React from 'react'

import images from "../Constants/Images";
import ListLinks, { SocialLinks } from '../Fragments/ListLinks';
import { navigation, otherPages, socialMedia } from '../Constants/PagesLinks';


export default function Footer() {
  return (
    <div className='bg-gray-800 dark:bg-[#F9F9F7] text-[#F9F9F7] dark:text-gray-800'>

      <div className="flex  py-5">
        <div className="flex flex-col md:flex-row gap-5 px-3">
          {/* Company Info */}
          <div className="flex flex-col gap-3 mx-auto w-[30%]">
            <h4 className="company-name flex md:text-3xl text-sm items-center">
              <img loading="lazy" src={images.CoLogo} alt="company logo" className="h-16 w-auto me-3" />Fork & Leaf
            </h4>
            <p className="italic text-sm">
              Leaf & Fork is your go-to destination for fresh, wholesome, and deliciously healthy food. We believe in nourishing the body with natural ingredients, sustainable choices, and flavors that inspire. Eat well, live well, and enjoy every bite!
            </p>
            <div className="flex flex-col my-3 w-2/3 mx-auto md:flex-row gap-4 px-3">
              {socialMedia.map((item) => (
                <SocialLinks key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* Pages List */}
          <div className="flex flex-col gap-3 mx-auto w-[15%]">
            <h4 className="flex font-bold text-xl items-center">Pages</h4>
            <ul className="list-none flex flex-col gap-3">
              {navigation.map((item) => (
                <ListLinks key={item.name} item={item} />
              ))}
            </ul>
          </div>

          {/* Utilities List */}
          <div className="flex flex-col gap-3 mx-auto w-[15%]">
            <h4 className="flex font-bold text-xl items-center">Utilities</h4>
            <ul className="list-none flex flex-col gap-3">
              {otherPages.map((item) => (
                <ListLinks key={item.name} item={item} />
              ))}
            </ul>
          </div>

          {/* Image Grid */}
          <div className="flex flex-col gap-2 mx-auto w-[30%]">
            <h4 className="flex font-bold text-xl items-center">Follow us on Instagram</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#">
                <img loading="lazy" src={images.meal1sq} alt="Meal1" className="w-1/2 border-amber-300 border-2 rounded-3xl hover:scale-[1.01] duration-300 ease-in-out" />
              </a>
              <a href="#">
                <img loading="lazy" src={images.meal2sq} alt="Meal2" className="w-1/2 border-amber-300 border-2 rounded-3xl hover:scale-[1.01] duration-300 ease-in-out" />
              </a>
              <a href="#">
                <img loading="lazy" src={images.meal3sq} alt="Meal3" className="w-1/2 border-amber-300 border-2 rounded-3xl hover:scale-[1.01] duration-300 ease-in-out" />
              </a>
              <a href="#">
                <img loading="lazy" src={images.meal4sq} alt="Meal4" className="w-1/2 border-amber-300 border-2 rounded-3xl hover:scale-[1.01] duration-300 ease-in-out" />
              </a>
            </div>
          </div>
        </div>
      </div>
        <p className='text-xs text-center text-[#F9F9F7] dark:text-gray-800 py-5'><span className='text-sm text-red-500'>&copy;</span> Copyrights Reserved 2025, Haitham Elfowaty - Aspiring Full-Stack Developer</p>
    </div>

  )
}
