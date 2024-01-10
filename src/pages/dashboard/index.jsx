import missionsApi from "@/api/modules/missions.api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const { response, error } = await missionsApi.getAllWeeklyMissions();
      if (response) setMissions(response);
      if (error) console.log(error);
    };
    fetchMissions();
  }, []);

  return (
    <div>
      {missions.map((mission, i) => (
        <div key={i} className="card card-compact bg-gray-100 shadow-xl">
          <div className="skeleton w-full h-20 bg-gray-400"></div>
          <div className="card-body">
            <h2 className="card-title">{mission.title}</h2>
            <p>{mission.description}</p>
            <div className="card-actions justify-end">
              <Link href={`/mission/${mission.id}`} className="btn btn-sm btn-accent">View More</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
