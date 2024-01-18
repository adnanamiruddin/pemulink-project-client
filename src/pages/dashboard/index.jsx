import missionsApi from "@/api/modules/missions.api";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import UserLevel from "@/components/layouts/UserLevel";
import leaderbordIcon from "../../../public/leaderboard-icon.svg";
import UserBadge from "@/components/layouts/UserBadge";
import { toast } from "react-toastify";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import ProtectedPage from "@/components/utils/ProtectedPage";
import DashboardNewAccInfo from "@/components/layouts/DashboardNewAccInfo";
import WeeklyMissionItem from "@/components/layouts/WeeklyMissionItem";
import CompetitionItem from "@/components/layouts/CompetitionItem";
import competitionsApi from "@/api/modules/competitions.api";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector(selectUser);

  const [missions, setMissions] = useState([]);
  const [level, setLevel] = useState(1);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await missionsApi.getAllWeeklyMissions();
      const { response: competitionsResponse, error: competitionsError } =
        await competitionsApi.getAllCompetitions();
      dispatch(setGlobalLoading(false));
      if (response) setMissions(response);
      if (error) toast.error(error.message);
      if (competitionsResponse) setCompetitions(competitionsResponse);
      if (competitionsError) toast.error(competitionsError.message);
    };
    fetchMissions();
  }, [dispatch]);

  return (
    <ProtectedPage>
      <div className="flex flex-col gap-6">
        {user?.city === null ? <DashboardNewAccInfo /> : null}

        <div className="flex gap-4">
          <UserLevel user={user} level={level} setLevel={setLevel} />
          <div className="bg-blue-500 flex justify-center items-center flex-col rounded-lg w-1/4">
            <Image src={leaderbordIcon} alt="leaderboard icon" />
            <p className="text-white">Peringkat</p>
          </div>
        </div>

        <UserBadge user={user} level={level} />

        {/* <h2 className="font-bold text-2xl">Misi Mingguan</h2> */}
        {missions.map((mission, i) => (
          <WeeklyMissionItem key={i} mission={mission} />
        ))}
      </div>

      {competitions.length > 0
        ? competitions.map((competition, i) => (
            <CompetitionItem key={i} competition={competition} />
          ))
        : null}
    </ProtectedPage>
  );
}
