import { Link } from "react-router-dom";

export default function BookList(props) {
  const { items } = props;
  const vndPrice = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  console.log(items)

  return (
    <div className="flex flex-wrap">
      {items.map((item) => {
        return (
          <div
            key={item._id}
            className="flex flex-col m-4 gap-4 border border-red-500 items-center mx-auto "
          >
            <Link to={`/item/${item._id}`}>
              <img src={item.coverImage} alt="" width="100" className="mx-auto"/>
              <div>
                <p className="text-xl font-bold">{item.title}</p>
                <p className="italic">{item.author}</p>
                <p className="font-bold">{vndPrice(item.price)}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
