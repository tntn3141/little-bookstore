import { useLocation } from "react-router-dom";
import BookList from "../components/BookList"
import NotFound404Page from "./NotFound404Page";
import { Typography } from "../components/Typography";
import SearchSidebarNew from "../components/SearchSidebar";

export default function SearchResultPage() {
  const { state } = useLocation();
  
  if (!state) {
    return <NotFound404Page />
  }

  return (
    <div className="mt-[112px] w-[90%] mx-auto">
      <SearchSidebarNew />
      <Typography variant="h1">Search result:</Typography>
      <BookList items={state.result} />
    </div>
    )
}