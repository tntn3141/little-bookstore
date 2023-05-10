import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url, configOptions, condition) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, configOptions)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, [url, condition]);

  const refetch = () => {
    console.log("refetching...");
    setLoading(true);
    axios
      .get(url, configOptions)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(setLoading(false));
  };

  return { data, loading, error, refetch };
}
