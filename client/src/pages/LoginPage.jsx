import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../UserContext";
import FormikControl from "../components/Formik/FormikControl";

export default function LoginPage() {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid").required("Required"),
    password: Yup.string().required("Required"),
  });

  async function handleLoginSubmit(values) {
    // Formik should call preventDefault by itself
    // If the code below isn't async, we need to add the second arg "actions" after "values"
    // in handleLoginSubmit and set actions.setSubmitting to false at the end
    try {
      const response = await axios.post("/api/auth/login", values);
      if (response.data) {
        console.log(response.data);
        setUser(response.data);
        alert("Login successful. Redirecting you to the main page...");
        setRedirect(true);
      }
    } catch (error) {
      alert("Login failed. " + error.response.data);
    }
  }

  // If the user logs in successfully, redirect them to the home page
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  // If the user is already logged in, redirect them to their account page instead
  if (user) {
    return <Navigate to={"/account"} />;
  }

  return (
    <div className="flex flex-col max-w-md mx-auto mt-36">
      <h1 className="mx-auto text-5xl">Hello</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        {(formik) => {
          return (
            <Form className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="justify-center flex">
                <Link
                  to={"/login"}
                  className="border-2 border-gray-800 p-3 uppercase"
                >
                  <span className="font-bold text-black">Log in</span>
                </Link>
                <Link
                  to={"/register"}
                  className="border-2 border-gray-950 p-3 uppercase"
                >
                  <span className="font-bold font-grey-700">Sign up</span>
                </Link>
              </div>

              <div className="relative">
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                />
              </div>
              <div className="relative">
                <FormikControl
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                />
              </div>
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
