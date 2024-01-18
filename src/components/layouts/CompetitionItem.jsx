import competitionsApi from "@/api/modules/competitions.api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiBullhorn } from "react-icons/ci";
import { toast } from "react-toastify";
import missionPointIcon from "../../../public/mission-point-icon.svg";
import Timer from "../functions/Timer";

export default function CompetitionItem({ competition }) {
  const [missions, setMissions] = useState([]);

  const isStarted =
    new Date(competition.startedAt).getTime() >= new Date().getTime();

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

  return (
    <div className="bg-white my-8 p-8 -mx-6">
      <h3 className="flex items-center gap-2 mb-3">
        <CiBullhorn className="text-3xl" />
        <span className="font-medium text-xl">{competition.name}</span>
      </h3>

      <div className="flex items-center gap-2">
        <p className="text-sm">{isStarted ? "Dimulai" : "Berakhir"} dalam</p>
        <Timer
          data={isStarted ? competition.startedAt : competition.endAt}
          color={isStarted ? "yellow" : "blue"}
        />
      </div>

      <div className="mt-10 flex items-center gap-2">
        <div className="flex flex-col gap-4 basis-1/3">
          <h5 className="font-medium text-2xl">{competition.subTitle}</h5>
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

                  <div className="p-4 flex flex-col gap-2.5">
                    <h4 className="font-medium text-lg">{mission.title}</h4>

                    <h6 className="text-xs text-gray-400">
                      {mission.subTitle}
                    </h6>

                    <h6 className="text-blue-500 text-sm font-medium flex items-center gap-1">
                      <Image src={missionPointIcon} alt="Mission Point Icon" />
                      {mission.pointReward} / Kg
                    </h6>

                    <h6 className="text-green-500 text-xs font-medium">
                      {mission.xpReward} exp
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
