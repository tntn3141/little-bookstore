import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  BookSolidSVG,
  MenuSVG,
  SearchSVG,
  UserSVG,
  ShoppingBagSVG,
  XSVG,
} from "../assets/svg";
import { UserContext } from "../UserContext";

export default function Header() {
  let [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  
  // To close submenu when changing route on mobile
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname])

  // To close submenu when clicking outside of it on mobile
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const links = [
    { name: "Trending", link: "/trending" },
    { name: "Best Sellers", link: "/best-sellers" },
    { name: "About Us", link: "about" },
  ];

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <header className="shadow-md w-full bg-white fixed top-0 z-10 m-0">
      <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        {/* Logo & menu icon */}

        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <span className="text-2xl font-[Poppins] cursor-pointer flex items-center">
              <BookSolidSVG />
              <span className="mx-1">lorem</span>
            </span>
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            {open ? <XSVG /> : <MenuSVG />}
          </div>
        </div>

        <ul
          ref={wrapperRef}
          className={`md:flex md:items-center md:pb-0 pb-12 mt-5 md:mt-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-15" : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-10">
              <Link
                to={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="md:hidden text-xl my-10">
            <Link to="/account" className="text-gray-800 hover:text-gray-400 duration-500">Account</Link>
          </li>
          <li className="md:hidden text-xl my-10">
            <Link className="text-gray-800 hover:text-gray-400 duration-500">Cart</Link>
          </li>
        </ul>

        <div>
          <span className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 text-3xl cursor-pointer mx-2 block flex ">
            <Link to={user ? "/account" : "/login"}>
              <UserSVG fill={!!user ? "currentColor" : "none"} />
            </Link>

            <ShoppingBagSVG />
          </span>
        </div>
      </nav>
    </header>
  );
}
