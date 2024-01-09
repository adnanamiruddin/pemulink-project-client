import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import userApi from "@/api/modules/users.api";
import { setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const profileForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      fullName: "",
      age: 0,
      city: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      fullName: Yup.string().required("Full name is required"),
      age: Yup.number().required("Age is required"),
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      setIsOnRequest(true);
      const { response, error } = await userApi.updateProfile(values);
      setIsOnRequest(false);
      if (response) {
        profileForm.resetForm();
        dispatch(setUser(response));
        toast.success("Update profile success");
        router.push("/");
      }
      if (error) setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { response, error } = await userApi.getProfile();
      if (response) profileForm.setValues(response);
      if (error) setErrorMessage(error.message);
    };
    fetchUserProfile();
  }, []);

  return (
    <form className="flex flex-col gap-4" onSubmit={profileForm.handleSubmit}>
      <Input
        label="Email"
        name="email"
        placeholder="john@gmail.com"
        type="email"
        value={profileForm.values.email}
        onChange={profileForm.handleChange}
        error={
          profileForm.touched.email && profileForm.errors.email !== undefined
        }
        helperText={profileForm.touched.email && profileForm.errors.email}
        disabled
      />
      <Input
        label="Full Name"
        name="fullName"
        placeholder="John Doe"
        type="text"
        value={profileForm.values.fullName}
        onChange={profileForm.handleChange}
        error={
          profileForm.touched.fullName &&
          profileForm.errors.fullName !== undefined
        }
        helperText={profileForm.touched.fullName && profileForm.errors.fullName}
      />
      <Input
        label="Age"
        name="age"
        placeholder="18"
        type="number"
        value={profileForm.values.age}
        onChange={profileForm.handleChange}
        error={profileForm.touched.age && profileForm.errors.age !== undefined}
        helperText={profileForm.touched.age && profileForm.errors.age}
      />
      <Input
        label="City"
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
        label="Address"
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
        label="Phone Number"
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

      <LoadingButton type="submit" loading={isOnRequest}>
        Update Profile
      </LoadingButton>

      {errorMessage ? (
        <div role="alert" className="alert alert-error">
          <span className="material-symbols-outlined">error</span>
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </form>
  );
}
