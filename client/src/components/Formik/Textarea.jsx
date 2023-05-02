import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function Textarea(props) {
  const { label, name, containerStyle, labelStyle, inputStyle, ...rest } =
    props;

  return (
    // The whitespace at the end of the string & the round brackets
    // enclosing the ternary operator are important!
    <div
      className={"default-container" + (containerStyle ? containerStyle : "")}
    >
      <label
        htmlFor={name}
        className={"default-label " + (labelStyle ? labelStyle : "")}
      >
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        rows="3"
        className={"default-textarea-input " + (inputStyle ? inputStyle : "")}
        {...rest}
      />
      <ErrorMessage name={name} component={FormikErrorMessageText} />
    </div>
  );
}
