import { useState } from "react";

import BookList from "./BookList";
import SearchSidebar from "./SearchSidebar";
import useFetch from "../hooks/useFetch";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";

export default function BookManager() {
  const [skip, setSkip] = useState(0);
  const url = "/api/books/";
  const { data, loading, error } = useFetch(url, {
    params: { _skip: skip, _limit: 5 },
  });

  if (loading) {
    return <LoadingIcon />;
  }
  if (error) {
    return <Error error />;
  }
  if (data) {
    return (
      <div>
        <SearchSidebar />
        <BookList items={data} />
        {!loading && (
          <button className="font-bold m-4 p-2" onClick={() => setSkip(5)}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
