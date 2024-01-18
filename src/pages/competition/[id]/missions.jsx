import competitionsApi from "@/api/modules/competitions.api";
import CompetitionHeader from "@/components/layouts/CompetitionPage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { toast } from "react-toastify";

export default function CompetitionMissions() {
  const router = useRouter();
  const { id } = router.query;

  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const { response, error } =
        await competitionsApi.getAllMissionsByCompetitionId({
          id,
        });
      console.log(response);
      if (response) setMissions(response);
      if (error) toast.error(error.message);
    };
    fetchMissions();
  }, [id]);

  return (
    <CompetitionHeader competitionId={id}>
      <div className="bg-sky-400 p-4 text-white flex items-center gap-4 rounded-2xl">
        <div>
          <HiOutlineInformationCircle className="text-3xl" />
        </div>
        <p className="text-xs text-justify">
          Kumpulkan semua kardus bekas, siapkan tempat penyimpanan, tumpukkan
          dengan rapi, ambil foto sebagai bukti, buang ke tempat daur ulang, dan
          bagikan pengalamanmu untuk menginspirasi orang lain.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-white p-4 rounded-xl flex gap-6">
            <div className="py-3 px-1 rounded-xl bg-gray-100">
              <Image
                src={mission.imageURL}
                alt={mission.title}
                width={100}
                height={100}
              />
            </div>

            <div>
              <h4 className="font-semibold">{mission.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{mission.subTitle}</p>

              <div className="flex"></div>
            </div>
          </div>
        ))}
      </div>
    </CompetitionHeader>
  );
}
