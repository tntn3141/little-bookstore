import { Link } from "react-router-dom";
import { BookSolidSVG } from "../assets/svg";
import email from "../assets/images/email.png";
import github24 from "../assets/images/github24.png";
import phone from "../assets/images/phone.png";
import { Typography } from "./Typography";

export default function Footer() {
  return (
    <footer className="bg-black text-white flex justify-between p-5 footer">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <img src={phone} alt="" />
          <Typography variant="md">+84 778 34 9944</Typography>
        </div>
        <div className="flex gap-2">
          <img src={email} alt="" />
          <Typography variant="md">tntn3141@gmail.com</Typography>
        </div>
        <div>
          <a href="https://github.com/tntn3141" className="flex gap-2">
            <img src={github24} alt="" />
            <Typography variant="md" className="hover:underline-offset-1 hover:underline">https://github.com/tntn3141</Typography>
          </a>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <Link to={"/"}>
          <span className="text-2xl font-[Poppins] cursor-pointer flex items-center">
            <BookSolidSVG />
            <span className="mx-1">lorem</span>
          </span>
        </Link>
      </div>
    </footer>
  );
}
