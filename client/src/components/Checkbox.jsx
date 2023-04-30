import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

export default function Checkbox(props) {
  const {
    label,
    name,
    options,
    className,
    labelStyle,
    inputStyle,
    subLabelStyle,
    ...rest
  } = props;
  const defaultLabelStyle = "font-bold text-base my-1";
  const defaultInputStyle = "hidden peer";
  const defaultSubLabelStyle =
    "inline-flex items-center justify-between p-1 " +
    "rounded-md cursor-pointer border-2 border-slate-800 " +
    "peer-checked:bg-slate-800 peer-checked:text-white " +
    "md:hover:text-white md:hover:bg-slate-500 ";

  return (
    <div
      className={
        "my-4 relative  " + (className ? className : "")
      }
    >
      <div className="my-1">
        <label className={defaultLabelStyle}>{label}</label>
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
                    className={
                      defaultInputStyle + (inputStyle ? inputStyle : "")
                    }
                    checked={field.value.includes(option.value)}
                  />
                  <label
                    htmlFor={option.value}
                    className={defaultSubLabelStyle}
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
