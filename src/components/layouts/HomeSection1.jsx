import Image from "next/image";
import homeSection1Img from "../../../public/home-section-1.png";
import homeSection1Src from "../../../public/home-section-1-src.png";

export default function HomeSection1() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-center text-2xl font-semibold mb-1">Tahukah Kamu?</h3>
      <h5 className="text-center mb-5">
        <span className="text-pink-600 font-medium">38,3%</span> Sampah
        Indonesia Berasal <br /> dari Rumah Tangga
      </h5>
      <Image
        src={homeSection1Img}
        alt="Home Section 1"
        className="w-full mb-5"
      />
      <div className="flex justify-center items-center gap-0.5">
        <p className="text-gray-400 text-sm">source:</p>
        <Image src={homeSection1Src} alt="Home Section 1 Source" />
      </div>
    </div>
  );
}
