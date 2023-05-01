import axios from "axios";
import { useEffect, useState } from "react";
import { StarSVG } from "../assets/svg";
import { Typography } from "./Typography";

export default function Rating(props) {
  const { user_id, item_id, ratings, className } = props;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (ratings[1] !== 0) {
      let result = (ratings[0] * 1.0) / ratings[1];
      setRating(result.toFixed(2));
    } else {
      setRating(0);
    }
  }, []);

  async function handleRating(value) {
    if (!user_id) {
      alert("Please log in to do this action");
    } else {
      try {
        setRating(value);
        const response = await axios.post("/api/rating/", {
          user_id: user_id,
          item_id: item_id,
          value: value,
        });
        setRating(response.data.value);
      } catch (error) {
        alert("Rating failed. " + error);
      }
    }
  }

  return (
    <div className={"flex " + className ? className : ""}>
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "text-yellow-500" : ""}
              onClick={() => handleRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <div className="mt-1">
                <StarSVG />
              </div>
            </button>
          );
        })}
      </div>
      <Typography variant="xl" className="my-auto">
        {rating}
      </Typography>
      <Typography variant="body-small" className="italic">
        ({ratings[1]} {ratings[1] === 1 ? "rating" : "ratings"})
      </Typography>
    </div>
  );
}
