import axios from "axios";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";

import { FilterSVG, FilterSolidSVG, SearchSVG } from "../assets/svg";
import BookList from "./BookList";
import FormikControl from "./Formik/FormikControl";
import { bookTags, bookFormats } from "./FormSetup.js";
import { removeFalsyValues } from "../helpers/helpers";

export default function SearchSidebarNew() {
  const [filterActive, setFilterActive] = useState(false);
  const [key, setKey] = useState();
  const [livesearchResult, setLivesearchResult] = useState();

  useEffect(() => getLiveSearch, [key]);

  async function getLiveSearch() {
    // Currently not working
    try {
      const response = await axios.get("/api/books", {
        params: { searchQuery: key },
      });
      console.log(response.data);
      setLivesearchResult(response.data);
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
    // Remove all falsy values
    let { format, tags } = filteredValues;
    filteredValues.tags = tags.filter(Boolean);
    filteredValues.format = format.filter(Boolean);

    try {
      const response = await axios.get("/api/books", {
        params: { filterQuery: filteredValues },
      });
      console.log("Result: ", response.data);
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
        <div className="flex flex-col my-2 mx-auto place-content-center w-[90%]">
          <div className="flex gap-6 my-2 justify-center">
            <button
              type="button"
              onClick={() => {
                formik.resetForm(); // Reset the filter form when closed
                setFilterActive(!filterActive);
              }}
            >
              {filterActive ? <FilterSolidSVG /> : <FilterSVG />}
            </button>
            <div>
              <input
                type="text"
                
                onChange={(e) => setKey(e.target.value)}
              />
              {livesearchResult && (
                <div>
                  {livesearchResult.map((result) => {
                    <div>
                      {result.name} {result.author}
                    </div>;
                  })}
                </div>
              )}
            </div>
            <button
                type="button"
                className="bg-black text-white font-bold px-3"
                onClick={() => console.log("clicked")}
              >
                <SearchSVG />
              </button>
          </div>
          <Form>
            {filterActive && (
              <div>
                <FormikControl
                  control="input"
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="Any"
                />
                <FormikControl
                  control="input"
                  label="Author"
                  name="author"
                  type="text"
                  placeholder="Any"
                />
                <FormikControl
                  control="input"
                  label="Price (in VND)"
                  name="price"
                  type="text"
                  placeholder="Ex: 100000"
                />
                <FormikControl
                  control="tristate-checkbox"
                  label="Format"
                  name="format"
                  manualSetFieldValue={formik.setFieldValue}
                  options={bookFormats}
                />
                <FormikControl
                  control="tristate-checkbox"
                  label="Tags"
                  name="tags"
                  manualSetFieldValue={formik.setFieldValue}
                  options={bookTags}
                />
                <button
                  type="submit"
                  className="bg-black text-white font-bold px-3"
                >
                  SEARCH!
                </button>
              </div>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
}
