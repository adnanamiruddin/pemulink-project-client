import Image from "next/image";
import level1Icon from "../../../public/level-1-icon.svg";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";

export default function UserLevel({ user, level, setLevel }) {
  const [currentXP, setCurrentXP] = useState(0);
  const [nextLevelXP, setNextLevelXP] = useState(4000);
  const [remainingXPToNextLevel, setRemainingXPToNextLevel] = useState(4000);

  useEffect(() => {
    const userXP = user?.xp;

    // Calculates level based on XP
    const calculatedLevel = Math.floor(userXP / 4000) + 1;
    setLevel(calculatedLevel);

    // Sets XP to 0 when reaching a certain level
    const maxLevelXP = calculatedLevel * 4000;
    const remainingXP = userXP - maxLevelXP;

    if (remainingXP >= 0) {
      setLevel(calculatedLevel + 1);
      setCurrentXP(remainingXP);
      setNextLevelXP((calculatedLevel + 1) * 4000);
      setRemainingXPToNextLevel((calculatedLevel + 1) * 4000 - userXP);
    } else {
      setCurrentXP(userXP);
      setNextLevelXP(calculatedLevel * 4000);
      setRemainingXPToNextLevel(calculatedLevel * 4000 - userXP);
    }
  }, [user]);

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <Image src={level1Icon} alt={`Level ${level} Icon`} />
        <div className="">
          <h4 className="font-bold text-xl">Level {level}</h4>
          <h6 className="text-gray-400 text-sm">
            {remainingXPToNextLevel >= 0 ? remainingXPToNextLevel : 0} Point ke
            level selanjutnya
          </h6>
        </div>
      </div>

      <div className="mt-6 bg-amber-100 rounded-full relative h-7 flex justify-between">
        <div
          className="rounded-full bg-gradient-to-r from-amber-300 to-amber-500 absolute top-0 left-0 h-full"
          style={{
            width: `${(currentXP / nextLevelXP) * 100}%`,
          }}
        ></div>
        <div className="rounded-full w-7 h-7 text-center relative font-semibold bg-amber-300 border-2 text-stone-500 border-amber-400">
          {level}
        </div>
        <p
          className={`absolute top-0 left-0 h-full w-full flex items-center justify-center font-semibold  ${
            (currentXP / nextLevelXP) * 100 <= 70
              ? "text-stone-400"
              : "text-stone-700"
          }`}
        >
          <FaRegStar className="mr-2" />
          <span className="text-stone-700">{currentXP}</span>/{nextLevelXP}
        </p>
        <div
          className={`rounded-full w-7 h-7 text-center relative font-semibold ${
            (currentXP / nextLevelXP) * 100 >= 95
              ? "bg-amber-500 text-stone-500"
              : "bg-amber-200"
          } `}
        >
          {level + 1}
        </div>
      </div>
    </div>
  );
}
