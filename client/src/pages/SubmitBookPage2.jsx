import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-3 relative items-center">
      <div className="flex">
        <label htmlFor={props.name} className="font-semibold mr-2">
          {label}
        </label>
        <input {...props} {...field} />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-sm absolute top-6">{meta.error}</div>
      ) : null}
    </div>
  );
};

const CheckboxInput = ({ children, ...props }) => {
  const [field] = useField({ ...props, type: "checkbox" });
  return (
    <label className="md:col-span-2 mt-2">
      <span className="mr-2">{children}</span>
      <input type="checkbox" {...field} {...props} />
    </label>
  );
};

export default function SubmitBookPage2() {
  const [genresExpand, setGenresExpand] = useState("");

  return (
    <Formik
      initialValues={{
        title: "",
        author: "",
        publicationYear: "",
        stock: 1,
        price: "",
        publisher: "",
        format: "",
        pageNumber: "",
        genres: [],
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Please enter the title of the book"),
        author: Yup.string().required("Please enter the author of the book"),
        publicationYear: Yup.number()
          .positive()
          .integer()
          .required("Please enter the year the book was published in"),
        price: Yup.number()
          .positive()
          .required("Please enter the price you wish to sell for (in VND)"),
        publisher: Yup.string().required(
          "Please enter the publisher's name of this book"
        ),
        pageNumber: Yup.number()
          .positive()
          .integer()
          .required("Please enter a valid number of pages of this book"),
        stock: Yup.number()
          .positive()
          .integer()
          .required("Please enter the number of copies for sale, minimum 1"),
      })}
      // We don't need to call setSubmitting(false) because onSubmit is asynchronous (Formik)
      onSubmit={(values, actions) => {
        console.log(values)
          actions.setSubmitting(false);
          actions.resetForm()
          console.log(123)
        
      }}
    >
      <Form className="flex flex-col m-[5%] text-lg">
        <TextInput
          label="Title"
          name="title"
          type="text"
          placeholder="Ex: Don Quixote"
        />
        <TextInput
          label="Author"
          name="author"
          type="text"
          placeholder="Ex: Kawabata Yasunari"
        />
        <TextInput
          label="Publisher"
          name="publisher"
          type="text"
          placeholder="Ex: HarperCollins"
        />
        <TextInput
          label="Publication year"
          name="publicationYear"
          type="text"
          placeholder="Ex: 1984"
        />
        <TextInput
          label="Price (in VND)"
          name="price"
          type="text"
          placeholder="Ex: 100000"
        />
        <TextInput
          label="Stock"
          name="stock"
          type="text"
          placeholder="Number of copies"
        />
        <TextInput
          label="Number of pages"
          name="pageNumber"
          type="text"
          placeholder="..."
        />

        <div className="flex gap-10 my-3">
          <span className="text-lg font-semibold self-center">Format</span>
          <label className="cursor-pointer select-none">
            <span className="mr-1">Paperback</span>
            <Field type="radio" name="format" value="paperback" />
          </label>
          <label className="cursor-pointer select-none">
            <span className="mr-1">Hardcover</span>
            <Field type="radio" name="format" value="hardcover" />
          </label>
        </div>

        <div className="flex gap-10 my-3">
          <span className="text-lg font-semibold">Genres</span>
          <label className="cursor-pointer select-none">
            <span className="mr-1">Fiction</span>
            <Field
              type="radio"
              name="genres"
              value="fiction"
              checked={genresExpand === "fiction"}
              onChange={(e) => setGenresExpand(e.target.value)}
            />
          </label>
          <label className="cursor-pointer select-none">
            <span className="mr-1">Nonfiction</span>
            <Field
              type="radio"
              name="genres"
              value="nonfiction"
              checked={genresExpand === "nonfiction"}
              onChange={(e) => setGenresExpand(e.target.value)}
            />
          </label>
        </div>

        {/* const CheckboxInput = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <label>
      <span>{children}</span>
      <input type="checkbox" {...field} {...props} />
    </label>
  );
}; */}

        {genresExpand === "fiction" && (
          <div className="grid grid-cols-2 md:grid-cols-5">
            <CheckboxInput
              name="genres"
              type="checkbox"
            >
              Action/Adventure
            </CheckboxInput>
            <CheckboxInput
              name="genres"
              type="checkbox"
            >
              Fantasy
            </CheckboxInput>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Action/Adventure</span>
              <Field type="checkbox" name="genres" value="action-adventure" />
            </label>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Fantasy</span>
              <Field type="checkbox" name="genres" value="fantasy" />
            </label>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Science fiction</span>
              <Field type="checkbox" name="genres" value="science-fiction" />
            </label>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Thriller/Suspense</span>
              <Field type="checkbox" name="genres" value="thriller-suspense" />
            </label>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Children</span>
              <Field type="checkbox" name="genres" value="children" />
            </label>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Romance</span>
              <Field type="checkbox" name="genres" value="romance" />
            </label>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Horror</span>
              <Field type="checkbox" name="genres" value="horror" />
            </label>
            <label className="md:col-span-2 mt-2">
              <span className="mr-2">Contemporary</span>
              <Field type="checkbox" name="genres" value="contemporary" />
            </label>
          </div>
        )}
        {genresExpand === "nonfiction" && (
          <div>
            <label htmlFor="memoir-autobiography">Memoir & Autobiography</label>
            <input type="checkbox" />
            <label htmlFor="travel">Travel</label>
            <input type="checkbox" />
            <label htmlFor="humanities-social-sciences">
              Humanities & Social Sciences
            </label>
            <input type="checkbox" />
            <label htmlFor="art-photography">Art & Photography</label>
            <input type="checkbox" />
            <label htmlFor="self-help">Self-help</label>
            <input type="checkbox" />
            <label htmlFor="history">History</label>
            <input type="checkbox" />
            <label htmlFor="science-technology">Science & Technology</label>
            <input type="checkbox" />
            <label htmlFor="children">Children</label>
            <input type="checkbox" />
          </div>
        )}

        <button type="submit" onClick={() => console.log(1)}>Submit</button>\
      </Form>
    </Formik>
  );
}
