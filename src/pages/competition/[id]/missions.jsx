import CompetitionHeader from "@/components/layouts/CompetitionHeader";
import { useRouter } from "next/router";

export default function CompetitionMissions() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <CompetitionHeader competitionId={id} />

      <h1>Missions</h1>
    </div>
  );
}
