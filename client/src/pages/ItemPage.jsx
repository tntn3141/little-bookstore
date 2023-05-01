import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Interweave } from "interweave";
  
import useFetch from "../hooks/useFetch";
import Rating from "../components/Rating";
import LoadingIcon from "../components/LoadingIcon";
import { getVNDPrice } from "../helpers/helpers";
import { Typography } from "../components/Typography";
import { UserContext } from "../UserContext";

import {
  BookSVG,
  PageSVG,
  CalendarSVG,
  TagSVG,
  BuildingSVG,
  LanguageSVG,
  ShoppingBagSVG,
} from "../assets/svg";
import Recommendation from "../components/Recommendation";

export default function ItemPage() {
  const { user } = useContext(UserContext);
  let { itemId } = useParams();
  const {data, loading, error} = useFetch(`/api/books/${itemId}`)

  return !data ? (
    <div className="flex items-center justify-center h-full">
      <LoadingIcon />
    </div>
  ) : (
    <div className="max-w-[90%] mx-auto mt-24">
      <div className="grid grid-row-5 gap-4">
        <div className="grid md:grid-cols-[25%_75%]">
          <div className="mx-auto my-4 md:mx-0 justify-center justify-self-center mx-auto ">
            <img
              src={data.coverImage}
              alt="Book cover"
              className="w-auto mx-auto"
            />
          </div>
          <div className="flex flex-col flex-wrap gap-4 md:ml-4">
            <div className="my-2 w-full h-fit">
              <Typography variant="h1">{data.title}</Typography>
              <Typography variant="2xl" className="italic font-normal">
                {data.author}
              </Typography>
              <Rating
                user_id={user?._id || null}
                item_id={itemId}
                ratings={[data.ratingAllPoints, data.ratingAllTimes]}
                className="flex gap-2 items-center"
              />
              <Typography variant="3xl" className="text-red-600">
                {getVNDPrice(data.price)}
              </Typography>
              <p className="font-bold md:text-lg">In stock: {data.stock}</p>
            </div>

            <div className="md:order-3">Carousel here</div>

            <div className="grid grid-cols-2 w-full md:w-[60%] gap-4 md:order-2 font-bold text-center select-none md:text-lg justify-center md:justify-start">
              <button
                type="button"
                className={
                  "w-full p-2 rounded-xl border border-slate-800 " +
                  "bg-white hover:bg-slate-900 hover:text-white "
                }
                onClick={() => console.log("Cart")}
              >
                <Typography variant="lg">Add to Cart</Typography>
              </button>
              <button
                type="button"
                className={
                  "w-full p-2 md:min-h-[12%] rounded-xl border border-slate-800 " +
                  "bg-white hover:bg-slate-900 hover:text-white "
                }
                onClick={() => console.log("Buy")}
              >
                <Typography variant="lg">Buy</Typography>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-4">
          <Interweave tagname="p" content={data.description} />
        </div>
        <div className="my-4">
          <Recommendation />
        </div>
      </div>
    </div>
  );
}
