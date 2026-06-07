import React from 'react'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { EffectFade } from 'swiper/modules'
import 'swiper/css/effect-fade'
const Hero = () => {
  return (
    <Swiper
      effect="fade"
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full h-[420px] sm:h-[500px] rounded-lg overflow-hidden"
    >

      {/* Slide 1 */}
      <SwiperSlide>
        <div className="relative w-full h-full">

          {/* IMAGE */}
          <img
            className="w-full h-full object-cover"
            src={assets.hero_img}
            alt=""
          />

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center px-6 sm:px-16">
            <div className="text-white max-w-[450px] sm:max-w-md">

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wider drop-shadow-lg">
                <span className="text-white">Wear</span>
                <span className="text-orange-500">On</span>
              </h1>

              <p className="mt-2 text-sm sm:text-lg text-gray-200 tracking-wide">
                Always In Style
              </p>

              <button
                  onClick={() => {
                    const section = document.getElementById('products');
                    if (section) {
                      window.scrollTo({
                        top: section.offsetTop - 30,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="mt-4 px-5 py-2 sm:px-7 bg-orange-500 rounded-full text-sm hover:scale-105 transition"
                >
                  Shop Now
               </button>

            </div>
          </div>

        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="relative w-full h-full">

          {/* IMAGE */}
          <img
            className="w-full h-full object-cover"
            src={assets.banner}
            alt=""
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* CONTENT CENTER */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">

            <h1 className="text-3xl sm:text-5xl font-bold">
              New Drops 🔥
            </h1>

            <p className="mt-2 text-sm sm:text-lg opacity-90">
              Trending Now
            </p>

          </div>

        </div>
      </SwiperSlide>

    </Swiper>
  )
}

export default Hero