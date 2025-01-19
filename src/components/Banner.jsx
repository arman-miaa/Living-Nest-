import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from '../../src/assets/banner1.jpg'
import slide2 from '../../src/assets/banner2.jpg'
import slide3 from '../../src/assets/banner3.jpg'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slides from "../Shared/Slides";

const Banner = () => {
  return (
    <div className="mt-8 lg:mt-12">
      <Swiper
              spaceBetween={30}
              slidesPerView={1}
        // centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slides image={slide1} title={`slide 1`} description='Thsi is slide 1 iamge box'></Slides>
        </SwiperSlide>
        <SwiperSlide>
          <Slides image={slide2} title={`slide 1`} description='Thsi is slide 2 iamge box'></Slides>
        </SwiperSlide>
        <SwiperSlide>
          <Slides image={slide3} title={`slide 1`} description='Thsi is slide 3 iamge box'></Slides>
        </SwiperSlide>
      
      </Swiper>
    </div>
  );
};

export default Banner;
