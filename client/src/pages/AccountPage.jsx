import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { UserContext } from "../UserContext";
import BookRegistrationForm from "./BookCreatePage";
import { useOutsideClick } from "../hooks/useOutsideClick";
import FormikControl from "../components/Formik/FormikControl";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const initialValues = {
    name: "",
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Required"),
  });

  // To close confirmation dialog when clicking outside of it
  const wrapperRef = useRef(null);
  useOutsideClick(() => {
    setConfirmDeletion(false);
  }, wrapperRef);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  async function handleLogOut() {
    await axios.post("/api/auth/logout");
    setRedirect("/");
    setUser(null);
  }

  async function handleChangePassword(values) {
    console.log("v")
    try {
      console.log("a");
      await axios.put(`/api/users/${user._id}`, values);
      alert("User info changed successfully.");
    } catch (error) {
      alert("User info change failed. Error: " + error);
    }
  }

  async function handleDeleteAccount(e) {
    e.preventDefault();
    await axios.delete(`/api/users/${user._id}`);
    setUser(null);
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-4";
    if (type === subpage) {
      classes += " bg-slate-950 text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-24">
      <nav className="w-full flex mt-12 justify-center gap-2">
        <Link to={"/account"} className={linkClasses("profile")}>
          Profile
        </Link>
        <Link to={"/account/dashboard"} className={linkClasses("dashboard")}>
          Dashboard
        </Link>
        <Link to={"/account/wish-list"} className={linkClasses("wish-list")}>
          Wish list
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto flex gap-4 p-4">
          <div>
            <img
              src="/assets/blank-profile.png"
              width="100"
              alt="profile picture"
            />
          </div>
          <div className="text-left w-full">
            <p>{user.name}</p>
            <p>Role: {(user.isAdmin && "Admin") || "User"}</p>
            <div className="flex gap-4">
              <button
                onClick={handleLogOut}
                className="bg-slate-950 text-white max-w-xl rounded p-1"
              >
                Log out
              </button>
              <button
                onClick={() => setChangePassword(true)}
                className="bg-slate-950 text-white max-w-xl rounded p-1"
              >
                Change password
              </button>
              {/* <button
                onClick={() => setConfirmDeletion(true)}
                className="bg-slate-950 text-white max-w-xl rounded p-1"
              >
                Delete account
              </button> */}
            </div>
          </div>
        </div>
      )}
      {subpage === "dashboard" && user.isAdmin && <BookRegistrationForm />}
      {subpage === "wish-list" && "a"}

      {/* <dialog open={confirmDeletion} ref={wrapperRef} className="bg-blue-400">
        <form className="flex flex-col gap-2">
          <p>This action is irreversible. Delete the account?</p>
          <div className="flex gap-4 mx-auto">
            <button
              className="text-white bg-black py-1 px-2 rounded"
              onClick={(e) => handleDeleteAccount(e)}
            >
              Yes
            </button>
            <button className="text-white bg-black py-1 px-2 rounded">
              No
            </button>
          </div>
        </form>
      </dialog> */}
      <dialog open={changePassword} className="bg-blue-400">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {(formik) => {
            return (
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  label="Name"
                  name="name"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="New password"
                  name="newPassword"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Confirm password"
                  name="confirmPassword"
                />
                <div className="flex gap-4">
                  <button type="submit" className="text-white bg-black p-1">
                    Confirm change
                  </button>
                  <button
                    type="button"
                    className="text-white bg-black p-1"
                    onClick={() => setChangePassword(false)}
                  >
                    Close
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </dialog>
    </div>
  );
}
