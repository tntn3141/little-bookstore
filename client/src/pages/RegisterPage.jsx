import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { Link, Navigate } from "react-router-dom";

import { UserContext } from "../UserContext";
import FormikControl from "../components/FormikControl";

export default function Register() {
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });
  const handleRegisterSubmit = async (values) => {
    try {
      await axios.post("/api/auth/register", values);
      alert("Registration successful.");
      setRedirect(true);
    } catch (error) {
      alert("Registration failed. Error: " + error);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  // If the user is already logged in, redirect them to their account page instead
  if (user) {
    return <Navigate to={"/account"} />;
  }

  return (
    <div className="flex flex-col mt-20 max-w-md mx-auto">
      <h1 className="mx-auto text-5xl">Hello</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegisterSubmit}
      >
        {(formik) => {
          return (
            <Form className="mx-auto mt-8">
              <div className="justify-center flex">
                <Link
                  to={"/login"}
                  className="border-2 border-gray-950 p-3 uppercase"
                >
                  <span className="font-grey-700">Log in</span>
                </Link>
                <Link
                  to={"/register"}
                  className="border-2 border-gray-950 p-3 uppercase"
                >
                  <span className="font-bold">Sign up</span>
                </Link>
              </div>

              <FormikControl
                control="input"
                type="text"
                label="Name"
                name="name"
              />
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
              />
              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
              />
              <FormikControl
                control="input"
                type="password"
                label="Confirm password"
                name="confirmPassword"
              />
              <button
                type="submit"
                disabled={!formik.isValid}
                className="uppercase w-full mt-5 p-4 bg-gray-900 font-bold text-white"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
