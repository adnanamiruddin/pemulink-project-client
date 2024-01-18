import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userApi from "@/api/modules/users.api";
import Navbar from "@/components/layouts/Navbar";
import { setUser } from "@/redux/features/userSlice";
import { ToastContainer } from "react-toastify";
import GlobalLoading from "@/components/layouts/GlobalLoading";

import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/layouts/Footer";

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
    <>
      {/* Global Loading START */}
      <GlobalLoading />
      {/* Global Loading END */}

      {/* Config React Toastify START */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        theme="light"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        limit={1}
      />
      {/* Config React Toastify END */}

      <Navbar />
      <div className="bg-gray-300 flex justify-center">
        <div className="p-6 pt-20 text-black bg-blue-50 min-h-screen max-w-sm">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
