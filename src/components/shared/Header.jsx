
import React from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
const Header = () => {
  return (
    <div className="bg-base-300 shadow-sm w-full"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="dropdown lg:hidden mr-2">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-3 shadow bg-base-100 rounded-box w-52 gap-2 text-base font-medium">
                <li>
                  <Link href="/" className="hover:text-success active:bg-transparent">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/all-tiles" className="hover:text-success active:bg-transparent">
                    All Tiles
                  </Link>
                </li>
                <li>
                  <Link href="/my-profile" className="hover:text-success active:bg-transparent">
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-shrink-0">
              <Link href="/" className="btn btn-ghost px-0 hover:bg-transparent font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent select-none">
                Tiles Gallery
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex flex-grow justify-center">
            <ul className="menu menu-horizontal px-1 gap-6 text-base font-medium">
              <li>
                <Link href="/" className="hover:text-success transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-tiles" className="hover:text-success transition-colors">
                  All Tiles
                </Link>
              </li>
              <li>
                <Link href="/my-profile" className="hover:text-success transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>


          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="btn btn-sm sm:btn-md text-white font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:from-green-500 hover:via-teal-600 hover:to-blue-600 transition-all"
            >
              Login
            </Link>

            <Link 
              href="/register" 
              title="Create an account" 
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 transition-colors select-none"
            >
              <FaUserCircle size={32} className="sm:w-9 sm:h-9" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;