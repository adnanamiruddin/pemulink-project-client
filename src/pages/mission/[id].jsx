import missionsApi from "@/api/modules/missions.api";
import ReqModal from "@/components/functions/ReqModal";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import missionPointIcon from "../../../public/mission-point-icon.svg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Timer from "@/components/functions/Timer";
import { GoTriangleUp } from "react-icons/go";
import dayjs from "dayjs";
import { FaSadCry } from "react-icons/fa";

import "dayjs/locale/id";

dayjs.locale("id");

export default function MissionDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [mission, setMission] = useState(null);
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await missionsApi.getMissionById({ id });
      dispatch(setGlobalLoading(false));
      if (response) setMission(response);
      if (error) toast.error(error.message);
    };
    if (id) fetchMissions();
  }, [id, dispatch]);

  return mission ? (
    <>
      <div className="mt-4 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <AiOutlineArrowLeft className="text-xl" />
            </Link>
            <h1 className="text-xl font-semibold">
              Misi {mission.competitionId ? "Spesial" : "Mingguan"}
            </h1>
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-xs">Berakhir dalam</p>
            <Timer
              data={mission.endAt}
              color={mission.competitionId ? "blue" : ""}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-white py-6 px-4 rounded-xl mt-12">
        <div>
          <h2 className="text-center font-bold text-2xl">{mission.title}</h2>
          <h6 className="text-center mt-2 text-lg text-gray-400">
            {mission.subTitle}
          </h6>
        </div>

        <div className="w-full">
          <Image
            src={mission.imageURL}
            alt={mission.title}
            layout="responsive"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <div className="px-3 py-5 bg-sky-100 rounded-xl flex justify-between">
          <div className="w-1/3 flex flex-col items-center">
            <h4 className="font-medium">Penjelasan</h4>
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="mt-3 bg-green-500 text-white rounded-lg text-[0.70rem] flex items-center py-1 px-2"
            >
              Baca Detail <GoTriangleUp className="text-lg mb-0.5" />
            </button>
          </div>

          <div className="w-1/3 flex flex-col items-center">
            <h4 className="font-medium">Tenggat</h4>
            <p className="mt-3 text-[0.70rem] text-center px-1">
              {`${dayjs(mission.startedAt).format("D MMM YYYY")} hingga`}
              <span className="text-red-400">{` ${dayjs(mission.endAt).format(
                "D MMM YYYY Pukul HH:mm"
              )} WIB`}</span>
            </p>
          </div>

          <div className="w-1/3 flex flex-col items-center">
            <h4 className="font-medium">Reward</h4>
            <h6 className="mt-3 text-blue-500 text-xs flex items-center gap-1">
              <Image
                src={missionPointIcon}
                alt="Mission Point Icon"
                className="w-3"
              />
              {mission.pointReward} / Kg
            </h6>
            <h6 className="text-cyan-400 text-xs">{mission.xpReward} Exp</h6>
          </div>
        </div>

        {showDescription ? (
          <p className="text-sm text-justify">{mission.description}</p>
        ) : null}

        <ReqModal mission={mission} />
      </div>
    </>
  ) : (
    <div className="bg-white flex flex-col justify-center items-center p-10 gap-6 rounded-2xl mt-[15vh]">
      <FaSadCry className="text-9xl text-gray-700" />
      <p className="text-lg text-center">
        Misi yang kamu cari tidak dapat ditemukan
      </p>
      <Link
        href="/dashboard"
        className="btn bg-blue-500 border-0 text-white rounded-lg px-7 text-lg hover:bg-blue-700"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
