import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";

import { FilterSVG, FilterSolidSVG, SearchSVG } from "../assets/svg";
import FormikControl from "./Formik/FormikControl";
import { bookTags, bookFormats, bookPriceRanges } from "./FormSetup.js";
import { removeFalsyValues } from "../helpers/helpers";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";

export default function SearchSidebarNew() {
  const [filterActive, setFilterActive] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getSearchResult();
  }, [key]);

  async function getSearchResult() {
    try {
      if (!key.trim()) {
        console.log("set empty");
        setSearchResult([]);
      } else {
        const response = await axios.get("/api/books", {
          params: { searchQuery: key, _limit: 3 },
        });
        setSearchResult(response.data);
      }
    } catch (error) {
      alert(error);
    }
  }

  const initialValues = {
    title: "",
    author: "",
    publicationYear: "",
    price: "",
    includedFormat: [],
    excludedFormat: [],
    includedTags: [],
    excludedTags: [],
  };

  function handleSearchBar() {
    navigate(`/search?title=${key}&author=${key}&or=true`);
  }

  function handleSearchSubmit(values) {
    const filteredValues = removeFalsyValues(values);
    setFilterActive(false);
    for (const key in filteredValues) {
      // To trim leading/trailing whitespaces
      if (typeof filteredValues[key] === "string") {
        filteredValues[key] = filteredValues[key].trim();
      }
      // To remove undefineds from arrays
      if (Array.isArray(filteredValues[key])) {
        filteredValues[key] = filteredValues[key].filter(Boolean);
      }
    }

    // Remove all empty arrays
    let params = new URLSearchParams(filteredValues);
    let keysForDel = [];
    params.forEach((value, key) => {
      if (value == "") {
        keysForDel.push(key);
      }
    });
    keysForDel.forEach((key) => {
      params.delete(key);
    });

    navigate(`/search?${params}`);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSearchSubmit}
    >
      {(formik) => (
        <div className="flex flex-col my-4 mx-auto w-[90%] lg:w-[60%] relative">
          <div className="flex gap-3 my-4 justify-center">
            <button
              type="button"
              onClick={() => {
                formik.resetForm(); // Reset the filter form when closed
                setFilterActive(!filterActive);
              }}
            >
              {filterActive ? <FilterSolidSVG /> : <FilterSVG />}
            </button>
            <div className="flex">
              <input
                type="text"
                className="text-justify border-2 md:w-[300px] 
                p-1 border-gray-800 focus:outline-none 
                focus:bg-white focus:border-blue-500"
                placeholder="Title or author name"
                onChange={(e) => setKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSearchBar();
                  }
                }}
              />

              <button
                type="button"
                className="bg-black text-white font-bold px-2 h-[37px]"
                onClick={handleSearchBar}
              >
                <SearchSVG />
              </button>
            </div>
          </div>
          {searchResult.length > 0 && (
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
          <Form>
            {filterActive && (
              <div className="absolute z-10 bg-white p-4 border border-slate-800 top-12 flex flex-col">
                <div className="sm:grid sm:grid-cols-2">
                  <FormikControl
                    control="input"
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Any"
                    containerStyle="w-[85%]"
                  />
                  <FormikControl
                    control="input"
                    label="Author"
                    name="author"
                    type="text"
                    placeholder="Any"
                    containerStyle="w-[85%]"
                  />
                </div>
                <div className="sm:grid sm:grid-cols-2">
                  <FormikControl
                    control="select"
                    label="Price"
                    name="price"
                    inputStyle="p-1"
                    options={bookPriceRanges}
                  />
                  <FormikControl
                    control="tristate-checkbox"
                    label="Format"
                    name={["includedFormat", "excludedFormat"]}
                    manualSetFieldValue={formik.setFieldValue}
                    options={bookFormats}
                  />
                </div>
                <FormikControl
                  control="tristate-checkbox"
                  label="Tags"
                  name={["includedTags", "excludedTags"]}
                  manualSetFieldValue={formik.setFieldValue}
                  options={bookTags}
                />
                <div className="flex flex-col md:flex-row mx-auto gap-4">
                  <button
                    type="submit"
                    className="bg-black text-white font-bold p-2 w-[200px] mx-auto"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    className="bg-black text-white font-bold p-2 w-[200px] mx-auto"
                    onClick={() => setFilterActive(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
}
