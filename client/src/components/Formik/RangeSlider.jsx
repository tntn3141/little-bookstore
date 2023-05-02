import React from "react";
import { Field } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function RangeSlider(props) {
  const { label, name, containerStyle, labelStyle, inputStyle, ...rest } = props;

  return (
    // The whitespace at the end of the string & the round brackets 
    // enclosing the ternary operator are important!
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
          as="range"
          id={name}
          name={name}
          className={"default-slider-input " + (inputStyle ? inputStyle : "")}
          {...rest}
        />
      </div>
      <div>
        <ErrorMessage name={name} component={FormikErrorMessageText} />
      </div>
    </div>
  );
}
