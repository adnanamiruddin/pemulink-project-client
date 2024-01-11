import { useState, useEffect } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowWelcome(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div>Hello World</div>
    // <div className="min-h-screen bg-[#4338CA]">
    //   {showWelcome ? <div className="">Selamat Datang</div> : <div>Hello World</div>}
    // </div>
  );
}
