import missionsApi from "@/api/modules/missions.api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import UserLevel from "@/components/layouts/UserLevel";
import leaderbordIcon from "../../../public/leaderboard-icon.svg";
import UserBadge from "@/components/layouts/UserBadge";
import { toast } from "react-toastify";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import missionPointIcon from "../../../public/mission-point-icon.svg";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector(selectUser);

  const [missions, setMissions] = useState([]);
  const [level, setLevel] = useState(1);
  console.log(missions);

  useEffect(() => {
    const fetchMissions = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await missionsApi.getAllWeeklyMissions();
      dispatch(setGlobalLoading(false));
      if (response) setMissions(response);
      if (error) toast.error(error.message);
    };
    fetchMissions();
  }, []);

  return user ? (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <UserLevel user={user} level={level} setLevel={setLevel} />
        <div className="bg-blue-500 flex justify-center items-center flex-col rounded-lg w-1/4">
          <Image src={leaderbordIcon} alt="leaderboard icon" />
          <p className="text-white">Peringkat</p>
        </div>
      </div>

      <UserBadge user={user} level={level} />

      {missions.map((mission, i) => (
        <div key={i} className="bg-white p-4 rounded-xl">
          <div className="flex justify-between">
            <div className="flex w-4/6 gap-1">
              <Image
                src={mission.imageURL}
                alt={mission.title}
                layout="responsive"
                width={100}
                height={100}
                className="w-1/4"
              />
              <div className="flex flex-col gap-1">
                <h4 className="font-medium text-sm">{mission.title}</h4>
                <h6 className="text-gray-400 text-xs">{mission.description}</h6>

                <h6 className="text-blue-500 text-xs flex items-center gap-1 mt-2">
                  <Image src={missionPointIcon} alt="Mission Point Icon" />
                  {mission.pointReward} / Kg
                </h6>
                <h6 className="text-cyan-400 text-xs">
                  {mission.xpReward} Exp
                </h6>
              </div>
            </div>

            <div></div>
          </div>
        </div>
        // <div key={i} className="card card-compact bg-gray-100 shadow-xl">
        //   <div className="skeleton w-full h-20 bg-gray-400"></div>
        //   <div className="card-body">
        //     <h2 className="card-title">{mission.title}</h2>
        //     <p>{mission.description}</p>
        //     <div className="card-actions justify-end">
        //       <Link
        //         href={`/mission/${mission.id}`}
        //         className="btn btn-sm btn-accent"
        //       >
        //         View More
        //       </Link>
        //     </div>
        //   </div>
        // </div>
      ))}
    </div>
  ) : null;
}
