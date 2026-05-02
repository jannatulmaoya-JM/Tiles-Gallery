import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-base-100 px-4 text-center select-none">
      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 tracking-wider">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto text-sm md:text-base">
        The collection page you are looking for does not exist or has been moved.
      </p>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 hover:opacity-95 text-white font-bold border-none rounded-xl px-6 shadow-md transition-all">
          Back to Home
        </Link>
        <Link href="/all-tiles" className="btn btn-outline border-teal-500 hover:bg-teal-500 hover:border-teal-500 text-teal-600 hover:text-white rounded-xl px-6 transition-all">
          Explore All Tiles
        </Link>
      </div>
    </div>
  );
}