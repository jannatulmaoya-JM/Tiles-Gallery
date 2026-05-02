import React from 'react';
import Link from 'next/link';
import Banner from '@/components/shared/Banner';

// Local db.json অথবা JSON Server থেকে ডাটা ফেচ করার ফাংশন
async function getFeaturedTiles() {
  try {
    // আপনার লোকাল JSON Server চললে: http://localhost:5000/tiles অথবা সরাসরি ইমপোর্ট/ফেচ
    const res = await fetch('http://localhost:3000/api/tiles', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 4); // প্রথম ৪টি টাইলস
  } catch (error) {
    // Fallback: ফেচ ফেইল করলে প্রজেক্ট ক্র্যাশ করবে না
    return [];
  }
}

export default async function HomePage() {
  const featuredTiles = await getFeaturedTiles();

  return (
    <div className="container mx-auto px-4 pb-12">
      {/* ১. ব্যানার সেকশন */}
      <Banner />

      {/* ২. আকর্ষণীয় Marquee সেকশন */}
      <div className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 my-8 overflow-hidden rounded-lg shadow-md select-none">
        <div className="whitespace-nowrap animate-marquee flex gap-12 font-semibold text-sm md:text-base">
          <span>🔥 New Arrivals: Ceramic Blue Glaze | </span>
          <span>✨ Weekly Feature: Modern Geometric Monochrome | </span>
          <span>🏡 Join the Community and Share Your Design Ideas | </span>
          <span>💎 Premium Marble Collection Now In Stock | </span>
        </div>
      </div>

      {/* ৩. Featured Tiles সেকশন */}
      <section className="my-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
            Featured Collections
          </h2>
          <Link href="/all-tiles" className="btn btn-outline btn-sm md:btn-md border-teal-500 hover:bg-teal-500 hover:border-teal-500">
            View All Tiles
          </Link>
        </div>

        {/* টাইলস গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTiles.map((tile) => (
            <div key={tile.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200 flex flex-col justify-between h-full">
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
                  <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-sm text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:opacity-90">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}