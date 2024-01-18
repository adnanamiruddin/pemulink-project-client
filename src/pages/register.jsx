import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import { selectUser, setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/config/firebase.config";
import userApi from "@/api/modules/users.api";
import Link from "next/link";
import googleIcon from "../../public/google-icon.svg";
import microsoftIcon from "../../public/microsoft-icon.svg";
import facebookIcon from "../../public/facebook-icon.svg";
import tiktokIcon from "../../public/tiktok-icon.svg";
import Image from "next/image";
import { MdErrorOutline } from "react-icons/md";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector(selectUser);

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const icons = [googleIcon, microsoftIcon, facebookIcon, tiktokIcon];

  useEffect(() => {
    if (user) router.push("/dashboard");
  });

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email harus diisi"),
      firstName: Yup.string().required("Nama depan harus diisi"),
      lastName: Yup.string().required("Nama belakang harus diisi"),
      password: Yup.string()
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Password harus diisi"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password tidak cocok")
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Konfirmasi password harus diisi"),
    }),
    onSubmit: async (values) => {
      if (isOnRequest) return;
      setIsOnRequest(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { response, error } = await userApi.signUp({
          userUID: userCredential.user.uid,
          firstName: values.firstName,
          lastName: values.lastName,
        });
        if (response) {
          signUpForm.resetForm();
          dispatch(setUser(response));
          toast.success(`Selamat datang ${values.firstName}`);
          router.push("/dashboard");
        }
        if (error) setErrorMessage(error.message);
      } catch (error) {
        setErrorMessage("Pendaftaran gagal. Silahkan coba lagi");
      } finally {
        setIsOnRequest(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center px-1">
      <div className="bg-white pt-4 pb-7 px-5 rounded-lg w-full">
        <h3 className="text-2xl font-semibold mb-1">Buat Akun</h3>
        <h5 className="mb-5">
          Sudah punya akun?{" "}
          <span className="text-blue-400">
            <Link href="/login">Masuk</Link>
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
          onSubmit={signUpForm.handleSubmit}
        >
          <div className="flex gap-2">
            <Input
              name="firstName"
              placeholder="Nama Depan"
              type="text"
              value={signUpForm.values.firstName}
              onChange={signUpForm.handleChange}
              error={
                signUpForm.touched.firstName &&
                signUpForm.errors.firstName !== undefined
              }
              helperText={
                signUpForm.touched.firstName && signUpForm.errors.firstName
              }
            />
            <Input
              name="lastName"
              placeholder="Nama Belakang"
              type="text"
              value={signUpForm.values.lastName}
              onChange={signUpForm.handleChange}
              error={
                signUpForm.touched.lastName &&
                signUpForm.errors.lastName !== undefined
              }
              helperText={
                signUpForm.touched.lastName && signUpForm.errors.lastName
              }
            />
          </div>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={signUpForm.values.email}
            onChange={signUpForm.handleChange}
            error={
              signUpForm.touched.email && signUpForm.errors.email !== undefined
            }
            helperText={signUpForm.touched.email && signUpForm.errors.email}
          />
          <Input
            name="password"
            placeholder="Kata Sandi"
            type="password"
            value={signUpForm.values.password}
            onChange={signUpForm.handleChange}
            error={
              signUpForm.touched.password &&
              signUpForm.errors.password !== undefined
            }
            helperText={
              signUpForm.touched.password && signUpForm.errors.password
            }
          />
          <Input
            name="confirmPassword"
            placeholder="Konfirmasi Kata Sandi"
            type="password"
            value={signUpForm.values.confirmPassword}
            onChange={signUpForm.handleChange}
            error={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword !== undefined
            }
            helperText={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword
            }
          />
          <div></div>
          <LoadingButton loading={isOnRequest}>Buat Akun</LoadingButton>
          <p className="text-justify text-xs text-gray-400">
            Dengan melanjutkan, Anda menyetujui{" "}
            <span className="text-blue-500">
              Syarat Layanan dan Privasi Kebijakan
            </span>{" "}
            Pemulink
          </p>
        </form>

        {errorMessage ? (
          <div className="alert alert-error mt-4 text-white text-sm">
            <MdErrorOutline className="text-3xl" />
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
