import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi2";

export default function DashboardNewAccInfo() {
  return (
    <div className="bg-red-400 text-white px-3 py-4 rounded-xl flex justify-between items-center gap-3">
      <div>
        <HiOutlineInformationCircle className="text-3xl" />
      </div>
      <h4 className="text-xs">
        Profil kamu belum lengkap. Tekan untuk melengkapi profil sekarang.
      </h4>
      <Link
        href="/dashboard/profile"
        className="btn btn-sm border-0 bg-gray-100 text-red-500 font-normal hover:bg-gray-300"
      >
        <button>Lengkapi Profil</button>
      </Link>
    </div>
  );
}
