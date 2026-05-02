
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content border-t border-gray-200/20 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div className="flex flex-col items-center md:items-center justify-center text-center">
     
            <span className="font-extrabold text-5xl leading-normal py-2 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent">
              Tiles Gallery
            </span>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
       
            </p>
          </div>
 
          <div>
            <h6 className="footer-title text-gray-800 dark:text-white font-bold opacity-100 mb-4">Quick Links</h6>
            <div className="flex flex-col gap-2">
              <a href="/" className="link link-hover hover:text-success transition-colors">Home</a>
              <a href="/tiles" className="link link-hover hover:text-success transition-colors">All Tiles</a>
              <a href="/profile" className="link link-hover hover:text-success transition-colors">My Profile</a>
            </div>
          </div>

          <div>
            <h6 className="footer-title text-gray-800 dark:text-white font-bold opacity-100 mb-4">Contact Us</h6>
            <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-2">
              <p>Email: support@tilesgallery.com</p>
              <p>Phone: +880 1634-567890</p>
              <p>Location: Dhaka, Bangladesh</p>
            </div>
          </div>
          
        </div>

        <div className="border-t border-gray-400/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Tiles Gallery. All rights reserved.</p>

          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-6">
              <a href="/privacy" className="link link-hover">Privacy Policy</a>
              <a href="/terms" className="link link-hover">Terms of Service</a>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-success transition-colors text-gray-600 dark:text-gray-400"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-success transition-colors text-gray-600 dark:text-gray-400"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-success transition-colors text-gray-600 dark:text-gray-400"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;