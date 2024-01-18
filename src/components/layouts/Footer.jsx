import Image from "next/image";
import pemulinkLogoImg from "../../../public/pemulink-logo-footer.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex justify-between items-center bg-blue-500 py-6 px-5 md:py-3">
      <Image
        src={pemulinkLogoImg}
        alt="Pemulink Logo"
        className="w-[40%] md:w-1/6"
      />
      <div className="flex gap-5 items-center md:gap-7">
        <FaFacebookF className="text-white" />
        <FaTwitter className="text-white" />
        <FaLinkedinIn className="text-white" />
        <FaInstagram className="text-white" />
      </div>
    </div>
  );
}
