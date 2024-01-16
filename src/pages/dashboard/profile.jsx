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
import { getAuth } from "firebase/auth";
import Image from "next/image";
import level1Icon from "../../../public/level-1-icon.svg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector(selectUser);

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const profileForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      city: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Nama depan harus diisi"),
      lastName: Yup.string().required("Nama belakang harus diisi"),
      age: Yup.number().required("Umur harus diisi"),
      city: Yup.string().required("Kota harus diisi"),
      address: Yup.string().required("Alamat harus diisi"),
      phoneNumber: Yup.string().required("Nomor telepon (WA) harus diisi"),
    }),
    onSubmit: async (values) => {
      setIsOnRequest(true);
      const { response, error } = await userApi.updateProfile(values);
      setIsOnRequest(false);
      if (response) {
        profileForm.resetForm();
        dispatch(setUser(response));
        toast.success("Profil berhasil diperbarui");
        router.push("/dashboard");
      }
      if (error) setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) profileForm.setValues(user);

      // const { response, error } = await userApi.getProfile();
      // if (response) profileForm.setValues(response);
      // if (error) setErrorMessage(error.message);
      // const auth = getAuth();
      // if (auth.currentUser) {
      //   profileForm.setFieldValue("email", auth.currentUser.email);
      // }
    };
    fetchUserProfile();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <AiOutlineArrowLeft className="text-xl" />
        </Link>
        <h1 className="text-xl font-semibold">Lengkapi Profil</h1>
      </div>

      <form
        className="flex flex-col gap-3 items-center mt-12"
        onSubmit={profileForm.handleSubmit}
      >
        <Image src={level1Icon} alt="Level 1 Icon" className="w-20 mb-4" />

        <div className="flex gap-2">
          <Input
            label="Nama Depan"
            name="firstName"
            placeholder="Nama Depan"
            type="text"
            value={profileForm.values.firstName}
            onChange={profileForm.handleChange}
            error={
              profileForm.touched.firstName &&
              profileForm.errors.firstName !== undefined
            }
            helperText={
              profileForm.touched.firstName && profileForm.errors.firstName
            }
          />
          <Input
            label="Nama Belakang"
            name="lastName"
            placeholder="Nama Belakang"
            type="text"
            value={profileForm.values.lastName}
            onChange={profileForm.handleChange}
            error={
              profileForm.touched.lastName &&
              profileForm.errors.lastName !== undefined
            }
            helperText={
              profileForm.touched.lastName && profileForm.errors.lastName
            }
          />
        </div>

        <Input
          label="Umur"
          name="age"
          placeholder="18"
          type="number"
          value={profileForm.values.age}
          onChange={profileForm.handleChange}
          error={
            profileForm.touched.age && profileForm.errors.age !== undefined
          }
          helperText={profileForm.touched.age && profileForm.errors.age}
        />
        <Input
          label="Asal Kota"
          name="city"
          placeholder="Makassar"
          type="text"
          value={profileForm.values.city}
          onChange={profileForm.handleChange}
          error={
            profileForm.touched.city && profileForm.errors.city !== undefined
          }
          helperText={profileForm.touched.city && profileForm.errors.city}
        />
        <Input
          label="Alamat"
          name="address"
          placeholder="Jl. Jendral Sudirman No. 1"
          type="text"
          value={profileForm.values.address}
          onChange={profileForm.handleChange}
          error={
            profileForm.touched.address &&
            profileForm.errors.address !== undefined
          }
          helperText={profileForm.touched.address && profileForm.errors.address}
        />
        <Input
          label="Nomor (WA)"
          name="phoneNumber"
          placeholder="08123456789"
          type="text"
          value={profileForm.values.phoneNumber}
          onChange={profileForm.handleChange}
          error={
            profileForm.touched.phoneNumber &&
            profileForm.errors.phoneNumber !== undefined
          }
          helperText={
            profileForm.touched.phoneNumber && profileForm.errors.phoneNumber
          }
        />

        <div className="w-full mt-4">
          <LoadingButton loading={isOnRequest}>Simpan</LoadingButton>
        </div>

        {errorMessage ? (
          <div role="alert" className="alert alert-error">
            <span className="material-symbols-outlined">error</span>
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </form>
    </div>
  );
}
