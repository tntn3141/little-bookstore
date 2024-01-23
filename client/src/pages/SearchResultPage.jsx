import { useLocation } from "react-router-dom";
import BookList from "../components/BookList"
import NotFoundPage from "./NotFoundPage";
import { Typography } from "../components/Typography";
import SearchSidebar from "../components/SearchSidebar";

export default function SearchResultPage() {
  const { state } = useLocation();
  
  if (!state) {
    return <NotFoundPage />
  }

  return (
    <div className="mt-[112px] w-[90%] mx-auto">
      <SearchSidebar />
      {!state && (
        <div className="p-4 flex flex-col gap-2">
          <p>No results.</p>
          <p>Try double-checking the spelling, then try again.</p>
          <p>Please note that the database is incomplete and does not include our entire catalogue.</p>
        </div>
      )}
      {state && (
        <BookList items={state.result} />
      )}
    </div>
    )
}