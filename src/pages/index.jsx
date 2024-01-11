import HomeCarousel from "@/components/layouts/HomeCarousel";
import HomeSection1 from "@/components/layouts/HomeSection1";
import HomeSection2 from "@/components/layouts/HomeSection2";
import HomeSection3 from "@/components/layouts/HomeSection3";
import HomeSection4 from "@/components/layouts/HomeSection4";
import HomeSection5 from "@/components/layouts/HomeSection5";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    setTimeout(() => {
      dispatch(setGlobalLoading(false));
    }, 1000);
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <HomeCarousel />

      <div className="flex justify-center items-center gap-3 mt-8 mb-4">
        <Link
          href="/regist"
          className="text-center w-1/3 py-3 px-2 bg-blue-500 text-white rounded-lg border-2 border-blue-500"
        >
          Daftar Gratis
        </Link>
        <Link
          href="/login"
          className="text-center w-1/3 py-3 px-2 bg-white text-blue-500 rounded-lg border-2 border-blue-500"
        >
          Masuk
        </Link>
      </div>

      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
    </div>
  );
}
