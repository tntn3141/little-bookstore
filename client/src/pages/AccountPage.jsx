import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";

import { UserContext } from "../UserContext";
import BookRegistrationForm from "../components/BookRegistrationForm";
import BookManager from "../components/BookManager";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

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
        <div className="text-center max-w-lg mx-auto">
          <div>
            {" "}
            <p>
              Logged in as {user.name}. Role:{" "}
              {(user.isAdmin && "Admin") || "User"}
            </p>
            <button
              onClick={handleLogOut}
              className="bg-slate-950 text-white max-w-xl"
            >
              Log out
            </button>
          </div>
        </div>
      )}
      {subpage === "dashboard" && user.isAdmin && <BookRegistrationForm />}
      {subpage === "wish-list" && <BookManager />}
    </div>
  );
}
