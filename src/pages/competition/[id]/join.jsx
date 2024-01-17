import CompetitionHeader from "@/components/layouts/CompetitionHeader";
import CompetitionTeamNavbar from "@/components/layouts/CompetitionTeamNavbar";
import { useRouter } from "next/router";

export default function JoinTeam() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <CompetitionHeader />

      <div className="bg-blue-100 px-6 py-8 rounded-b-xl">
        <CompetitionTeamNavbar id={id} />

        
      </div>
    </div>
  );
}
