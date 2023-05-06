import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Markup } from "interweave";

import useFetch from "../hooks/useFetch";
import Rating from "../components/Rating";
import LoadingIcon from "../components/LoadingIcon";
import { getVNDPrice } from "../helpers/helpers";
import { Typography } from "../components/Typography";
import { UserContext } from "../UserContext";
import { ShopContext } from "../ShopContext";
import Recommendation from "../components/Recommendation";
import BookInfo from "../components/BookInfo";

import Error from "../components/Error";

export default function ItemPage() {
  const { user } = useContext(UserContext);
  const { increaseItemQuantity } = useContext(ShopContext);
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/api/books/${itemId}`);

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <Error />;
  }

  if (data) {
    return (
      <div className="max-w-[90%] mx-auto mt-20">
        {user != null && user.isAdmin && (
          <button
            className={
              "bg-slate-800 text-white flex justify-center " +
              "p-2 font-bold text-lg w-[240px] mx-auto"
            }
            onClick={() => navigate("edit")}
          >
            Edit
          </button>
        )}

        <div className="md:grid md:grid-cols-[25%_75%]">
          <div className="mx-auto my-4 md:mx-0 justify-center justify-self-center mx-auto w-auto">
            <img src={data.coverImage} alt="Book cover" className="mx-auto" />
          </div>
          <div className="md:ml-4">
            <div className="my-2">
              <h1 className="font-bold text-2xl md:text-3xl">{data.title}</h1>
              <Typography variant="body" className="italic font-normal">
                {data.author}
              </Typography>
              <Rating
                user_id={user?._id || null}
                item_id={itemId}
                ratings={[data.ratingAllPoints, data.ratingAllTimes]}
                className="flex gap-2 items-center"
              />
              <Typography variant="2xl" className="text-red-600">
                {getVNDPrice(data.price)}
              </Typography>
              <p className="font-bold md:text-lg">In stock: {data.stock}</p>
            </div>

            <div
              className={
                "grid grid-cols-2 w-full md:w-[60%] gap-4 md:order-3 " +
                "font-bold text-center select-none md:text-lg justify-center md:justify-start"
              }
            >
              <button
                type="button"
                className={
                  "w-full p-2 rounded-xl border border-slate-800 " +
                  "bg-white hover:bg-slate-900 hover:text-white "
                }
                onClick={() => increaseItemQuantity(data)}
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
            <div className="my-4">
              <BookInfo data={data} />
            </div>
          </div>
        </div>

        <div className="my-4">
          <Markup
            tagName="p"
            content={data.description}
            className="text-justify"
          />
        </div>
        <div className="my-8">
          <Recommendation _id={itemId} />
        </div>
      </div>
    );
  }
}
