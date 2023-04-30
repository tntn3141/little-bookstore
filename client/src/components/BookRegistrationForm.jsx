import axios from "axios";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { useEffect, useState, useContext } from "react";

import { UserContext } from "../UserContext";
import FormikControl from "./FormikControl";

export default function BookRegistrationForm() {
  const { user } = useContext(UserContext);
  const [cover, setCover] = useState();
  const [coverPreview, setCoverPreview] = useState();

  // Clean up image blob preview
  useEffect(() => {
    return () => coverPreview && URL.revokeObjectURL(coverPreview.tempPreview);
  }, [coverPreview]);

  const initialValues = {
    title: "",
    author: "",
    publicationYear: "",
    stock: 1,
    price: "",
    publisher: "",
    format: "",
    pages: "",
    tags: [],
    category: "",
    description: "",
    coverImage: "",
    ratingAllPoints: 0,
    ratingAllTimes: 0,
  };
  // TODO: make coverImage required (might have to make FormikControl)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    publicationYear: Yup.number().positive().integer().required("Required"),
    price: Yup.number().positive().required("Required"),
    publisher: Yup.string().required("Required"),
    pages: Yup.number().positive().integer().required("Required"),
    stock: Yup.number().positive().integer().required("Required"),
    language: Yup.string().required("Required"),
    format: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    tags: Yup.array().min(1, "Select at least one tag").required("Required"),
    description: Yup.string().required("Required"),
    ratingAllPoints: Yup.number(),
    ratingAllTimes: Yup.number(),
    coverImage: Yup.mixed(),
  });

  async function handleBookSubmit(values, actions) {
    let fileId = uuidv4();
    let blob = cover.slice(0, cover.size, "image/jpeg");
    // To assign a new name (that uuid generated) to the image file
    const newFile = new File([blob], fileId, { type: "image/jpeg" });

    // Using FormData to send both the form values (in req.body) and the file(s)
    // (in req.file, extracted via multer middleware) to the back-end
    let formData = new FormData();
    formData.append("coverImage", newFile);
    for (const key in values) {
      // To prevent parsing array values as a string
      if (Array.isArray(values[key])) {
        values[key].forEach((value) => formData.append(key, value));
      } else {
        formData.append(key, values[key]);
      }
    }
    // To identify the uploader
    formData.append("seller", user._id);

    try {
      const response = await axios.post("/api/books/", formData);
      if (response) {
        alert("Book submission succeeded.");
        actions.resetForm(); // Reset form values
        setCoverPreview(); // Remove old image preview
        // Reset the file input value display
        const coverValue = document.getElementById("image-upload");
        coverValue.value = "";
      }
    } catch (error) {
      alert("Book submission failed. " + error);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleBookSubmit}
    >
      {(formik) => {
        return (
          <Form
            encType="multipart/form-data"
            className="mx-auto mt-8 max-w-[80%]"
          >
            <div className="md:grid md:grid-cols-2 md:gap-x-10">
              <FormikControl
                control="input"
                label="Title"
                name="title"
                type="text"
                placeholder="Title..."
              />
              <FormikControl
                control="input"
                label="Author"
                name="author"
                type="text"
                placeholder="Author's full name..."
              />
              <FormikControl
                control="input"
                label="Price (in VND)"
                name="price"
                type="number"
                placeholder=""
              />
              <FormikControl
                control="input"
                label="Publisher"
                name="publisher"
                type="text"
                placeholder="Publisher's name..."
              />
            </div>

            <div className="md:grid md:grid-cols-3 md:gap-x-10">
              <FormikControl
                control="input"
                label="Stock"
                name="stock"
                type="number"
                placeholder=""
              />
              <FormikControl
                control="input"
                label="Publication year"
                name="publicationYear"
                type="number"
                placeholder=""
              />
              <FormikControl
                control="input"
                label="Number of pages"
                name="pages"
                type="text"
                placeholder=""
              />
            </div>
            <FormikControl
              control="select"
              label="Language"
              name="language"
              selected="English" // English by default
              options={[
                { key: "English", value: "English" },
                { key: "Vietnamese", value: "Vietnamese" },
                { key: "Other", value: "Other" },
              ]}
            />
            <FormikControl
              control="radio"
              label="Format"
              name="format"
              options={[
                { key: "Paperback", value: "Paperback" },
                { key: "Hardcover", value: "Hardcover" },
              ]}
            />
            <FormikControl
              control="radio"
              label="Category"
              name="category"
              options={[
                { key: "Fiction", value: "Fiction" },
                { key: "Nonfiction", value: "Nonfiction" },
              ]}
            />
            <FormikControl
              control="checkbox"
              label="Tags"
              name="tags"
              options={[
                { key: "Adventure", value: "Adventure" },
                { key: "Romance", value: "Romance" },
                { key: "Thriller", value: "Thriller" },
                { key: "Horror", value: "Horror" },
                { key: "Contemporary", value: "Contemporary" },
                { key: "Fantasy", value: "Fantasy" },
                { key: "Historical", value: "Historical" },
                { key: "Children", value: "Children" },
                { key: "Self-help", value: "Self-help" },
                { key: "Classic", value: "Classic" },
                { key: "Technology", value: "Technology" },
                { key: "Guide", value: "Guide" },
                { key: "Sci-fi", value: "Sci-fi" },
                { key: "Mystery", value: "Mystery"},
                { key: "Relationships", value: "Relationships"},
                { key: "Memoir", value: "Memoir"},
                { key: "Graphic Novel", value: "Graphic Novel" },
                { key: "Arts", value: "Arts" },
              ]}
            />
            <FormikControl
              control="textarea"
              label="Description"
              name="description"
            />
            {/*
              TODO file type/size restriction
            */}
            <div>
              <label htmlFor="coverImage" className="font-bold text-base my-1">
                Book cover image
              </label>
              <input
                id="image-upload"
                type="file"
                name="coverImage"
                className="mx-4"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setCover(file);
                  file.tempPreview = URL.createObjectURL(file);
                  setCoverPreview(file);
                }}
              />
              {coverPreview && (
                <img
                  src={coverPreview.tempPreview}
                  alt="Book cover image preview"
                  width="125"
                  className="mx-auto mt-4"
                />
              )}
            </div>
            <div>
              <p className="font-bold text-base my-1">
                Generate random rating values for testing?
              </p>
              <button
                type="button"
                className="uppercase p-2 bg-gray-900 font-bold text-white"
                onClick={() => {
                  let random = Math.floor(Math.random() * 51);
                  formik.setFieldValue("ratingAllTimes", random);
                  formik.setFieldValue(
                    "ratingAllPoints",
                    random * Math.floor(Math.random() * 6)
                  );
                  console.log(
                    "Random ratings generated",
                    formik.values.ratingAllPoints,
                    formik.values.ratingAllTimes
                  );
                }}
              >
                Generate
              </button>
            </div>

            <button
              type="submit"
              disabled={!formik.isValid}
              className="uppercase w-full mt-5 p-4 bg-gray-900 font-bold text-white"
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
