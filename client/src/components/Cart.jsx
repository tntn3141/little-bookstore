import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { CartItem } from "./CartItem";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";

export const Cart = ({ open }) => {
  const { cartItems, cartTotal } = useContext(ShopContext);

  return (
    <>
      {open && (
        <div className="absolute z-10 w-full mx-auto bg-white p-5 pt-0">
          <Typography variant="h2" className="font-bold text-center mb-2">Cart</Typography>
          {cartItems.map((item) => {
            return <CartItem key={item._id} item={item} />;
          })}
          <div className="py-4">
            Total:{" "}
            <span className="text-red-600 font-bold">
              {getVNDPrice(cartTotal)}
            </span>
            <div className="grid grid-cols-2 my-4">
              <button
                type="button"
                className="border border-black px-1 bg-slate-800 text-white rounded-xl w-[95%] py-2"
                onClick={() => {}}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="border border-black px-1 bg-slate-800 text-white rounded-xl w-[95%] py-2"
                onClick={() => {}}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
