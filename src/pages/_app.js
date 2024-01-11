import "@/styles/globals.css";
import MainLayout from "./_layouts/MainLayout";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import pemulinkLogo from "../../public/pemulink-logo.png";

const Loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // routeChangeStart
    const handleStart = (url) =>
      url !== router.asPath ? setLoading(true) : setLoading(false);
    // routeChangeComplete
    const handleComplete = (url) =>
      url === router.asPath
        ? setTimeout(() => {
            setLoading(false);
          }, 1000)
        : setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    // routeChangeError
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading ? (
    <div className="min-h-screen absolute z-[999] w-full flex justify-center items-center bg-blue-50 loading-container gap-3">
      <span className="loading loading-ball loading-lg text-blue-500"></span>
      <Image src={pemulinkLogo} alt="Pemulink Logo" className="w-1/2" />
      <span className="loading loading-ball loading-lg text-yellow-400"></span>
    </div>
  ) : null;
};

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Loading />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
