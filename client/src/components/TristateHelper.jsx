import { Field } from "formik";
import TristateCheckbox from "./TristateCheckbox";

export default function Tristate(props) {
  const { label, name, manualSetFieldValue, options, className, labelStyle, inputStyle, } =
    props;
  // There must be a whitespace at the end of the following string
  const defaultLabelStyle = "font-bold text-base my-1 ";

  return (
    // The whitespace at the end of the string & the round brackets
    // enclosing the ternary operators are important!
    <div
      className={
        "my-4 relative flex items-center flex-wrap " + (className ? className : "")
      }
    >
      <label
        htmlFor={name}
        className={defaultLabelStyle + (labelStyle ? labelStyle : "")}
      >
        {label}
      </label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option, index) => (
            <TristateCheckbox
              key={option.key}
              index={index}
              option={option}
              name={name}
              manualSetFieldValue={manualSetFieldValue}
            />
          ));
        }}
      </Field>
    </div>
  );
}
