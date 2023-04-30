import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./Formik/FormikErrorMessageText";

export default function ImageUpload(props) {
  const { label, name, value, ...rest } = props;
  const [image, setImage] = useState();

  function handleChange(e) {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="file" name={name} onChange={handleChange} />
    </div>
    // <div>
    //   <label htmlFor={name}>{label}</label>
    //   <Field type="file" accept="image/*" name={name} {...rest} />
    //   <ErrorMessage name={name} component={FormikErrorMessageText} />
    // </div>
  )
}