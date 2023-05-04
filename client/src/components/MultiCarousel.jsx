import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";
import { Link } from "react-router-dom";

function MultiCarousel(props) {
  const { items } = props;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    smalltablet: {
      breakpoint: { max: 768, min: 640 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      minimumTouchDrag={10}
      itemClass="p-4 w-[60%]"
    >
      {items.map((item) => (
        <div key={item._id} className="flex flex-col justify-center h-[150px]">
          <Link to={`/items/${item._id}`}>
            <div className="flex justify-center h-[100px]">
              <img
                src={item.coverImage}
                alt="picture"
                className="object-contain"
              />
            </div>
            <div className="mx-auto w-[80%] text-center">
              <Typography variant="body" className="truncate">
                {item.title}
              </Typography>
              <Typography variant="lg" className="text-red-600 ">
                {getVNDPrice(item.price)}
              </Typography>
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}

export default MultiCarousel;
