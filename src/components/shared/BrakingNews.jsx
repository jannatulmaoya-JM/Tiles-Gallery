// // import React from 'react'
// // import Marquee from "react-fast-marquee";


// // const news =[
// //  {
// //       "_id": "1",
// //       "title": " New Arrivals: Premium Italian Porcelain and Matte collections are now available!"
// //     },
// //     {
// //       "_id": "2",
// //       "title": " Special Offer: Sign up today and get 15% discount on your first order."
// //     },
// //     {
// //       "_id": "3",
// //       "title": " Aesthetic Trends: 'Minimalist Matte White' is the top pick for modern kitchen backsplashes this month."
// //     },
// //     {
// //       "_id": "4",
// //       "title": " Shipping Update: Enjoy free delivery on all bulk orders above $500."
// //     }
  
// // ];
// // const BrakingNews = () => {
// //   return (
// //     <div className='flex justify-between gap-4 items-center py-4 px-2 font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:from-green-500 hover:via-teal-600 hover:to-red-600 transition-all container mx-auto'>
// //         <button className='btn btn-primary text-white'>Letest News</button>
// //         <Marquee pauseOnHover={true}>
// //             {news.map(n=>{
// //               return  <span key={n._id}>n.title</span>
// //             })}
// //         </Marquee>
// //     </div>
// //   )
// // }

// // export default BrakingNews;

// import React from 'react'
// import Marquee from "react-fast-marquee";


// const news = [
//   {
//     "_id": "1",
//     "title": "New Arrivals: Ceramic Blue Glaze"
//   },
//   {
//     "_id": "2",
//     "title": "Weekly Feature: Modern Geometric Monochrome"
//   },
//   {
//     "_id": "3",
//     "title": "Join the Community and Share Your Design Ideas"
//   },
//   {
//     "_id": "4",
//     "title": "Premium Collection: Vintage Victorian Floral"
//   }
// ];

// const BrakingNews = () => {
//   return (
//     <div className='flex justify-between gap-4 items-center py-4 px-2 font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:from-green-500 hover:via-teal-600 hover:to-red-600 transition-all container mx-auto rounded-xl'>
//         {/* বাটন */}
//         <button className='btn btn-primary text-white select-none shrink-0'>Latest News</button>
        
//         {/* Marquee সেকশন */}
//         <Marquee pauseOnHover={true} speed={60} className="cursor-pointer text-white">
//             {news.map(n => {
//               // এখানে ভুল ছিল, আমি 'n.title' এর জায়গায় '{n.title}' করে দিয়েছি
//               // এবং প্রতিটি নিউজের মাঝে স্পেস বা Separator দিয়েছি।
//               return (
//                 <span key={n._id} className="mx-8 flex items-center gap-2 select-none">
//                   {n.title} <span className="text-white/70 ml-6"> | </span>
//                 </span>
//               );
//             })}
//         </Marquee>
//     </div>
//   )
// }

// export default BrakingNews;


import React from 'react'
import Marquee from "react-fast-marquee";

const news = [
  {
    "_id": "1",
    "title": "New Arrivals: Ceramic Blue Glaze"
  },
  {
    "_id": "2",
    "title": "Weekly Feature: Modern Geometric Monochrome"
  },
  {
    "_id": "3",
    "title": "Join the Community and Share Your Design Ideas"
  },
  {
    "_id": "4",
    "title": "Premium Collection: Vintage Victorian Floral"
  }
];

const BrakingNews = () => {
  return (
    <div className='flex justify-between gap-4 items-center py-3 px-4 font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none transition-all container mx-auto rounded-xl shadow-lg my-6 select-none'>
        {/* বাটন */}
        <button className='btn btn-sm md:btn-md bg-white text-teal-700 border-none hover:bg-white/90 shadow-md font-extrabold px-6 rounded-lg select-none shrink-0 cursor-default'>
          Latest News
        </button>
        
        {/* Marquee সেকশন */}
        <Marquee pauseOnHover={true} speed={65} className="cursor-pointer text-white flex items-center">
            {news.map(n => {
              return (
                <span key={n._id} className="mx-6 flex items-center text-sm md:text-base tracking-wide font-semibold">
                  {n.title} 
                  <span className="text-white/60 ml-12 select-none">✦</span>
                </span>
              );
            })}
        </Marquee>
    </div>
  )
}

export default BrakingNews;