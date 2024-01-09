import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/functions/Input";
import LoadingButton from "@/components/common/functions/LoadingButton";
import userApi from "@/api/modules/users.api";
import { setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters for password")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoginRequest(true);
      const { response, error } = await userApi.signIn(values);
      setIsLoginRequest(false);

      if (response) {
        signUpForm.resetForm();
        dispatch(setUser(response));
        router.push("/");
      }

      if (error) setErrorMessage(error.message);
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

      <LoadingButton type="submit" loading={isLoginRequest}>
        Login
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
