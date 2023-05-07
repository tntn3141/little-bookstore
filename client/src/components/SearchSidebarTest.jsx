import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { SearchSVG } from "../assets/svg";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";

export default function SearchSidebarNew() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getSearchResult();
  }, [key]);

  const handleSearch = () => {
    navigate(`/search?keyword=${key}`)
  }


  async function getSearchResult() {
    try {
      if (!key.trim()) {
        setSearchResult([]);
        return;
      }
      const response = await axios.get("/api/books", {
        params: { searchQuery: key, _limit: 3 },
      });
      setSearchResult(response.data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex flex-col my-2 mx-auto w-[90%] lg:w-[60%] relative bg-white">
      <div className="flex gap-3 mt-2 justify-center">
        <div className="flex">
          <input
            type="text"
            className="mt-1 text-justify border-2 md:w-[300px] 
                p-1 border-gray-800 focus:outline-none 
                focus:bg-white focus:border-blue-500"
            placeholder="Title or author name"
            onChange={(e) => {setKey(e.target.value); setSearchParams(e.target.value)}}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSearch()
              }
            }}
          />
          <button
            type="button"
            className="bg-black text-white font-bold px-2 h-[36px] mt-1"
            onClick={handleSearch}
          >
            <SearchSVG />
          </button>
        </div>
      </div>
      {searchResult && searchResult.length > 0 && (
        <div
          className={
            "grid grid-rows-[120px_120px_120px] z-10 absolute top-[47px] " +
            "mx-auto w-full sm:w-[80%] sm:left-[10%] "
          }
        >
          {searchResult.map((result) => {
            return (
              <div key={result._id}>
                <Link
                  to={`/items/${result._id}`}
                  className={`flex gap-2 md:gap-4 z-10 hover:text-white hover:bg-slate-900 
                       bg-white w-[100%] border border-slate-300`}
                >
                  <img
                    src={result.coverImage}
                    alt={`${result.title} cover`}
                    className="h-[120px] w-[90px]"
                  />
                  <div>
                    <Typography
                      variant="body"
                      className="line-clamp-2 font-bold"
                    >
                      {result.title}
                    </Typography>
                    <Typography variant="body-small" className="italic">
                      {result.author}
                    </Typography>
                    <Typography
                      variant="body"
                      className="text-red-600 font-bold"
                    >
                      {getVNDPrice(result.price)}
                    </Typography>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
