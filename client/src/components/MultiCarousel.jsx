import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";

function MultiCarousel(props) {
  const { items } = props;
  console.log(items);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <Carousel responsive={responsive} itemClass="p-4 w-[60%]">
      {items.map((item) => (
        <div key={item._id} className="flex flex-col justify-center h-[150px]">
          <div className="flex justify-center h-[100px]">
            <img
              src={item.coverImage}
              alt="picture"
              className="object-contain"
            />
          </div>
          <div className="mx-auto w-[80%] text-center">
            <Typography variant="body" className="truncate">{item.title}</Typography>
            <Typography variant="lg" className="text-red-600 ">{getVNDPrice(item.price)}</Typography>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default MultiCarousel;
