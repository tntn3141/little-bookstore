import { Link } from "react-router-dom";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";

export default function BookList(props) {
  const { items } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-4">
      {items.map((item) => {
        return (
          <div
            key={item._id}
            className="text-center h-[100%]"
          >
            <Link to={`/item/${item._id}`}>
              <div className="flex flex-col h-[100%] p-2">
                <img src={item.coverImage} alt="" className="h-[75%]" />
                <div>
                  <Typography variant="lg" className="line-clamp-1 font-normal sm:font-bold">
                    {item.title}
                  </Typography>
                  <Typography variant="author" className="line-clamp-1">{item.author}</Typography>
                  <Typography variant="lg" className="text-red-600 font-bold">
                    {getVNDPrice(item.price)}
                  </Typography>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
