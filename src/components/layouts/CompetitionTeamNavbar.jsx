import Image from "next/image";
import Link from "next/link";
import createTeamIcon from "../../../public/create-team-icon.png";
import joinTeamIcon from "../../../public/join-team-icon.png";
import { useRouter } from "next/router";

export default function CompetitionTeamNavbar({ id }) {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-lg">Kolaborasi</h3>
      <div className="flex items-center gap-3 mt-3">
        <Link href={`/competition/${id}`} className="w-1/2">
          <div
            className={`bg-white px-6 py-4 flex flex-col gap-3 justify-center items-center rounded-xl text-sm border-2 ${
              router.asPath === `/competition/${id}`
                ? "border-blue-400"
                : "border-white"
            }`}
          >
            <Image src={createTeamIcon} alt="Create Team Icon" />
            Buat Tim
          </div>
        </Link>

        <Link href={`/competition/${id}/join`} className="w-1/2">
          <div
            className={`bg-white px-6 py-4 flex flex-col gap-3 justify-center items-center rounded-xl text-sm border-2 ${
              router.asPath === `/competition/${id}/join`
                ? "border-blue-400"
                : "border-white"
            }`}
          >
            <Image src={joinTeamIcon} alt="Join Team Icon" />
            Gabung Tim
          </div>
        </Link>
      </div>
    </div>
  );
}
