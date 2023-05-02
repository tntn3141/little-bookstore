import { Field, ErrorMessage } from "formik";
import FormikErrorMessageText from "./FormikErrorMessageText";

// IMPORTANT: The order of "{...field}","value={option.value}" matters!
// Because "field" has "value" property (which is the "value" of the ENTIRE <Field>, and is different from the "value" of EACH RADIO INPUT)
// so "value" needs to be overwritten as "value={option.value}"" AFTER "{...field}" so that the radio input works properly
// Why did I use "{...field}" at line 26? Because I needed to make of use formik's onBlur, onChange, name inside "field"
// You can use destructuring to get onBlur, onChange, name out instead to replace "{...field}" on line 26, but this looks cleaner in my opinion

// Default style: radio input is not displayed

export default function Radio(props) {
  const {
    label,
    name,
    options,
    containerStyle,
    labelStyle,
    inputStyle,
    subLabelstyle,
    ...rest
  } = props;

  return (
    // The whitespace at the end of the string & the round brackets
    // enclosing the ternary operators are important!
    <div className={"default-list-container " + (containerStyle ? containerStyle : "")}>
      <label
        htmlFor={name}
        className={"default-label " + (labelStyle ? labelStyle : "")}
      >
        {label}
      </label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div key={option.key} className="ml-2">
                <input
                  type="radio"
                  id={option.value}
                  className={
                    "default-list-input " + (inputStyle ? inputStyle : "")
                  }
                  {...field} // Refer to the comment on line 5
                  value={option.value} // Refer to the comment on line 5
                  checked={field.value === option.value}
                />
                <label
                  htmlFor={option.value}
                  className={
                    "default-list-label " + (subLabelstyle ? subLabelstyle : "")
                  }
                >
                  {option.key}
                </label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage component={FormikErrorMessageText} name={name} />
    </div>
  );
}
