import Image from "next/image";
import pemulinkLogoImg from "../../../public/pemulink-logo.png";

export default function HomeSection3() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-center text-2xl font-semibold mb-1">
        Oleh Karena Itu
      </h3>
      <h5 className="text-center mb-5">Memperkenalkan inovasi website</h5>
      <Image
        src={pemulinkLogoImg}
        alt="Home Section 1"
        className="w-full mb-5"
      />
      <p className="text-justify">
        Website pengelolaan sampah rumah tangga dengan partisipasi aktif
        lingkungan keluarga menggunakan konsep gamifikasi yang dapat mendukung
        motivasi pengguna (Koivisto dan Hamari 2019 ) dengan memberikan
        pengalaman mengalir dan mendalam (Hamari et al 2016 ), yaitu menangkap
        perhatian pemain sepenuhnya sebagai upaya membentuk kesadaran masyarakat
        tentang urgensi sampah di Indonesia
      </p>
    </div>
  );
}
