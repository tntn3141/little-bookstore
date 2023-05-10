import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import LoadingIcon from "../components/LoadingIcon";
import Error from "../components/Error";
import BookList from "../components/BookList";
import SearchSidebarNew from "../components/SearchSidebar";
import Filter from "../components/Filter";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());


  const { data, loading, error } = useFetch(
    "/api/books",
    {
      params: { filterQuery: params },
    },
    searchParams
  );

  if (loading) return <LoadingIcon />;

  if (error) return <Error />;

  if (data == null) {
    return (
      <div className="mt-24">
        <h1>Search result</h1>
        <div className="flex">
          <SearchSidebarNew />
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="mt-24">
        <h1>Search result</h1>
        <div className="flex">
          <SearchSidebarNew />
        </div>
        <BookList items={data} />
      </div>
    );
  }
}
