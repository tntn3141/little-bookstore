import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../ShopContext";
import { CartItem } from "./CartItem";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";

import {
  BookSolidSVG,
  MenuSVG,
  UserSVG,
  ShoppingBagSVG,
  XSVG,
} from "../assets/svg";
import { UserContext } from "../UserContext";
import { ShopContext } from "../ShopContext";
import { Cart } from "./Cart";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { cartQuantity } = useContext(ShopContext);

  // To close submenu/cart when changing route on mobile
  const { pathname } = useLocation();
  useEffect(() => {
    setMenuOpen(false);
    setCartOpen(false);
  }, [pathname]);

  // To close submenu when clicking outside of it on mobile
  const wrapperRef = useRef(null);
  const cartWrapperRef = useRef(null);
  useOutsideAlerter(() => setMenuOpen(false), wrapperRef);
  useOutsideAlerter(() => setCartOpen(false), cartWrapperRef);

  function useOutsideAlerter(callback, ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
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

  const links = [
    { name: "New Arrivals", link: "/new" },
    { name: "Best Sellers", link: "/best-sellers" },
    { name: "Offers", link: "/offers" },
    { name: "About Us", link: "/about" },
  ];

  return (
    <header className="shadow-md w-full bg-white fixed top-0 z-10 m-0">
      <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <Link to={"/"} aria-label="to index page">
            <span className="text-2xl font-[Poppins] cursor-pointer flex items-center">
              <BookSolidSVG />
              <span className="mx-1">lorem</span>
            </span>
          </Link>
          <div className="text-3xl absolute right-16 top-6 cursor-pointer md:hidden">
            <ShoppingBagSVG onClick={() => setCartOpen(!cartOpen)} />
          </div>
          <div
            className={
              "text-white text-[0.75rem] bg-red-600 rounded-full justify-center items-center text-center " +
              "w-4 h-4 flex relative right-10 top-2 select-none md:hidden"
            }
          >
            {cartQuantity}
          </div>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl absolute right-4 top-6 cursor-pointer md:hidden"
          >
            {menuOpen ? <XSVG /> : <MenuSVG />}
          </div>
        </div>

        <ul
          ref={wrapperRef}
          className={`md:flex md:items-center md:pb-0 pb-6 pt-2 md:pt-0 mt-5 md:mt-0 
          absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 
          transition-all duration-500 ease-in ${
            menuOpen ? "top-15" : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-10">
              <Link
                to={link.link}
                aria-label={`to ${link} page`}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="md:hidden text-xl my-10">
            <Link
              to="/account"
              aria-label="to account page"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              Account
            </Link>
          </li>
        </ul>

        <div
          className={
            "md:flex md:items-center z-[-1] md:z-auto md:static absolute flex gap-4 " +
            "bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 " +
            "top-[-400px] transition-all ease-in duration-500 text-3xl cursor-pointer mx-2 block flex"
          }
        >
          <Link
            to={user ? "/account" : "/login"}
            aria-label={user ? "to account page" : "to login page"}
          >
            <UserSVG fill={!!user ? "currentColor" : "none"} />
          </Link>
          <div
            onClick={() => setCartOpen(!cartOpen)}
            className="grid grid-cols-[100%_0]"
          >
            <ShoppingBagSVG />
            <div
              className={
                "text-white text-[0.75rem] bg-red-600 rounded-full justify-center items-center text-center " +
                "w-4 h-4 flex relative right-3 top-3 select-none"
              }
            >
              {cartQuantity}
            </div>
          </div>
        </div>
      </nav>
      {cartOpen && (
        <div
          ref={cartWrapperRef}
          className={
            "absolute right-0 z-10 w-full md:w-[70%] lg:w-[50%] " +
            "bg-white p-5 pt-0 overflow-y-auto max-h-[90vh]"
          }
        >
          <Typography variant="h2" className="font-bold text-center mb-2">
            Cart
          </Typography>
          {cartItems.map((item) => {
            return <CartItem key={item._id} item={item} />;
          })}
          <div className="py-4">
            Total:{" "}
            <span className="text-red-600 font-bold text-2xl">
              {getVNDPrice(cartTotal)}
            </span>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 mt-4">
              <button
                type="button"
                className={
                  "border border-black px-1 bg-slate-800 " +
                  "text-white rounded-xl w-[95%] py-2 mx-auto"
                }
                onClick={() => {}}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className={
                  "border border-black px-1 bg-slate-800 " +
                  "text-white rounded-xl w-[95%] py-2 mx-auto"
                }
                onClick={() => {}}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
