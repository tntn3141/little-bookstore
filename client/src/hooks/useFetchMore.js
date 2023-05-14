import { useEffect, useState } from "react";
import axios from "axios";

// - Assuming all response data is in the form of an array
// - Instead of replacing previous data like useFetch,
// useFetchMore attaches the new response data to the end of the previous data

export default function useFetchMore(url, configOptions, condition) {
  const [dataMore, setDataMore] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMore, setErrorMore] = useState(null);

  useEffect(() => {
    setLoadingMore(true);
    axios
      .get(url, configOptions)
      .then((response) =>
        setDataMore((prev) => {
          if (Array.isArray(prev)) {
            return [...prev, ...response.data];
          } else {
            return response.data;
          }
        })
      )
      .catch((error) => setErrorMore(error))
      .finally(setLoadingMore(false));
  }, [url, condition]);

  const refetchMore = () => {
    setLoadingMore(true);
    axios
      .get(url, configOptions)
      .then((response) => setDataMore((prev) => [...prev, ...response.data]))
      .catch((error) => setErrorMore(error))
      .finally(setLoadingMore(false));
  };

  return { dataMore, loadingMore, errorMore, refetchMore };
}
