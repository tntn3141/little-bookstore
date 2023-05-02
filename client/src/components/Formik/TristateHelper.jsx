import { Field } from "formik";
import TristateCheckbox from "./TristateCheckbox";

export default function Tristate(props) {
  const {
    label,
    name,
    manualSetFieldValue,
    options,
    containerStyle,
    labelStyle,
  } = props;

  return (
    // The whitespace at the end of the string & the round brackets
    // enclosing the ternary operators are important!
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
