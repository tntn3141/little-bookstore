import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function Input(props) {
  const { label, name, containerStyle, labelStyle, inputStyle, ...rest } = props;

  return (
    <div className={"default-container " + (containerStyle ? containerStyle : "")}>
      <div>
        <label
          htmlFor={name}
          className={"default-label " + (labelStyle ? labelStyle : "")}
        >
          {label}
        </label>
      </div>
      <div>
        <Field
          id={name}
          name={name}
          className={"default-input " + (inputStyle ? inputStyle : "")}
          {...rest}
        />
      </div>
      <div>
        <ErrorMessage name={name} component={FormikErrorMessageText} />
      </div>
    </div>
  );
}
