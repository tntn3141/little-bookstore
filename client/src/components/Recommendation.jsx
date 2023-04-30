import { Typography } from "./Typography";
import MultiCarousel from "./MultiCarousel";
import useFetch from "../hooks/useFetch";
import LoadingIcon from "./LoadingIcon";

// #1: This component should return a carousel of recommended items
// #2: IMPORTANT: This component should not be inside any div
// (direct parent or otherwise) that has "flex"/"grid" properties
// because react-multi-carousel will break
// Reference: https://github.com/YIZHUANG/react-multi-carousel/issues/59
// #3: Param "recommendation" should be either true (returns some items
// with highest average ratings) or some input for the recommendation
// algorithm (currently not implemented)

export default function Recommendation() {
  const { data, loading, error } = useFetch("/api/books", {
    params: { recommendation: true },
  });

  return !data ? (
    <LoadingIcon />
  ) : (
    <div >
      <Typography variant="xl">You might also like</Typography>
      <MultiCarousel items={data} />
    </div>
  );
}
