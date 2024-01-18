import Image from "next/image";
import Link from "next/link";
import missionPointIcon from "../../../public/mission-point-icon.svg";
import { PiBroomDuotone } from "react-icons/pi";
import { useEffect, useState } from "react";
import Timer from "../functions/Timer";

export default function WeeklyMissionItem({ mission }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const endTime = new Date(mission.endAt).getTime();
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
    <div className="bg-white p-4 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-2.5">
          <PiBroomDuotone className="text-3xl" />
          <p className="font-medium text-lg">Misi Mingguan</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-sm">Berakhir dalam</p>
          <Timer data={mission} />
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <div className="w-2/5">
          <Image
            src={mission.imageURL}
            alt={mission.title}
            layout="responsive"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <div className="w-2/5 flex flex-col gap-4">
          <div>
            <h4 className="font-medium text-sm">{mission.title}</h4>
            <h6 className="text-gray-400 text-xs mt-1">{mission.subTitle}</h6>
          </div>

          <div className="flex justify-between items-center">
            <h6 className="text-blue-500 text-xs flex items-center gap-1 font-medium">
              <Image src={missionPointIcon} alt="Mission Point Icon" />
              {mission.pointReward} / Kg
            </h6>
            <h6 className="text-cyan-400 text-xs font-medium">
              {mission.xpReward} exp
            </h6>
          </div>

          <div className="">
            <Link
              href={`/mission/${mission.id}`}
              className="bg-blue-500 text-white rounded-lg p-2 text-xs hover:bg-blue-700"
            >
              Lihat Selengkapnya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
