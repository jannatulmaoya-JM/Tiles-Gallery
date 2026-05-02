
import React from 'react'
import Marquee from "react-fast-marquee";

const news = [
  {
    "_id": "1",
    "title": "New Arrivals: Ceramic Blue Glaze"
  },
  {
    "_id": "2",
    "title": "Weekly Feature: Modern Geometric Monochrome"
  },
  {
    "_id": "3",
    "title": "Join the Community and Share Your Design Ideas"
  },
  {
    "_id": "4",
    "title": "Premium Collection: Vintage Victorian Floral"
  }
];

const BrakingNews = () => {
  return (
    <div className='flex justify-between gap-4 items-center py-3 px-4 font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none transition-all container mx-auto rounded-xl shadow-lg my-6 select-none'>
        <button className='btn btn-sm md:btn-md bg-white text-teal-700 border-none hover:bg-white/90 shadow-md font-extrabold px-6 rounded-lg select-none shrink-0 cursor-default'>
          Latest News
        </button>
        
        <Marquee pauseOnHover={true} speed={65} className="cursor-pointer text-white flex items-center">
            {news.map(n => {
              return (
                <span key={n._id} className="mx-6 flex items-center text-sm md:text-base tracking-wide font-semibold">
                  {n.title} 
                  <span className="text-white/60 ml-12 select-none">✦</span>
                </span>
              );
            })}
        </Marquee>
    </div>
  )
}

export default BrakingNews;