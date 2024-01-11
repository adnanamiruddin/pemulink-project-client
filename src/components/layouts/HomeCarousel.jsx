import Image from "next/image";
import homeCarousel1Img from "../../../public/home-carousel-1.png";
import homeCarousel2Img from "../../../public/home-carousel-2.png";
import homeCarousel3Img from "../../../public/home-carousel-3.png";

export default function HomeCarousel() {
  return (
    <>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <Image
            src={homeCarousel1Img}
            alt="Home Carousel 1"
            className="w-full"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <Image
            src={homeCarousel2Img}
            alt="Home Carousel 2"
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <Image
            src={homeCarousel3Img}
            alt="Home Carousel 3"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-center w-full py-2 gap-2 mt-4">
        <a
          href="#item1"
          className="w-5 h-5 rounded-full border-2 border-blue-300"
        >
          <div className="rounded-full border-2 border-blue-600 w-4 h-4"></div>
        </a>
        <a
          href="#item2"
          className="w-5 h-5 rounded-full border-2 border-blue-300"
        >
          <div className="rounded-full border-2 border-blue-600 w-4 h-4"></div>
        </a>
        <a
          href="#item3"
          className="w-5 h-5 rounded-full border-2 border-blue-300"
        >
          <div className="rounded-full border-2 border-blue-600 w-4 h-4"></div>
        </a>
      </div>
    </>
  );
}
