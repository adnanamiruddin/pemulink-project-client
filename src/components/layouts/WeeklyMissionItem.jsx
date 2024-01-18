import Image from "next/image";
import Link from "next/link";
import missionPointIcon from "../../../public/mission-point-icon.svg";
import { PiBroomDuotone } from "react-icons/pi";
import Timer from "../functions/Timer";

export default function WeeklyMissionItem({ mission }) {
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-2.5">
          <PiBroomDuotone className="text-3xl" />
          <p className="font-medium text-lg">Misi Mingguan</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-xs">Berakhir dalam</p>
          <Timer data={mission.endAt} />
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

        <div className="w-3/5">
          <h4 className="font-medium text-sm">{mission.title}</h4>
          <h6 className="text-gray-400 text-xs mt-1">{mission.subTitle}</h6>

          <div className="flex justify-between items-center mt-3">
            <h6 className="text-blue-500 text-xs flex items-center gap-1 font-medium">
              <Image src={missionPointIcon} alt="Mission Point Icon" />
              {mission.pointReward} Poin / Kg
            </h6>
            <h6 className="text-cyan-400 text-xs font-medium">
              {mission.xpReward} exp
            </h6>
          </div>

          <div className="mt-4">
            <Link
              href={`/mission/${mission.id}`}
              className="bg-blue-500 text-white rounded-xl py-2 px-7 text-xs hover:bg-blue-700"
            >
              Lihat Selengkapnya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
