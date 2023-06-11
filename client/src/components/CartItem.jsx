import React, { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { Link } from "react-router-dom";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";
import { MinusSVG, PlusSVG } from "../assets/svg";

export const CartItem = (props) => {
  const { removeItem, increaseItemQuantity, decreaseItemQuantity } =
    useContext(ShopContext);
  const { item } = props;

  return (
    <div
      key={item._id}
      className={
        "grid grid-cols-[90px_auto] md:gap-4 z-10 w-full" +
        "bg-white border border-slate-300"
      }
    >
      <div className="h-[120px] w-[90px] flex mx-auto">
        <Link to={`/items/${item._id}`}>
          <img
            src={item.coverImage}
            alt={`${item.title} cover`}
            className="h-[100%]"
          />
        </Link>
      </div>

      <div>
        <Typography variant="body" className="line-clamp-1">
          {item.title}
        </Typography>
        <Typography variant="md" className="text-red-600 font-bold">
          {getVNDPrice(item.price)}
        </Typography>
        <div className="flex my-2 gap-4">
          <div className="flex">
            <button
              disabled={item.quantity < 1}
              onClick={() => decreaseItemQuantity(item)}
              className="border border-black bg-slate-800 text-white"
            >
              <MinusSVG />
            </button>
            <span className="border-t border-b border-black px-4">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseItemQuantity(item)}
              className="border border-black bg-slate-800 text-white"
            >
              <PlusSVG />
            </button>
          </div>
          <span
            onClick={() => removeItem(item)}
            className="border border-black px-1 bg-slate-800 text-white cursor-pointer"
          >
            Remove
          </span>
        </div>
        Subtotal:{" "}
        <span className="text-red-600 font-bold">
          {getVNDPrice(item.price * item.quantity)}
        </span>
      </div>
    </div>
  );
};
