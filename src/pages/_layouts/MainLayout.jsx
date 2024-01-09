import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userApi from "@/api/modules/users.api";
import Navbar from "@/components/common/layouts/Navbar";
import { setUser } from "@/redux/features/userSlice";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userApi.getProfile();
      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };
    authUser();
  }, [dispatch]);

  return (
    <div className={`min-h-screen bg-white`}>
      <Navbar />
      <div className="container mx-auto py-6 text-black">{children}</div>
    </div>
  );
}
