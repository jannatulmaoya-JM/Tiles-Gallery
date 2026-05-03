'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/shared/Loader';
import { FiSearch } from 'react-icons/fi'; 

async function getAllTiles() {
  try {
    const res = await fetch('https://tiles-gallery-kappa.vercel.app/api/tiles', { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getAllTiles();
        setTiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleToast = (title) => {
    toast.info(`Redirecting to details of ${title}...`, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });
  };

  const filteredTiles = tiles.filter((tile) =>
    tile.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <ToastContainer />
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="hidden md:block md:w-32"></div> 
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
            All Tiles
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Browse our complete tile collection</p>
        </div>

        <Link 
          href="/" 
          className="btn btn-outline btn-sm md:btn-sm border-teal-500 hover:bg-teal-500 hover:border-teal-500 sm:w-auto md:w-auto"
        >
          Back to Home
        </Link>
      </div>

      <div className="flex justify-center mb-8 md:mb-12">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search tiles by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-12 pr-4 h-11 md:h-12 border-teal-500/40 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl text-sm md:text-base transition-all"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl" />
        </div>
      </div>

      {filteredTiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">No tiles found.</p>
        </div>
      ) : (
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredTiles.map((tile) => (
            <div 
              key={tile.id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 flex flex-col justify-between h-full select-none"
            >
              <figure className="px-3 pt-3 md:px-4 md:pt-4">
                <img 
                  src={tile.image} 
                  alt={tile.title} 
                  className="rounded-xl h-40 sm:h-44 md:h-48 w-full object-cover" 
                />
              </figure>
              <div className="card-body p-4 md:p-5">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="card-title text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-white leading-tight">
                    {tile.title}
                  </h2>
                  <span className="badge badge-xs sm:badge-sm badge-outline text-teal-600 border-teal-500 font-semibold flex-shrink-0">
                    {tile.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 h-9 sm:h-10">
                  {tile.description}
                </p>
                <div className="card-actions justify-between items-center mt-4 pt-2 border-t border-base-200/60">
                  <span className="font-extrabold text-base sm:text-lg text-teal-600">
                    ${tile.price.toFixed(2)}
                  </span>
                  
                  <Link 
                    href={`/tiles/${tile.id}`} 
                    onClick={() => handleToast(tile.title)}
                    className="btn btn-primary btn-sm text-xs sm:text-sm text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:opacity-90 px-3 sm:px-4 h-8 sm:h-9"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}