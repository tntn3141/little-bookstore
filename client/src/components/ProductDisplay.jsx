import { useEffect, useState, useRef } from "react";

import BookList from "./BookList";
import SearchSidebar from "./SearchSidebar";
import useFetchMore from "../hooks/useFetchMore";
import useFirstRender from "../hooks/useFirstRender";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";

// { type } should be a prop of these values below:
// normal: returns default order from database
// latest: returns books sorted by createdAt entry, from newest to oldest

export default function ProductDisplay({ type }) {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const isFirstRender = useFirstRender();

  const { dataMore, loadingMore, errorMore, refetchMore } = useFetchMore("/api/books", {
    params: { [type]: true, _skip: skip, _limit: limit },
  });

  // Loads more items on demand (clicking "load more" button)
  // HACK: useFirstRender "overrides" useEffect's default behaviour (run on first render)
  // to avoid double rendering on first render
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
