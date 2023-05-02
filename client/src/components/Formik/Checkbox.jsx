import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function Checkbox(props) {
  const {
    label,
    name,
    options,
    containerStyle,
    labelStyle,
    inputStyle,
    subLabelStyle,
    ...rest
  } = props;

  return (
    <div className={"default-container " + (containerStyle ? containerStyle : "")}>
      <div className="my-1">
        <label className={"default-label " + (labelStyle ? labelStyle : "")}>
          {label}
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <Field name={name}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <div key={option.key}>
                  <input
                    type="checkbox"
                    id={option.value}
                    {...field}
                    {...rest}
                    value={option.value}
                    className={"hidden peer " + (inputStyle ? inputStyle : "")}
                    checked={field.value.includes(option.value)}
                  />
                  <label
                    htmlFor={option.value}
                    className={"default-checkbox-sublabel " + (subLabelStyle ? subLabelStyle : "")}
                  >
                    {option.key}
                  </label>
                </div>
              );
            });
          }}
        </Field>
      </div>

      <ErrorMessage component={FormikErrorMessageText} name={name} />
    </div>
  );
}
