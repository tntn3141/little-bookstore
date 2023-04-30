import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function Textarea(props) {
  const { label, name, className, labelStyle, inputStyle, ...rest } = props;

  const defaultClassName = "my-4 relative";
  const defaultLabelStyle = "font-bold text-base my-1";
  const defaultInputStyle =
    "my-1 bg-slate-200 text-justify border-2 resize-y " +
    "appearance-none w-full p-1 border-gray-200 " +
    "focus:outline-none focus:bg-white focus:border-blue-500";

  return (
    // The whitespace at the end of the string & the round brackets
    // enclosing the ternary operator are important!
    <div className={defaultClassName + (className ? className : "")}>
      <label
        htmlFor={name}
        className={defaultLabelStyle + (labelStyle ? labelStyle : "")}
      >
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        rows="3"
        className={defaultInputStyle + (inputStyle ? inputStyle : "")}
        {...rest}
      />
      <ErrorMessage name={name} component={FormikErrorMessageText} />
    </div>
  );
}
