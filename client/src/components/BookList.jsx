import { Link } from "react-router-dom";
import { Typography } from "./Typography";

export default function BookList(props) {
  const { items } = props;
  const vndPrice = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => {
        return (
          <div
            key={item._id}
            className="flex flex-col items-center mx-auto border p-4 text-center"
          >
            <Link to={`/item/${item._id}`}>
              <img src={item.coverImage} alt="" width="100" className="mx-auto"/>
              <div>
                <Typography variant="title" className="line-clamp-2">{item.title}</Typography>
                <Typography variant="author">{item.author}</Typography>
                <p className="font-bold">{vndPrice(item.price)}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
