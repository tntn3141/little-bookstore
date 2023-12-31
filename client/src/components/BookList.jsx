import { useContext } from "react";
import { Link } from "react-router-dom";

import { Typography } from "./Typography";
import { ShopContext } from "../ShopContext";
import { getVNDPrice } from "../helpers/helpers";

export default function BookList(props) {
  const { items } = props;
  const { increaseItemQuantity } = useContext(ShopContext);
  return (
    <div
      className={
        "booklist grid grid-cols-2 grid-rows-product-layout " +
        "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2 md:p-4"
      }
    >
      {items.map((item) => {
        return (
          <div key={item._id} className="relative text-center h-[100%]">
            <div className="h-[100%]">
              <Link to={`/items/${item._id}`}>
                <img src={item.imgbb} alt="" className="h-[60%] mx-auto" />
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
              </Link>
              <button
                type="button"
                className="small-button"
                onClick={() => increaseItemQuantity(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
