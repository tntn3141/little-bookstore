import { Field } from "formik";
import TristateCheckbox from "./TristateCheckbox";
import Test from "./Test";

export default function Tristate(props) {
  const {
    label,
    name,
    options,
    values,
    className,
    labelStyle,
    inputStyle
  } = props;
  const defaultLabelStyle = "font-bold text-base my-1";
  const defaultInputStyle = "appearance-none";

  return (
    // The whitespace at the end of the string & the round brackets
    // enclosing the ternary operators are important!
    <div
      className={
        "my-2 relative flex items-center " + (className ? className : "")
      }
    >
      <label
        htmlFor={name}
        className={defaultLabelStyle + " " + (labelStyle ? labelStyle : "")}
      >
        {label}
      </label>
      <Field name={name}>
        {({ field }) => {
          options.map((option) => { return option
            // <TristateCheckbox field={field} option={option} {...rest} />;
          });
        }}
      </Field>
    </div>
  );
}
