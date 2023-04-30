import axios from "axios";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";

import { FilterSVG } from "../assets/svg";
import BookList from "./BookList";
import FormikControl from "./Formik/FormikControl";

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
      console.log(response.data)
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
    genres: [],
  };

  async function handleSearchSubmit(values) {
    // Remove all falsy values ("", 0, false, null, undefined )
    // Reference: https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
    const filteredValues = Object.entries(values).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    // Remove all falsy values from genres
    let { format, genres } = filteredValues;
    filteredValues.genres = genres.filter(Boolean);
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
        <div className="flex my-2 mx-auto place-content-center flex-col">
          <div className="flex gap-2 my-2 justify-center">
            <button
              type="button"
              onClick={() => {
                formik.resetForm(); // Reset the filter form when closed
                setFilterActive(!filterActive);
              }}
            >
              <FilterSVG filterActive={filterActive} />
            </button>
            <div>
              <input
                type="text"
                className="text-white bg-black"
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
                  options={[
                    { key: "Paperback", value: "paperback" },
                    { key: "Hardcover", value: "hardcover" },
                  ]}
                />
                <FormikControl
                  control="tristate-checkbox"
                  label="Genres"
                  name="genres"
                  manualSetFieldValue={formik.setFieldValue}
                  options={[
                    { key: "Action/Adventure", value: "action-adventure" },
                    { key: "Romance", value: "romance" },
                    { key: "Horror", value: "horror" },
                    { key: "Fantasy", value: "fantasy" },
                    { key: "Thriller/Suspense", value: "thriller-suspense" },
                    { key: "Children", value: "children" },
                    { key: "Dystopian", value: "dystopian" },
                    { key: "Contemporary", value: "contemporary" },
                    { key: "Self-help", value: "self-help" },
                    { key: "Art/Photography", value: "art-photography" },
                    { key: "Science/Technology", value: "science-technology" },
                    { key: "Guide", value: "guide" },
                    { key: "Classic", value: "classic" },
                    { key: "Sci-fi", value: "sci-fi" },
                    { key: "Graphic novel", value: "graphic-novel" },
                  ]}
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-black text-white font-bold px-3"
            >
              SEARCH!
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
