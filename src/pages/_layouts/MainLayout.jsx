import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userApi from "@/api/modules/users.api";
import Navbar from "@/components/layouts/Navbar";
import { setUser } from "@/redux/features/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        theme="light"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      <Navbar />
      <div className="container px-4 py-6 text-black">{children}</div>
    </div>
  );
}
