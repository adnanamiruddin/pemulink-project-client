import Image from "next/image";
import pemulinkLogo from "../../../public/pemulink-logo.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/features/userSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { auth } from "@/api/config/firebase.config";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
      toast.info("Bye bye 👋");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar bg-white px-4 fixed z-50">
      <div className="flex-1">
        <Link href="/">
          <Image src={pemulinkLogo} alt="Pemulink Logo" width={150} priority />
        </Link>
      </div>

      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <IoEllipsisVertical className="text-black text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-gray-50 text-black rounded-box w-52 gap-1 border border-gray-400"
            >
              <li>
                <Link href="/dashboard">Beranda</Link>
              </li>
              <li>
                <Link href="/dashboard/profile">Profil</Link>
              </li>
              <li>
                <Link href="/dashboard/">Berlangganan</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/login"
            className="btn-ghost text-gray-500 font-medium text-lg px-4 py-2 rounded-xl hover:text-gray-700"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
