import { useEffect, useState } from "react";

import BookList from "./BookList";
import SearchSidebar from "./SearchSidebar";
import useFetchMore from "../hooks/useFetchMore";
import useFirstRender from "../hooks/useFirstRender";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";

// The value of { type } should be one of the strings below:
// "normal": returns default order from database (oldest -> newest)
// "latest": returns newest -> oldest

export default function ProductDisplay({ type }) {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
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
        <BookList items={dataMore} />
        {!loadingMore && (
          <button
            className="load-button"
            onClick={() => setSkip((prev) => prev + limit)}
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}
