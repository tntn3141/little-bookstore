import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import Error from "../components/Error";
import { UserContext } from "../UserContext";
import NotFoundPage from "./NotFoundPage";
import LoadingIcon from "../components/LoadingIcon";
import FormikControl from "../components/Formik/FormikControl";
import { getBase64 } from "../helpers/helpers";

import {
  bookValidationSchema,
  bookLanguages,
  bookFormats,
  bookCategories,
  bookTags,
} from "../components/FormSetup";

// To configure whether the image should be uploaded to
// Google Cloud ("gc") or imgbb ("imgbb")
const imageUploadType = "imgbb";

export default function BookEditPage() {
  const { user } = useContext(UserContext);
  const { itemId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const [cover, setCover] = useState();
  const [coverPreview, setCoverPreview] = useState();
  const [didChangeCover, setDidChangeCover] = useState(false);

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/books/${itemId}`);
        setData(response.data);
        setCoverPreview(response.data.imgbb);
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

  // TODO: make image required (might have to make FormikControl?)
  const validationSchema = bookValidationSchema;

  async function handleBookSubmit(values, actions) {
    let formData = new FormData();

    if (didChangeCover) {
      let fileId = uuidv4();
      let blob = cover.slice(0, cover.size, "image/jpeg");
      const newFile = new File([blob], fileId, { type: "image/jpeg" });

      switch (imageUploadType) {
        case "imgbb":
          // Because imgbb API requires binary files, base64 data, or urls.
          // This current implementation assumes that users use local files.
          const base64 = await getBase64(newFile);
          formData.append("image", base64);
          break;
        case "gc":
          // Using FormData to send both the form values (in req.body) and the file(s)
          // (in req.file, extracted via multer middleware) to the backend
          formData.append("image", newFile);
          break;
      }
      // So that our API knows where to upload
      formData.append("imageUploadType", imageUploadType);
    }

    // Formik stuffs
    for (const key in values) {
      // To prevent parsing array values as a string
      if (Array.isArray(values[key])) {
        values[key].forEach((value) => formData.append(key, value));
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      setLoading(true);
      const response = await axios.put(`/api/books/${data._id}`, formData);
      if (response) {
        alert("Book submission succeeded.");
        setLoading(false);
        // Clean up the form
        actions.resetForm();
        setCoverPreview();
      }
    } catch (error) {
      setLoading(false);
      alert("Book submission failed. " + error);
      console.log(error);
    }
  }

  async function handleBookDelete() {
    const confirmDeletion = confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDeletion) {
      try {
        const response = await axios.delete(`/api/books/${data._id}`);
        if (response) {
          alert("Book deletion succeeded. Redirecting you to home page...");
          setRedirect("/");
        }
      } catch (error) {
        alert("Book deletion failed. " + error);
      }
    }
  }

  if (user == null || !user.isAdmin) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <Error />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
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
                <label htmlFor="image" className="font-bold text-base my-1">
                  Book cover image
                </label>
                <input
                  id="image"
                  type="file"
                  name="image"
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
                {!coverPreview && data.imgbb && (
                  <img
                    src={data.imgbb}
                    alt="Book cover image preview"
                    width="125"
                    className="mx-auto mt-4"
                  />
                )}
              </div>
              <div className="flex ">
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="uppercase mx-auto w-[60%] sm:w-[40%] my-8 p-4 bg-gray-900 font-bold text-white"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleBookDelete}
                  className="uppercase mx-auto w-[60%] sm:w-[40%] my-8 p-4 bg-red-900 font-bold text-white"
                >
                  Delete
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
