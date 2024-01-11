import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import { setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/config/firebase.config";
import userApi from "@/api/modules/users.api";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      fullName: Yup.string().required("Full name is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters for password")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .min(8, "Minimum 8 characters for password")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoginRequest(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { response, error } = await userApi.signUp({
          userUID: userCredential.user.uid,
          fullName: values.fullName,
        });
        if (response) {
          signUpForm.resetForm();
          dispatch(setUser(response));
          toast.success("Register success");
          router.push("/");
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
    <form className="flex flex-col gap-4" onSubmit={signUpForm.handleSubmit}>
      <Input
        label="Email"
        name="email"
        placeholder="john@gmail.com"
        type="email"
        value={signUpForm.values.email}
        onChange={signUpForm.handleChange}
        error={
          signUpForm.touched.email && signUpForm.errors.email !== undefined
        }
        helperText={signUpForm.touched.email && signUpForm.errors.email}
      />
      <Input
        label="Full Name"
        name="fullName"
        placeholder="John Doe"
        type="text"
        value={signUpForm.values.fullName}
        onChange={signUpForm.handleChange}
        error={
          signUpForm.touched.fullName &&
          signUpForm.errors.fullName !== undefined
        }
        helperText={signUpForm.touched.fullName && signUpForm.errors.fullName}
      />
      <Input
        label="Password"
        name="password"
        placeholder="********"
        type="password"
        value={signUpForm.values.password}
        onChange={signUpForm.handleChange}
        error={
          signUpForm.touched.password &&
          signUpForm.errors.password !== undefined
        }
        helperText={signUpForm.touched.password && signUpForm.errors.password}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        placeholder="********"
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

      <LoadingButton type="submit" loading={isLoginRequest}>
        Regist
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
