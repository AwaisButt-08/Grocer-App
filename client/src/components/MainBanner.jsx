import React from 'react'
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full  md:hidden" />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24 px-4">
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'><span className='text-primary-dull'>Freshness You Can Trust, </span>Savings You Will Love!</h1>
      <div className="flex font-medium items-center mt-6">
        <Link to={"/products"} className="flex gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull group items-center rounded-lg transition text-white cursor-pointer">
        Shop Now
        <img src={assets.white_arrow_icon} alt='arrow' className="md:hidden transition group-focus:translate-x-1" />
        </Link>

        <Link to={"/products"} className=" gap-2 md:flex  px-9 py-3 group hidden item-center cursor-pointer">
        Explore Deals
        <img src={assets.black_arrow_icon} alt='arrow' className=" transition group-hover:translate-x-1" />
        </Link>
      </div>
      </div>
    </div>
  )
}

export default MainBanner
