import React from 'react';
import bannerImg from '../../asses/banner.png'; 

const Banner = () => {
  return (
    <div className="container mx-auto my-4 md:my-6 px-4">
      <div 
        className="hero min-h-[50vh] sm:min-h-[55vh] md:min-h-[65vh] rounded-2xl overflow-hidden relative shadow-xl"
        style={{
          backgroundImage: `url(${bannerImg.src})`, 
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-overlay bg-black/45 select-none"></div>

        <div className="hero-content text-neutral-content text-center relative z-10 w-full px-2 sm:px-4">
          <div className="max-w-xl w-full mx-auto px-3 sm:px-6 py-5 md:py-8 backdrop-blur-[2px] rounded-xl border border-white/10">
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight select-none">
              Discover Your <br />
              <span className="bg-gradient-to-r from-green-300 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                Perfect Aesthetic
              </span>
            </h1>
            <p className="mb-5 text-xs sm:text-sm md:text-base text-gray-200 font-medium max-w-md mx-auto">
              Explore our premium collection of ceramic, geometric, and minimalist tiles. 
              Crafted beautifully to elevate your living spaces.
            </p>
            <button className="btn btn-sm sm:btn-md h-auto min-h-[2.5rem] sm:min-h-[3rem] px-6 sm:px-8 text-white font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:from-green-500 hover:via-teal-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-teal-500/30 rounded-xl">
              Browse Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;