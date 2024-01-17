import { selectUser } from "@/redux/features/userSlice";
import Image from "next/image";
import { IoIosLink } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";
import { useSelector } from "react-redux";

export default function TeamDetail({ userTeam }) {
  const { user } = useSelector(selectUser);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 rounded-xl flex flex-col justify-between gap-2">
        <div className="flex justify-between">
          <h4 className="font-medium text-lg">Kode Kamu</h4>
          <div className="flex gap-2">
            <button className="border-2 border-gray-200 rounded-lg p-2">
              <IoIosLink className="text-xl text-gray-500" />
            </button>
            <button className="border-2 border-gray-200 rounded-lg p-2">
              <IoShareSocialOutline className="text-xl text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <TiContacts className="text-5xl" />
            <div>
              <h4 className="font-semibold">{userTeam.code}</h4>
              <p className="text-xs text-gray-400 mt-1">
                Bagikan kode ke temanmu
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-sm bg-blue-500 text-white border-0 rounded-xl w-28"
            onClick={() => {
              navigator.clipboard.writeText(userTeam.code);
              toast.success("Kode berhasil disalin");
            }}
          >
            Salin Kode
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl flex flex-col justify-between gap-4">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={userTeam.avatarURL}
            alt={userTeam.avatarName}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <h4 className="font-semibold mt-2">{userTeam.name}</h4>
        </div>
        {userTeam.teamMembers.map((member, i) => (
          <div key={i} className="flex justify-between items-center gap-4">
            <div className="w-1/6">
              <Image
                src={member.characterURL}
                alt={member.characterName}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <h4 className="font-bold">
              {member.firstName + " " + member.lastName}
            </h4>
            <p className="text-base">
              {member.userId === user.id
                ? "Anda"
                : member.role === "leader"
                ? "Ketua"
                : "Bergabung"}
            </p>
            <span
              className={`text-sm p-2 rounded-xl font-medium ${
                member.status === "accepted" ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {member.status === "accepted" ? "Diterima" : "Pilih Karakter"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
