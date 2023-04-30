import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url, configOptions) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log("useFetch running", configOptions)
    axios
      .get(url, configOptions)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, [url]);

  const refetch = () => {
    console.log("refetch")
    setLoading(true);
    axios
      .get(url, configOptions)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(setLoading(false));
  };

  return { data, loading, error, refetch };
}
