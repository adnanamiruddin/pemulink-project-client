import Image from "next/image";
import pemulinkLogo from "../../../public/pemulink-logo.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/features/userSlice";
import { toast } from "react-toastify";
import { auth } from "@/api/config/firebase.config";
import { IoEllipsisVertical } from "react-icons/io5";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
      toast.info("Bye bye 👋");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-end bg-white px-3 fixed z-50 w-full py-4 md:py-0 md:items-center">
        <div className="flex-1">
          <Link href="/">
            <Image
              src={pemulinkLogo}
              alt="Pemulink Logo"
              width={150}
              priority
            />
          </Link>
        </div>
        <div className="hidden md:flex gap-8 text-black">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`py-4 px-2 border-b-2 hover:border-blue-600 hover:text-blue-600 ${
                  router.asPath === "/dashboard"
                    ? "border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                Beranda
              </Link>
              <Link
                href="/dashboard/profile"
                className={`py-4 px-2 border-b-2 hover:border-blue-600 hover:text-blue-600 ${
                  router.asPath === "/dashboard/profile"
                    ? "border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                Profil
              </Link>
              <Link
                href="/dashboard/"
                className={`py-4 px-2 border-b-2 hover:border-blue-600 hover:text-blue-600 ${
                  router.asPath === "/dashboard/subscribe"
                    ? "border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                Berlangganan
              </Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`p-4 border-b-2 hover:border-blue-600 hover:text-blue-600 ${
                router.asPath === "/login" ? "border-blue-600 text-blue-600" : ""
              }`}
            >
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden">
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
              className="btn-ghost text-gray-500 font-medium text-lg px-4 py-2 rounded-xl hover:text-gray-900"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
