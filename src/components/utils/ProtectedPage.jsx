import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";

const ProtectedPage = ({ children }) => {
  const router = useRouter();

  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedPage;
