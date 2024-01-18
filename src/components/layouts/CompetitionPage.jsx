import userApi from "@/api/modules/users.api";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useDispatch } from "react-redux";

export default function CompetitionPage({
  competitionId,
  setUserTeam,
  children,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const authUser = async () => {
      dispatch(setGlobalLoading(true));
      const { response } = await userApi.getUserTeam({ competitionId });
      dispatch(setGlobalLoading(false));
      if (response) setUserTeam(response);
    };
    authUser();
  }, [dispatch, competitionId]);

  return (
    <>
      <div className="mt-4 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <AiOutlineArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-xl font-semibold">Misi Spesial</h1>
        </div>

        <div className="bg-green-400 py-1 px-3 rounded-full text-white flex items-center gap-3 text-sm">
          <HiOutlineInformationCircle className="text-3xl" />
          Tata cara menjalankan misi. Tekan untuk melihat
        </div>

        <div className="rounded-t-xl bg-white flex justify-between items-center">
          <Link
            href={`/competition/${competitionId}`}
            className={`py-4 px-8 font-medium ${
              router.asPath === `/competition/${competitionId}` ||
              router.asPath === `/competition/${competitionId}/join`
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            }`}
          >
            Tim
          </Link>
          <Link
            href={`/competition/${competitionId}/missions`}
            className={`py-4 px-8 font-medium ${
              router.asPath === `/competition/${competitionId}/missions`
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            }`}
          >
            Misi
          </Link>
          <Link
            href={`/competition/${competitionId}/leaderboard`}
            className={`py-4 px-8 font-medium ${
              router.asPath === `/competition/${competitionId}/leaderboard`
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            }`}
          >
            Peringkat
          </Link>
        </div>
      </div>

      <div className="bg-blue-100 px-6 py-8 rounded-b-xl">{children}</div>
    </>
  );
}
