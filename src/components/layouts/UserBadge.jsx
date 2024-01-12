import Image from "next/image";
import userBadgeIcon from "../../../public/user-badge-icon.svg";
import { RiNotification2Line } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";

export default function UserBadge({ user, level }) {
  console.log(user);
  return (
    <div className="bg-blue-500 p-5 rounded-xl text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Image src={userBadgeIcon} alt="User Badge Icon" />

          <div>
            <h3 className="font-semibold">
              {user.firstName + " " + user.lastName}
            </h3>
            <div className="flex justify-between mt-1">
              <h5 className="text-sm">Level {level}</h5>
              <h5 className="text-sm">Exp {user.xp}</h5>
            </div>
          </div>
        </div>

        <RiNotification2Line className="text-2xl" />
      </div>

      <div className="bg-blue-400 p-6 flex justify-between items-center mt-5 rounded-xl">
        <div>
          <h4 className="font-medium">Total Poin</h4>
          <h3 className="text-4xl font-semibold mt-1">{user.point}</h3>
        </div>

        <button className="font-medium p-2 rounded-xl bg-white text-blue-500 text-lg flex justify-between items-center gap-2 border-0 hover:bg-gray-200">
          <GoArrowUpRight /> <p>Tukar Poin</p>
        </button>
      </div>
    </div>
  );
}
