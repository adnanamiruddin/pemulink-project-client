import missionsApi from "@/api/modules/missions.api";
import ReqModal from "@/components/layouts/ReqModal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MissionDetail() {
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

  if (!mission) return <div>404</div>;
  return (
    <div className="flex flex-col gap-4">
      <h1>{mission.title}</h1>
      <p>{mission.description}</p>
      <Link href={`/mission/${id}/acceptance-req`} className="btn btn-primary">
        Permintaan Penerimaan Misi
      </Link>

      <ReqModal mission={mission} />
    </div>
  );
}
