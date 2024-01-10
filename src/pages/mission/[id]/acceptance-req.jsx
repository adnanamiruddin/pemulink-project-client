import missionsApi from "@/api/modules/missions.api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MissionAcceptanceReq() {
  const router = useRouter();
  const { id } = router.query;

  const [mission, setMission] = useState(null);

  useEffect(() => {
    const fetchMissions = async () => {
      const { response, error } = await missionsApi.getMissionById({ id });
      if (response) setMission(response);
      if (error) toast.error(error);
    };
    fetchMissions();
  }, [id]);

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
