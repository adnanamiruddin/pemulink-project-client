import Image from "next/image";
import level1Icon from "../../../public/level-1-icon.svg";
import { useEffect, useState } from "react";

export default function UserLevel({ user }) {
  const [level, setLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [nextLevelXP, setNextLevelXP] = useState(4000);
  const [remainingXPToNextLevel, setRemainingXPToNextLevel] = useState(4000);

  useEffect(() => {
    if (user) {
      const userXP = user.xp;

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
    }
  }, [user]);

  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-4">
        <Image src={level1Icon} alt={`level ${level} icon`} />
        <div className="">
          <h4 className="font-bold text-xl">Level {level}</h4>
          <h6 className="text-gray-400 text-sm">
            {remainingXPToNextLevel >= 0 ? remainingXPToNextLevel : 0} Point ke
            level selanjutnya
          </h6>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-yellow-300 to-yellow-100 rounded-full relative h-7 flex justify-between">
        <div
          className="rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 absolute top-0 left-0 h-full"
          style={{
            width: `${(currentXP / nextLevelXP) * 100}%`,
          }}
        ></div>
        <div className="rounded-full border-2 border-yellow-600 w-7 h-7 text-center relative z-10 font-semibold">
          {level}
        </div>
        <p className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-stone-700 font-semibold">
          {currentXP} / {nextLevelXP}
        </p>
        <div className="rounded-full border-2 border-yellow-600 w-7 h-7 text-center relative z-10 font-semibold">
          {level + 1}
        </div>
      </div>
    </div>
  );
}
