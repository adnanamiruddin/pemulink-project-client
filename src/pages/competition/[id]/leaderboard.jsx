import CompetitionHeader from "@/components/layouts/CompetitionPage";
import { useRouter } from "next/router";

export default function CompetitionLeaderboard() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <CompetitionHeader competitionId={id} />

      <h1>Leaderboard</h1>
    </div>
  );
}
