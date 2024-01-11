import HomeCarousel from "@/components/layouts/HomeCarousel";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
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
    <div className="flex flex-col">
      <HomeCarousel />
    </div>
  );
}
