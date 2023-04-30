import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";

import FilterIndicator from "./FilterIndicator";
import BookList from "./BookList";
import FormikControl from "./FormikControl";

export default function SearchSidebar() {
  const [textQuery, setTextQuery] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  const handleSearchInput = (e) => {
    setTextQuery(e.target.value);
    console.log(textQuery);
  };
  async function handleSearch(values, actions) {
    console.log("handleSearch fired")
    console.log("values ", values)
    console.log("actions ", actions)
    const response = await axios.get(`/api/books`, {
      params: { searchQuery: values },
    });
    console.log("response: ", response.data);
  }

  const initialValues = {
    title: "",
    author: "",
    publicationYear: "",
    price: "",
    format: "",
    genres: [],
  };
  // No need for validationSchema?
  function handleFilterSubmit(values) {
    console.log("handleFilterSubmit fired")
    console.log(values);
  }

  return (
    <div className="flex my-2 mx-auto place-content-center flex-col">
      <div className="mx-auto flex gap-2 my-2">
        <input
          type="text"
          placeholder="Search a title or author..."
          value={textQuery}
          onChange={handleSearchInput}
        />
        <button
          onClick={() => {
            console.log("filter clicked");
            setFilterActive(!filterActive);
          }}
        >
          <FilterIndicator filterActive={filterActive} />
        </button>

        <button onClick={handleSearch}>Search</button>
      </div>

      {filterActive && (
        <div className="my-2">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleFilterSubmit}
          >
            {(formik) => (
              <Form>
                <FormikControl
                  control="input"
                  label="Title"
                  name="title"
                  type="text"
                />
                <FormikControl
                  control="input"
                  label="Author"
                  name="author"
                  type="text"
                  placeholder=""
                />
                <FormikControl
                  control="input"
                  label="Price (in VND)"
                  name="price"
                  type="text"
                  placeholder="Ex: 100000"
                />
                <FormikControl
                  control="radio"
                  label="Format"
                  name="format"
                  options={[
                    { key: "Paperback", value: "paperback" },
                    { key: "Hardcover", value: "hardcover" },
                  ]}
                />
                <FormikControl
                  control="tristate-checkbox"
                  label="Genres"
                  name="genres"
                  options={[
                    { key: "Action/Adventure", value: "action-adventure" },
                    { key: "Romance", value: "romance" },
                    { key: "Fantasy", value: "fantasy" },
                    { key: "Scifi", value: "sci-fi" },
                    { key: "Thriller/Suspense", value: "thriller-suspense" },
                    { key: "Children", value: "children" },
                    { key: "Horror", value: "horror" },
                    { key: "Contemporary", value: "contemporary" },
                  ]}
                />

                <button type="submit" className="bg-red-600">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
