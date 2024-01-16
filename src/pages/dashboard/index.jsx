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
import ProtectedPage from "@/components/utils/ProtectedPage";
import { HiOutlineInformationCircle } from "react-icons/hi2";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector(selectUser);

  const [missions, setMissions] = useState([]);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const fetchMissions = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await missionsApi.getAllWeeklyMissions();
      dispatch(setGlobalLoading(false));
      if (response) setMissions(response);
      if (error) toast.error(error.message);
    };
    fetchMissions();
  }, [dispatch]);

  return (
    <ProtectedPage>
      <div className="flex flex-col gap-6">
        <div className="bg-red-400 text-white px-3 py-4 rounded-xl flex justify-between items-center gap-3">
          <div>
            <HiOutlineInformationCircle className="text-3xl" />
          </div>
          <h4 className="text-xs">
            Profil kamu belum lengkap. Tekan untuk melengkapi profil sekarang.
          </h4>
          <Link
            href="/dashboard/profile"
            className="btn btn-sm border-0 bg-gray-100 text-red-500 font-normal hover:bg-gray-300"
          >
            <button>Lengkapi Profil</button>
          </Link>
        </div>

        <div className="flex gap-4">
          <UserLevel user={user} level={level} setLevel={setLevel} />
          <div className="bg-blue-500 flex justify-center items-center flex-col rounded-lg w-1/4">
            <Image src={leaderbordIcon} alt="leaderboard icon" />
            <p className="text-white">Peringkat</p>
          </div>
        </div>

        <UserBadge user={user} level={level} />

        <h2 className="font-bold text-2xl">Misi Mingguan</h2>

        {missions.map((mission, i) => (
          <div key={i} className="bg-white p-4 rounded-xl">
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
                <h6 className="text-gray-400 text-xs mt-1">
                  {mission.description.substring(0, 75)}...
                </h6>

                <h6 className="text-blue-500 text-xs flex items-center gap-1 mt-3">
                  <Image src={missionPointIcon} alt="Mission Point Icon" />
                  {mission.pointReward} / Kg
                </h6>
                <h6 className="text-cyan-400 text-xs mt-1">
                  {mission.xpReward} Exp
                </h6>

                <div className="mt-4">
                  <Link
                    href={`/mission/${mission.id}`}
                    className="bg-blue-500 text-white rounded-lg p-2 text-xs"
                  >
                    Lihat Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProtectedPage>
  );
}
