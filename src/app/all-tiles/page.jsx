'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/shared/Loader'; // Loader ইম্পোর্ট করা হয়েছে

async function getAllTiles() {
  try {
    const res = await fetch('http://localhost:3000/api/tiles', { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // লোডিং স্টেট True করা আছে

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true); // ডাটা লোড শুরু
        const data = await getAllTiles();
        setTiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // ডাটা লোড শেষ হলে ঘোরানো বন্ধ হবে
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

  // যতক্ষণ isLoading true থাকবে, ততক্ষণ ঘোরার অ্যানিমেশনটি চলবে
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ToastContainer />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">All Tiles</h1>
        <Link href="/" className="btn btn-outline btn-sm md:btn-md border-teal-500 hover:bg-teal-500 hover:border-teal-500">
          Back to Home
        </Link>
      </div>

      {tiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No tiles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile) => (
            <div key={tile.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200 flex flex-col justify-between h-full select-none">
              <figure className="px-4 pt-4">
                <img src={tile.image} alt={tile.title} className="rounded-xl h-48 w-full object-cover" />
              </figure>
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-base md:text-lg font-bold text-gray-800 dark:text-white">{tile.title}</h2>
                  <span className="badge badge-sm badge-outline text-teal-600 border-teal-500 font-semibold">{tile.category}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 h-10">{tile.description}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="font-extrabold text-lg text-teal-600">${tile.price.toFixed(2)}</span>
                  
                  <Link 
                    href={`/tiles/${tile.id}`} 
                    onClick={() => handleToast(tile.title)}
                    className="btn btn-primary btn-sm text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:opacity-90"
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