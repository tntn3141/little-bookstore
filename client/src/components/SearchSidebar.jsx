import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";

import {
  FilterSVG,
  FilterSolidSVG,
  SearchSVG,
  ArrowRightSVG,
} from "../assets/svg";
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

  const initialValues = {
    title: "",
    author: "",
    publicationYear: "",
    price: "",
    format: [],
    tags: [],
  };

  async function handleSearchSubmit(values) {
    const filteredValues = removeFalsyValues(values);
    if (filteredValues.price) {
      filteredValues.price = JSON.parse(filteredValues.price);
    }
    // Remove all falsy values
    let { format, tags } = filteredValues;
    filteredValues.tags = tags.filter(Boolean);
    filteredValues.format = format.filter(Boolean);

    try {
      const response = await axios.get("/api/books", {
        params: { filterQuery: filteredValues },
      });
      const result = response.data;
      navigate("/search-result", { state: { result } });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSearchSubmit}
    >
      {(formik) => (
        <div className="flex flex-col my-2 mx-auto w-[90%] lg:w-[60%] relative">
          <div className="flex gap-3 mt-2 justify-center">
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
                className="mt-1 text-justify border-2 md:w-[300px] 
                p-1 border-gray-800 focus:outline-none 
                focus:bg-white focus:border-blue-500"
                onChange={(e) => setKey(e.target.value)}
              />

              <button
                type="button"
                className="bg-black text-white font-bold px-2 h-[36px] mt-1"
                onClick={() => console.log("clicked")}
              >
                <SearchSVG />
              </button>
            </div>
          </div>
          {searchResult && searchResult.length > 0 && (
            <div className="flex flex-col relative">
              <div className="mx-auto w-[100%] border border-slate-600 p-2 flex justify-between">
                <span className="font-bold">Enter some query...</span>
                <ArrowRightSVG
                  className="w-6 h-6 hover:text-blue-600 cursor-pointer"
                  onClick={() => console.log("advanced search clicked")}
                />
              </div>
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
            </div>
          )}
          <Form>
            {filterActive && (
              <div className="absolute z-10 bg-white p-4 border-2 border-slate-800 top-11 flex flex-col">
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
                    name="format"
                    manualSetFieldValue={formik.setFieldValue}
                    options={bookFormats}
                  />
                </div>
                <FormikControl
                  control="tristate-checkbox"
                  label="Tags"
                  name="tags"
                  manualSetFieldValue={formik.setFieldValue}
                  options={bookTags}
                />
                <button
                  type="submit"
                  className="bg-black text-white font-bold p-2 w-[200px] mx-auto"
                >
                  Search
                </button>
              </div>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
}
