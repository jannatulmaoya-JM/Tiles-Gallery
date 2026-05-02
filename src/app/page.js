'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/shared/Banner';
import Marquee from 'react-fast-marquee';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


async function getFeaturedTiles() {
  try {
    const res = await fetch('http://localhost:3000/api/tiles', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await getFeaturedTiles();
      setFeaturedTiles(data);
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

  return (
    <div className="container mx-auto px-4 pb-12">
      <Banner />
      <Marquee />

      <section className="my-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
            Featured Collections
          </h2>
          <Link 
            href="/all-tiles" 
            className="btn btn-outline btn-sm md:btn-md border-teal-500 hover:bg-teal-500 hover:border-teal-500"
          >
            View All Tiles
          </Link>
        </div>

        {featuredTiles.length > 0 ? (
          <div className="flex items-center gap-2">

            <FiChevronLeft
              onClick={handlePrev}
              className={`w-12 h-12 cursor-pointer select-none transition-all duration-300 text-teal-600 hover:text-teal-400 active:scale-95 flex-shrink-0 ${
                currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
              }`}
            />

            <div className="overflow-hidden flex-1">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
              >
                {featuredTiles.map((tile) => (
                  <div 
                    key={tile.id} 
                    className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 p-3"
                  >
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200 flex flex-col justify-between h-full select-none">
                      <figure className="px-4 pt-4">
                        <img 
                          src={tile.image} 
                          alt={tile.title} 
                          className="rounded-xl h-48 w-full object-cover select-none"
                        />
                      </figure>
                      <div className="card-body p-5">
                        <div className="flex justify-between items-start">
                          <h2 className="card-title text-base md:text-lg font-bold text-gray-800 dark:text-white">
                            {tile.title}
                          </h2>
                          <span className="badge badge-sm badge-outline text-teal-600 border-teal-500 font-semibold">
                            {tile.category}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 h-10">
                          {tile.description}
                        </p>
                        <div className="card-actions justify-between items-center mt-4">
                          <span className="font-extrabold text-lg text-teal-600">
                            ${tile.price.toFixed(2)}
                          </span>
                          <Link 
                            href={`/tile/${tile.id}`} 
                            className="btn btn-primary btn-sm text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:opacity-90"
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
              className={`w-12 h-12 cursor-pointer select-none transition-all duration-300 text-teal-600 hover:text-teal-400 active:scale-95 flex-shrink-0 ${
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
}