import { useEffect, useState } from "react";
import { LuTimer } from "react-icons/lu";

export default function Timer({ data, color }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const endTime = new Date(data).getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    // Cleaning interval when components are unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`${
        color === "blue"
          ? "bg-sky-400"
          : color === "yellow"
          ? "bg-amber-500"
          : "bg-pink-500"
      } rounded-full px-3 py-1 text-white text-xs flex items-center gap-1`}
    >
      <LuTimer className="text-xl" />
      {`${timeRemaining.days} : ${timeRemaining.hours} : ${timeRemaining.minutes} : ${timeRemaining.seconds}`}
    </div>
  );
}
