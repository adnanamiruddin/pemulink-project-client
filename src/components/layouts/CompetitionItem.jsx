import competitionsApi from "@/api/modules/competitions.api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiBullhorn } from "react-icons/ci";
import { LuTimer } from "react-icons/lu";
import { toast } from "react-toastify";
import missionPointIcon from "../../../public/mission-point-icon.svg";

export default function CompetitionItem({ competition }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [missions, setMissions] = useState([]);

  function calculateTimeRemaining() {
    const endTime = new Date(competition.endAt).getTime();
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
    const fetchMissions = async () => {
      const { response, error } =
        await competitionsApi.getAllMissionsByCompetitionId({
          id: competition.id,
        });
      if (response) setMissions(response);
      if (error) toast.error(error.message);
    };
    fetchMissions();
  }, [competition]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    // Cleaning interval when components are unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white my-8 p-8 -mx-6">
      <h3 className="flex items-center gap-2">
        <CiBullhorn className="text-3xl" />
        <span className="font-medium text-xl">{competition.name}</span>
      </h3>

      <h6 className="text-sm mt-8 flex items-center gap-2">
        Berakhir dalam
        <span className="bg-sky-400 rounded-full px-3 py-1 text-white text-base flex items-center gap-1">
          <LuTimer />
          {`${timeRemaining.days} : ${timeRemaining.hours} : ${timeRemaining.minutes} : ${timeRemaining.seconds}`}
        </span>
      </h6>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex flex-col gap-4 basis-1/3">
          <h5 className="font-medium text-2xl">{competition.description}</h5>
          <p className="text-sm">Selesaikan misi dan dapatkan tambahan poin</p>
          <Link
            href={`/competition/${competition.id}`}
            className="btn text-base font-normal bg-blue-500 text-white border-0 hover:bg-blue-700"
          >
            Ikut Misi
          </Link>
        </div>

        <div className="flex overflow-x-scroll basis-2/3 px-4 gap-3">
          {missions.length > 0
            ? missions.map((mission, i) => (
                <div key={i} className="border shadow-lg rounded-xl">
                  <div className="bg-stone-100 w-40 h-40 flex justify-center items-center p-2 rounded-xl">
                    <Image
                      src={mission.imageURL}
                      alt={mission.title}
                      width={100}
                      height={100}
                      className="w-full object-contain"
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <h4 className="font-medium text-lg">{mission.title}</h4>

                    <h6 className="text-xs text-gray-400">
                      {mission.description}
                    </h6>

                    <h6 className="text-blue-500 text-sm font-medium flex items-center gap-1">
                      <Image src={missionPointIcon} alt="Mission Point Icon" />
                      {mission.pointReward} / Kg
                    </h6>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
