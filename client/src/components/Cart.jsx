import { useContext, useState, useRef, useEffect } from "react";
import { ShopContext } from "../ShopContext";
import { CartItem } from "./CartItem";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";
import { useOutsideClick } from "../hooks/useOutsideClick";

export const Cart = () => {
  const { cartItems, cartTotal } = useContext(ShopContext);

  const cartWrapperRef = useRef(null);
  useOutsideClick(() => setIsOpen(false), cartWrapperRef);

  return (
    <div ref={cartWrapperRef}>
      <div
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
    </div>
  );
};
