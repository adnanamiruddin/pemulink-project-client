import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { selectGlobalLoading } from "@/redux/features/globalLoadingSlice";
import pemulinkLogo from "../../../public/pemulink-logo.png";

export default function GlobalLoading() {
  const { globalLoading } = useSelector(selectGlobalLoading);

  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => {
        setIsLoading(false);

        setTimeout(() => {
          setIsHidden(true);
        }, 1100);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [globalLoading]);

  return (
    <div
      className={`min-h-screen absolute flex justify-center items-center bg-blue-50 z-[999] transition-all duration-300 ease-in-out ${
        isLoading ? "opacity-100" : "opacity-0"
      } ${isHidden ? "hidden" : ""}`}
    >
      <Image src={pemulinkLogo} alt="Pemulink Logo" className="w-1/2" />
    </div>
  );
}
