import { useEffect, useState, useRef } from "react";

import BookList from "./BookList";
import SearchSidebar from "./SearchSidebar";
import useFetchMore from "../hooks/useFetchMore";
import useFirstRender from "../hooks/useFirstRender";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";

export default function ProductDisplay() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const isFirstRender = useFirstRender();

  const url = "/api/books/";
  const { dataMore, loadingMore, errorMore, refetchMore } = useFetchMore(url, {
    params: { _skip: skip, _limit: limit },
  });

  // Loads more items on demand (clicking "load more" button)
  // useFirstRender "overrides" useEffect's default behaviour (run on first render) 
  useEffect(() => {
    if (!isFirstRender) {
      refetchMore();
    }
  }, [skip]);

  if (loadingMore) {
    return <LoadingIcon />;
  }
  if (errorMore) {
    return <Error error />;
  }
  if (dataMore) {
    return (
      <div>
        <SearchSidebar />
        <BookList items={dataMore} />
        {!loadingMore && (
          <button
            className="font-bold my-4 p-2 flex mx-auto text-white bg-slate-900"
            onClick={() => setSkip((prev) => prev + limit)}
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}
