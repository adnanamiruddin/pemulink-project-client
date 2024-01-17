import Image from "next/image";
import Link from "next/link";
import missionPointIcon from "../../../public/mission-point-icon.svg";

export default function WeeklyMissionItem({ mission }) {
  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="flex justify-between">
        <div className="w-1/2">
          <Image
            src={mission.imageURL}
            alt={mission.title}
            layout="responsive"
            width={100}
            height={100}
          />
        </div>

        <div>
          <h4 className="font-medium text-sm">{mission.title}</h4>
          <h6 className="text-gray-400 text-xs mt-1">{mission.subTitle}</h6>

          <h6 className="text-blue-500 text-xs flex items-center gap-1 mt-3">
            <Image src={missionPointIcon} alt="Mission Point Icon" />
            {mission.pointReward} / Kg
          </h6>

          <h6 className="text-cyan-400 text-xs mt-1">{mission.xpReward} exp</h6>

          <div className="mt-4">
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
