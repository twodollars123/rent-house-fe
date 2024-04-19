import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//assets
import light from "@assets/logo_light.svg";
import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";
import wallet from "@assets/coins.webp";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <button
//       type="button"
//       class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//       className={className}
//       onClick={onClick}
//     >
//       <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//         <svg
//           class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 6 10"
//         >
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="M5 1 1 5l4 4"
//           />
//         </svg>
//       </span>
//     </button>
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <button
//       type="button"
//       class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//       className={className}
//       onClick={onClick}
//     >
//       <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//         <svg
//           class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 6 10"
//         >
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="M5 1 1 5l4 4"
//           />
//         </svg>
//       </span>
//     </button>
//   );
// }

function Fade({ listThumbs }) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    arrows: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {listThumbs &&
          listThumbs.map((thumb, index) => {
            return (
              <div
                className="flex justify-between items-center grow w-[80%]"
                key={index}
              >
                <img
                  src={thumb.url}
                  alt=""
                  className="max-h-[70vh] max-w-[100%] overflow-hidden object-contain"
                />
              </div>
            );
          })}
        {listThumbs.length === 0 && (
          <div className="flex justify-between items-center grow w-[80%]">
            <img
              src={house}
              alt=""
              className="max-h-[70vh] max-w-[100%] overflow-hidden object-contain"
            />
          </div>
        )}
      </Slider>
    </div>
  );
}

export default Fade;
