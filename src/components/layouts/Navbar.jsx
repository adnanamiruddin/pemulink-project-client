import Image from "next/image";
import pemulinkLogo from "../../../public/pemulink-logo.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/features/userSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const dispatch = useDispatch();

  const { user } = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(setUser(null));
    toast.success("Bye bye");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost flex justify-start">
          <Image
            src={pemulinkLogo}
            alt="Pemulink Logo"
            width={120}
            height={40}
            priority
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <h3 className="text-white text-xl">{user.fullName}</h3>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/">Settings</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}