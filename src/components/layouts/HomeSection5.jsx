import Image from "next/image";
import homeSection5Img from "../../../public/home-section-5.png";

export default function HomeSection5() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <Image
        src={homeSection5Img}
        alt="Home Section 1"
        className="w-full mb-6"
      />
      <h3 className="text-center text-2xl font-semibold mb-1">
        Main Tim Bareng Keluarga
      </h3>
      <h5 className="text-center mb-5">
        Selesaikan misi lebih seru dengan fitur invite friends
      </h5>
    </div>
  );
}
