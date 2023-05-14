import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import Error from "../components/Error";
import { UserContext } from "../UserContext";
import NotFound404Page from "./NotFoundPage";
import LoadingIcon from "../components/LoadingIcon";
import FormikControl from "../components/Formik/FormikControl";

import {
  bookValidationSchema,
  bookLanguages,
  bookFormats,
  bookCategories,
  bookTags,
} from "../components/FormSetup";

export default function BookEditPage() {
  const { user } = useContext(UserContext);
  const { itemId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const [cover, setCover] = useState();
  const [coverPreview, setCoverPreview] = useState();
  const [didChangeCover, setDidChangeCover] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/books/${itemId}`);
        setData(response.data);
        setCoverPreview(response.data.coverImage);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Clean up image blob preview
  useEffect(() => {
    return () => coverPreview && URL.revokeObjectURL(coverPreview.tempPreview);
  }, [coverPreview]);

  // TODO: make coverImage required (might have to make FormikControl)
  const validationSchema = bookValidationSchema;

  async function handleBookSubmit(values, actions) {
    let formData = new FormData();

    if (didChangeCover) {
      console.log("cover changed")
      let fileId = uuidv4();
      let blob = cover.slice(0, cover.size, "image/jpeg");
      // To assign a new name (that uuid generated) to the image file
      const newFile = new File([blob], fileId, { type: "image/jpeg" });

      // Using FormData to send both the form values (in req.body) and the file(s)
      // (in req.file, extracted via multer middleware) to the backend
      formData.append("coverImage", newFile);
      formData.set("coverImage", newFile);
    }

    for (const key in values) {
      // To prevent parsing array values as a string
      if (Array.isArray(values[key])) {
        values[key].forEach((value) => formData.append(key, value));
      } else {
        formData.append(key, values[key]);
      }
    }

    for (const value of formData.values()) {
      console.log(value);
    }


    try {
      const response = await axios.put(`/api/books/${data._id}`, formData);
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

  if ((user == null) || !user.isAdmin) {
    return <NotFound404Page />
  }

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <Error />;
  }

  if (data) {
    return (
      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={handleBookSubmit}
      >
        {(formik) => {
          return (
            <Form
              encType="multipart/form-data"
              className="mx-auto mt-20 max-w-[90%]"
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
                options={bookLanguages}
              />
              <FormikControl
                control="radio"
                label="Format"
                name="format"
                options={bookFormats}
              />
              <FormikControl
                control="radio"
                label="Category"
                name="category"
                options={bookCategories}
              />
              <FormikControl
                control="checkbox"
                label="Tags"
                name="tags"
                options={bookTags}
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
                <label
                  htmlFor="coverImage"
                  className="font-bold text-base my-1"
                >
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
                    setCoverPreview(file.tempPreview);
                    setDidChangeCover(true);
                  }}
                />
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="Book cover image preview"
                    width="125"
                    className="mx-auto mt-4"
                  />
                )}
              </div>
              <div className="flex">
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="uppercase mx-auto w-[60%] sm:w-[40%] my-10 p-4 bg-gray-900 font-bold text-white"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}