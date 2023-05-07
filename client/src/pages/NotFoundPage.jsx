import { Link } from "react-router-dom";
import { Typography } from "../components/Typography";
import tornbook from "../assets/images/tornbook.png";

export default function NotFoundPage() {
  return (
    <div className="flex w-[90%] mx-auto">
      <div className="mx-auto mt-[112px] flex flex-col text-center gap-8">
        <img src={tornbook} alt="" width="50%" className="mx-auto" />
        <h1>
          <Typography variant="3xl">404 Not Found</Typography>
        </h1>
        <div>
          <p className="wrap">We couldn't find what you were looking for.</p>
          <p>
            Return to the{" "}
            <Link to={"/"} className="font-bold hover:underline">
              home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
