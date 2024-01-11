import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import homeCarousel1Img from "../../../public/home-carousel-1.png";
import homeCarousel2Img from "../../../public/home-carousel-2.png";
import homeCarousel3Img from "../../../public/home-carousel-3.png";


export default function HomeCarousel() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
}
