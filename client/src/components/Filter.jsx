import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import { useSearchParams, useNavigate } from "react-router-dom";

import { FilterSVG, FilterSolidSVG } from "../assets/svg";
import FormikControl from "./Formik/FormikControl";
import { removeFalsyValues } from "../helpers/helpers";
import { bookPriceRanges, bookFormats, bookTags } from "./FormSetup";

export default function Filter() {
  const navigate = useNavigate();
  const [filterActive, setFilterActive] = useState(false);

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
    const url = new URL("http://127.0.0.1:5173/search")
    url.search = new URLSearchParams(filteredValues)
    console.log("url", url)
    try {
      const response = await axios.get("/api/books", {
        params: { filterQuery: filteredValues },
      });
      const result = response.data;
      console.log(response.data)

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
          </div>

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
