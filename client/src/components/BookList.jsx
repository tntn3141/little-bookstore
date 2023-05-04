import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Typography } from "./Typography";
import { ShopContext } from "../ShopContext";
import { getVNDPrice } from "../helpers/helpers";
import { PlusSVG, ShoppingBagSVG } from "../assets/svg";
import addtocart from "../assets/images/addtocart.png";

export default function BookList(props) {
  const { items } = props;
  const [hover, setHover] = useState(false);
  const { increaseItemQuantity } = useContext(ShopContext)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-4">
      {items.map((item) => {
        return (
          <div key={item._id} className="relative text-center h-[90%]">
            <Link to={`/items/${item._id}`}>
              <div className="h-[100%] m-1">
                <img src={item.coverImage} alt="" className="h-[75%] mx-auto" />
                <div className="text-center">
                  <Typography
                    variant="lg"
                    className="line-clamp-1 font-normal sm:font-bold"
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="author" className="line-clamp-1">
                    {item.author}
                  </Typography>
                  <Typography variant="lg" className="text-red-600 font-bold">
                    {getVNDPrice(item.price)}
                  </Typography>
                </div>
              </div>
            </Link>
            <button type="button" className={"bg-slate-800 text-white w-full p-1 " + 
            "border-2 border-black hover:bg-white hover:text-slate-900 absolute left-0"}
            onClick={() => increaseItemQuantity(item)}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}
