import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function Select(props) {
  const {
    label,
    name,
    options,
    containerStyle,
    labelStyle,
    inputStyle,
    ...rest
  } = props;

  return (
    <div
      className={
        "default-tristate-container " + (containerStyle ? containerStyle : "")
      }
    >
      <label
        htmlFor={name}
        className={"default-label " + (labelStyle ? labelStyle : "")}
      >
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        className={"default-select-input " + (inputStyle ? inputStyle : "")}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={FormikErrorMessageText} />
    </div>
  );
}
