import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Error from "./Error";
import LoadingIcon from "./LoadingIcon";
import useFetch from "../hooks/useFetch";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";

// #1: IMPORTANT: This component should not be inside a parent element
// that has "flex"/"grid" properties because react-multi-carousel will break
// - Reference: https://github.com/YIZHUANG/react-multi-carousel/issues/59
// #2: Param "recommendation" should be either true (returns items
// with highest average ratings) or some input for the recommendation
// algorithm (currently not implemented)

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
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

export default function Recommendation({ _id }) {
  const { data, loading, error } = useFetch("/api/books", {
    params: { recommendation: _id },
  });

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <Error />;
  }

  if (data) {
    return (
      <div className="my-4">
        <Typography variant="xl">You might also like</Typography>
        <Carousel
          responsive={responsive}
          infinite={true}
          minimumTouchDrag={10}
          itemClass="p-4 w-[60%]"
          containerClass="my-2"
        >
          {data.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-center h-[150px]"
            >
              <Link to={`/items/${item._id}`}>
                <div className="flex justify-center h-[120px]">
                  <img
                    src={item.imgbb}
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
      </div>
    );
  }
}
