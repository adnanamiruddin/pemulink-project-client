import missionsApi from "@/api/modules/missions.api";
import ReqModal from "@/components/layouts/ReqModal";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import missionPointIcon from "../../../public/mission-point-icon.svg";

export default function MissionDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [mission, setMission] = useState(null);

  useEffect(() => {
    const fetchMissions = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await missionsApi.getMissionById({ id });
      dispatch(setGlobalLoading(false));
      if (response) setMission(response);
      if (error) toast.error(error);
    };
    fetchMissions();
  }, [id, dispatch]);

  return mission ? (
    <div className="flex flex-col gap-5">
      <h2 className="text-center font-bold text-2xl mt-4">{mission.title}</h2>

      <div className="flex flex-col gap-5 bg-white p-6 rounded-xl">
        <div className="w-full">
          <Image
            src={mission.imageURL}
            alt={mission.title}
            layout="responsive"
            width={100}
            height={100}
          />
        </div>

        <p className="text-justify text-sm mt-6">{mission.description}</p>

        <div className="flex gap-3 items-center">
          <h6 className="text-blue-500 text-sm font-medium flex items-center gap-1">
            <Image src={missionPointIcon} alt="Mission Point Icon" />
            {mission.pointReward} / Kg
          </h6>
          <div className="w-px h-5 bg-gray-500"></div>
          <h6 className="text-cyan-400 text-sm font-medium">
            {mission.xpReward} Exp
          </h6>
        </div>
      </div>

      <ReqModal mission={mission} />
    </div>
  ) : (
    <div>404</div>
  );
}
