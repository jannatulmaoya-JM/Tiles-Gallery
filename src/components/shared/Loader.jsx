import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-teal-500 scale-125"></span>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase animate-pulse">
          Loading Collections...
        </p>
      </div>
    </div>
  );
};

export default Loader; 