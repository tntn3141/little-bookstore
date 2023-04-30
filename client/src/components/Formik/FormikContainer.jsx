import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

export default function FormikContainer() {
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Paperback", value: "paperback" },
    { key: "Hardcover", value: "hardcover" },
  ];

  const dropdownOptions2 = [
    { key: "Paperback2", value: "paperback2" },
    { key: "Hardcover2", value: "hardcover2" },
  ];

  const genreOptions = [
    { key: "Action/Adventure", value: "action-adventure" },
    { key: "Romance", value: "romance" },
    { key: "Fantasy", value: "fantasy" },
    { key: "Science fiction", value: "science-fiction" },
    { key: "Thriller/Suspense", value: "thriller-suspense" },
    { key: "Children", value: "children" },
    { key: "Horror", value: "horror" },
    { key: "Contemporary", value: "contemporary" },
  ];

  const initialValues = {
    author: "",
    description: "",
    format: "",
    format2: "",
    genres: [],
  };
  const validationSchema = Yup.object({
    author: Yup.string().required("Please enter the author of the book"),
    description: Yup.string().required("Please enter some description"),
    format: Yup.string().required("Required"),
    format2: Yup.string().required("Required"),
    genres: Yup.array().min(1, "Please choose at least one genre"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl control="input" label="Author" name="author" />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikControl
            control="select"
            label="Select a format"
            name="format"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            label="Select a radio option"
            name="format2"
            options={dropdownOptions2}
          />
          <FormikControl
            control="checkbox"
            label="Select genre(s) of this book"
            name="genres"
            options={genreOptions}
          />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
