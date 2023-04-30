import { Field } from "formik";
import { useState, useEffect } from "react";

export default function Tristate(props) {
  const {
    label,
    name,
    options,
    manualSetFieldValue,
    values,
    className,
    labelStyle,
    inputStyle,
    ...rest
  } = props;
  const defaultLabelStyle = "font-bold text-base my-1";
  const defaultInputStyle = "appearance-none";

  const [status, setStatus] = useState(0);
  // To intialize some value to the genres array first,
  // so `genres[${i}]` can be used later without unexpected behavior
  useEffect(() => {
    console.log("useEffect in Tristate firing");
    for (let i in options) {
      manualSetFieldValue(`genres[${i}]`, "");
    }
  }, []);

  return (
    // The whitespace at the end of the string & the round brackets
    // enclosing the ternary operators are important!

    <Field name={name}>
      {({ field }) => {
        return options.map((option, index) => {
          const STATUS_STATES = [
            `${option.key}`,
            `+ ${option.key}`,
            `- ${option.key}`,
          ];
          function handleClick() {
            const newStatus = (status + 1) % STATUS_STATES.length;
            setStatus(newStatus);
            manualSetFieldValue(`genres[${index}]`, STATUS_STATES[newStatus]);
            console.log(values);
          }

          return (
            <div key={option.key} className="ml-2">
              <input
                type="text"
                readOnly
                className={defaultInputStyle + " " + inputStyle}
                {...field} // Refer to the comment on line 5
                value={STATUS_STATES[status]}
                onClick={handleClick}
                // value={option.value} // Refer to the comment on line 5
              />
              <input type="hidden" />
            </div>
          );
        });
      }}
    </Field>
  );
}
