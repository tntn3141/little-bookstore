import axios from "axios";
import { useState, useEffect } from "react";

import BookList from "./BookList";
import SearchSidebarNew from "./SearchSidebar";
import useFetch from "../hooks/useFetch";
import MultiCarousel from "./MultiCarousel";

export default function BookManager() {
  const [skip, setSkip] = useState(0);
  const url = "/api/books/"
  const { data, loading, error } = useFetch(url, {params: {_skip: skip, _limit: 5}})

  // async function loadBooks() {
  //   setLoadingItems(true);
  //   try {
  //     const response = await axios.get(`/api/books/`, {
  //       params: {_skip: skip, _limit: 2}
  //     });
  //     setBooks((prev) => [...prev, ...response.data]);
  //     setLoadingItems(false);
  //     setSkip(prev => prev + 1)
  //   } catch (error) {
  //     alert("Loading books failed. " + error);
  //   }
  // }

  return (
    <div>
      <SearchSidebarNew />
      {data && <BookList items={data} />}
      {!loading && (
        <button className="font-bold" onClick={() => console.log("click")}>
          Load more
        </button>
      )}
      {/* <div className="flex my-4 mx-auto place-content-center">
        <input type="text" value={query} onChange={handleSearch} />
      </div> */}
    </div>
  );
}
