import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import userApi from "@/api/modules/users.api";
import { selectUser, setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { auth } from "@/api/config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import googleIcon from "../../public/google-icon.svg";
import microsoftIcon from "../../public/microsoft-icon.svg";
import facebookIcon from "../../public/facebook-icon.svg";
import tiktokIcon from "../../public/tiktok-icon.svg";
import Image from "next/image";
import { MdErrorOutline } from "react-icons/md";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector(selectUser);

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const icons = [googleIcon, microsoftIcon, facebookIcon, tiktokIcon];

  useEffect(() => {
    if (user) router.push("/dashboard");
  });

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email harus diisi"),
      password: Yup.string()
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Password harus diisi"),
    }),
    onSubmit: async (values) => {
      setIsLoginRequest(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { response, error } = await userApi.signIn({
          userUID: userCredential.user.uid,
        });
        if (response) {
          signInForm.resetForm();
          dispatch(setUser(response));
          toast.success(
            `Selamat datang kembali ${response.firstName} ${response.lastName}`
          );
          router.push("/dashboard");
        }
        if (error) setErrorMessage(error.message);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoginRequest(false);
      }
    },
  });

  return (
    <div className="min-h-[90vh] flex justify-center items-center px-1">
      <div className="bg-white pt-4 pb-7 px-5 rounded-lg w-full">
        <h3 className="text-2xl font-semibold mb-1">Masuk</h3>
        <h5 className="mb-5">
          Baru di Pemulink?{" "}
          <span className="text-blue-400">
            <Link href="/register">Buat akun sekarang</Link>
          </span>
        </h5>

        <div className="flex justify-between items-center gap-2">
          {icons.map((icon, i) => (
            <div
              key={i}
              className="border border-gray-500 py-4 px-6 rounded-lg"
            >
              <Image src={icon} alt="icon" />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 my-5">
          <div className="h-[1px] w-full bg-gray-300 mx-2"></div>
          <p className="text-gray-400">atau</p>
          <div className="h-[1px] w-full bg-gray-300 mx-2"></div>
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={signInForm.handleSubmit}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={signInForm.values.email}
            onChange={signInForm.handleChange}
            error={
              signInForm.touched.email && signInForm.errors.email !== undefined
            }
            helperText={signInForm.touched.email && signInForm.errors.email}
          />
          <Input
            name="password"
            placeholder="Kata Sandi"
            type="password"
            value={signInForm.values.password}
            onChange={signInForm.handleChange}
            error={
              signInForm.touched.password &&
              signInForm.errors.password !== undefined
            }
            helperText={
              signInForm.touched.password && signInForm.errors.password
            }
          />
          <Link href="/" className="mb-3 text-end">
            <p className="text-blue-600">Lupa kata sandi?</p>
          </Link>
          <LoadingButton loading={isLoginRequest}>Masuk</LoadingButton>
        </form>

        {errorMessage ? (
          <div className="alert alert-error mt-4">
            <MdErrorOutline />
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </div>

    // <form className="flex flex-col gap-4" onSubmit={signInForm.handleSubmit}>
    //   <Input
    //     label="Email"
    //     name="email"
    //     placeholder="john@gmail.com"
    //     type="email"
    //     value={signInForm.values.email}
    //     onChange={signInForm.handleChange}
    //     error={
    //       signInForm.touched.email && signInForm.errors.email !== undefined
    //     }
    //     helperText={signInForm.touched.email && signInForm.errors.email}
    //   />
    //   <Input
    //     label="Password"
    //     name="password"
    //     placeholder="********"
    //     type="password"
    //     value={signInForm.values.password}
    //     onChange={signInForm.handleChange}
    //     error={
    //       signInForm.touched.password &&
    //       signInForm.errors.password !== undefined
    //     }
    //     helperText={signInForm.touched.password && signInForm.errors.password}
    //   />

    //   <LoadingButton type="submit" loading={isLoginRequest}>
    //     Login
    //   </LoadingButton>

    //   {errorMessage ? (
    //     <div role="alert" className="alert alert-error">
    //       <span className="material-symbols-outlined">error</span>
    //       <span>{errorMessage}</span>
    //     </div>
    //   ) : null}
    // </form>
  );
}
