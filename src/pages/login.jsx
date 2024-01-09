import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import userApi from "@/api/modules/users.api";
import { setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const signInForm = useFormik({
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
        signInForm.resetForm();
        dispatch(setUser(response));
        toast.success("Login success");
        router.push("/");
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={signInForm.handleSubmit}>
      <Input
        label="Email"
        name="email"
        placeholder="john@gmail.com"
        type="email"
        value={signInForm.values.email}
        onChange={signInForm.handleChange}
        error={
          signInForm.touched.email && signInForm.errors.email !== undefined
        }
        helperText={signInForm.touched.email && signInForm.errors.email}
      />
      <Input
        label="Password"
        name="password"
        placeholder="********"
        type="password"
        value={signInForm.values.password}
        onChange={signInForm.handleChange}
        error={
          signInForm.touched.password &&
          signInForm.errors.password !== undefined
        }
        helperText={signInForm.touched.password && signInForm.errors.password}
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
