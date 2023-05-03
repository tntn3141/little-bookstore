import { useLocation } from "react-router-dom";
import BookList from "../components/BookList"
import NotFound404Page from "./NotFound404Page";

export default function SearchResultPage() {
  const { state } = useLocation();
  
  if (!state) {
    return <NotFound404Page />
  }

  return (
    <div className="">
      <BookList items={state.result} />
    </div>
    )
}