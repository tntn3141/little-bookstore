import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { CartItem } from "./CartItem";
import { getVNDPrice } from "../helpers/helpers";

export const Cart = ({ open }) => {
  console.log("cart", open);
  const { cartItems, closeCart, cartTotal } = useContext(ShopContext);
  console.log("a", cartItems);

  return (
    <>
      {open && (
        <div className="relative w-[90%] mx-auto">
          <h1>Cart</h1>
          {cartItems.map((item) => {
            return <CartItem key={item._id} item={item} />;
          })}
          <div className="py-4">
            Total:{" "}
            <span className="text-red-600 font-bold">
              {getVNDPrice(cartTotal)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
