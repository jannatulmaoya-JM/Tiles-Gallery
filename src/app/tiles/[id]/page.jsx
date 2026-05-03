import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // তোমার better-auth সার্ভার অবজেক্ট

// ডাটা ফেচ করার ফাংশন
async function getTileDetails(id) {
  try {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData);
    
    return data.tiles ? data.tiles.find((t) => String(t.id) === String(id)) : null;
  } catch (error) {
    console.error("Error loading tile details:", error);
    return null;
  }
}

export default async function TileDetailsPage({ params }) {
  // ১. প্রথমে params থেকে id এবং টাইলের ডাটা বের করো
  const { id } = await params; 
  const tile = await getTileDetails(id);

  // ২. টাইল যদি আসলেই না থাকে, তবে "Not Found" দেখাও
  if (!tile) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Tile Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          The tile collection you are looking for does not exist.
        </p>
        <Link href="/all-tiles" className="btn btn-primary mt-6 text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none">
          Back to All Tiles
        </Link>
      </div>
    );
  }

  // ৩. টাইল পাওয়া গেছে, এবার চেক করো ইউজার লগইন আছে কি না
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ৪. ইউজার লগইন না থাকলে এই মেসেজটি দেখাবে
  if (!session) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full p-8 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You must be logged in to view the full details of this tile.</p>
          <Link 
            href={`/login?redirectTo=/tiles/${id}`} 
            className="btn w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold h-11 rounded-xl border-none flex items-center justify-center hover:opacity-90 select-none cursor-pointer"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ৫. ইউজার লগইন করা থাকলে টাইলের ডিটেইলস দেখাও
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/all-tiles" className="btn btn-outline btn-sm md:btn-md border-teal-500 hover:bg-teal-500 hover:border-teal-500 text-teal-600 hover:text-white transition-all select-none">
          ← Back to All Tiles
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-base-100 p-6 md:p-10 rounded-2xl shadow-xl border border-base-200">
        
        {/* বাম পাশে টাইলের ছবি */}
        <div className="relative h-[350px] md:h-[500px] w-full overflow-hidden rounded-2xl border border-base-200 shadow-sm group">
          <img 
            src={tile.image} 
            alt={tile.title} 
            className="w-full h-full object-cover select-none group-hover:scale-105 transition-all duration-700"
          />
        </div>

        {/* ডান পাশে টাইলের বিস্তারিত তথ্য */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
                {tile.title}
              </h1>
              <span className="badge badge-lg badge-outline text-teal-600 border-teal-500 font-bold px-4 py-3">
                {tile.category}
              </span>
            </div>

            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
              {tile.description}
            </p>

            <div className="overflow-x-auto mt-8 bg-base-200/50 p-4 rounded-xl border border-base-200">
              <table className="table w-full">
                <tbody>
                  <tr className="border-b border-base-300">
                    <td className="font-bold text-gray-600 dark:text-gray-400">Dimensions</td>
                    <td className="text-gray-800 dark:text-gray-200">{tile.dimensions}</td>
                  </tr>
                  <tr className="border-b border-base-300">
                    <td className="font-bold text-gray-600 dark:text-gray-400">Material</td>
                    <td className="text-gray-800 dark:text-gray-200">{tile.material}</td>
                  </tr>
                  <tr className="border-b border-base-300">
                    <td className="font-bold text-gray-600 dark:text-gray-400">Currency</td>
                    <td className="text-gray-800 dark:text-gray-200">{tile.currency || "USD"}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-gray-600 dark:text-gray-400">Availability</td>
                    <td>
                      {tile.inStock ? (
                        <span className="badge badge-success text-white font-semibold">In Stock</span>
                      ) : (
                        <span className="badge badge-error text-white font-semibold">Out of Stock</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-base-200">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-400 uppercase font-semibold tracking-wider">Unit Price</p>
              <span className="font-black text-3xl md:text-4xl text-teal-600">
                ${tile.price ? Number(tile.price).toFixed(2) : "0.00"}
              </span>
            </div>
            
            <button 
              className={`btn btn-lg w-full sm:w-auto text-white border-none shadow-lg px-8 select-none ${
                tile.inStock 
                  ? "bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 hover:opacity-95" 
                  : "btn-disabled bg-gray-400"
              }`}
            >
              {tile.inStock ? "Add to Cart" : "Currently Unavailable"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}