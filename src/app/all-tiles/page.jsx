'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আপনার JSON Server অথবা API থেকে সব ডাটা লোড করা হচ্ছে
    fetch('http://localhost:3000/api/tiles')
      .then((res) => res.json())
      .then((data) => {
        setTiles(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // সার্চ টার্ম অনুযায়ী ফিল্টার
  const filteredTiles = tiles.filter((tile) =>
    tile.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* সার্চ সেকশন */}
      <div className="max-w-xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800 dark:text-white">
          Explore All Tiles
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm md:text-base">
          Find the perfect tiles for your floor, wall, or backsplash.
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by tile title..."
            className="input input-bordered input-primary w-full shadow-sm pr-12 focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-4 top-3 text-gray-400 select-none">🔍</span>
        </div>
      </div>

      {/* টাইলস গ্রিড */}
      {filteredTiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTiles.map((tile) => (
            <div key={tile.id} className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-2xl transition-all flex flex-col justify-between">
              <figure>
                <img src={tile.image} alt={tile.title} className="h-56 w-full object-cover" />
              </figure>
              <div className="card-body p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-outline text-teal-500 border-teal-500 font-semibold">{tile.category}</span>
                  <span className="badge badge-ghost text-xs">{tile.dimensions}</span>
                </div>
                <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white">{tile.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 my-2 line-clamp-2">{tile.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-extrabold text-teal-600">${tile.price.toFixed(2)}</span>
                  <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-sm text-white border-none bg-gradient-to-r from-green-400 to-blue-500">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-20">
          <p className="text-xl font-bold text-gray-500">No tiles found matching your search.</p>
        </div>
      )}
    </div>
  );
}

// export default AllTilesPage;