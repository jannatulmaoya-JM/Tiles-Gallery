'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/shared/Banner';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrakingNews from '@/components/shared/BrakingNews';
import Loader from '@/components/shared/Loader'; 

async function getFeaturedTiles() {
  try {
    // https://tiles-gallery-kappa.vercel.app
    const res = await fetch('https://tiles-gallery-kappa.vercel.app/api/tiles', { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true); 
        const data = await getFeaturedTiles();
        setFeaturedTiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, featuredTiles.length - 4);
      return prevIndex >= maxIndex ? maxIndex : prevIndex + 1;
    });
  };

  const handleToast = (title) => {
    toast.info(`Redirecting to details of ${title}...`, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });
  };

  if (isLoading) {
    return <Loader />;
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 pb-12">
      <ToastContainer />
      <Banner />
      <BrakingNews />

      <section className="my-8 md:my-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
            Featured Collections
          </h2>
          <Link 
            href="/all-tiles" 
            className="btn btn-outline btn-xs sm:btn-sm md:btn-md border-teal-500 hover:bg-teal-500 hover:border-teal-500"
          >
            View All Tiles
          </Link>
        </div>

        {featuredTiles.length > 0 ? (
          <div className="flex items-center gap-1 sm:gap-2">
            
            <FiChevronLeft
              onClick={handlePrev}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer select-none transition-all duration-300 text-teal-600 hover:text-teal-400 active:scale-95 flex-shrink-0 ${
                currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
              }`}
            />

            <div className="overflow-hidden flex-1">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
              >
                {featuredTiles.map((tile) => (
                  <div key={tile.id} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 p-2 sm:p-3">
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200 flex flex-col justify-between h-full select-none">
                      <figure className="px-3 pt-3 sm:px-4 sm:pt-4">
                        <img 
                          src={tile.image} 
                          alt={tile.title} 
                          className="rounded-xl h-40 sm:h-48 w-full object-cover select-none"
                        />
                      </figure>
                      <div className="card-body p-4 sm:p-5">
                        <div className="flex justify-between items-start gap-2">
                          <h2 className="card-title text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                            {tile.title}
                          </h2>
                          <span className="badge badge-xs sm:badge-sm badge-outline text-teal-600 border-teal-500 font-semibold flex-shrink-0">
                            {tile.category}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 h-8 sm:h-10">
                          {tile.description}
                        </p>
                        <div className="card-actions justify-between items-center mt-3 sm:mt-4">
                          <span className="font-extrabold text-base sm:text-lg text-teal-600">
                            ${tile.price.toFixed(2)}
                          </span>

                          <Link 
                            href={`/tiles/${tile.id}`} 
                            onClick={() => handleToast(tile.title)}
                            className="btn btn-primary btn-xs sm:btn-sm text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:opacity-90"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <FiChevronRight
              onClick={handleNext}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer select-none transition-all duration-300 text-teal-600 hover:text-teal-400 active:scale-95 flex-shrink-0 ${
                currentIndex >= Math.max(0, featuredTiles.length - 4)
                  ? 'opacity-20 cursor-not-allowed'
                  : 'opacity-100'
              }`}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No tiles available.
          </div>
        )}
      </section>
    </div>
  );
};