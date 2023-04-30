import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function Select(props) {
  const { label, name, options, className, labelStyle, inputStyle, ...rest } =
    props;
  const defaultLabelStyle = "font-bold text-base my-2";
  const defaultInputStyle = "mx-2 border border-black";

  return (
    <div className={"my-4 relative " + (className ? className : "")}>
      <label
        htmlFor={name}
        className={defaultLabelStyle + (labelStyle ? labelStyle : "")}
      >
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        className={defaultInputStyle + (inputStyle ? inputStyle : "")}
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
