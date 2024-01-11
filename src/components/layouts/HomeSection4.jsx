import Image from "next/image";
import homeSection4Img from "../../../public/home-section-4.png";

export default function HomeSection4() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-center text-2xl font-semibold mb-1">
        Tuntaskan Misi
      </h3>
      <h5 className="text-center mb-5">
        Kumpulkan Sampah, Raih kemenangan, dapatkan pangkat dan poin
      </h5>
      <Image
        src={homeSection4Img}
        alt="Home Section 1"
        className="w-full mb-4"
      />
    </div>
  );
}
