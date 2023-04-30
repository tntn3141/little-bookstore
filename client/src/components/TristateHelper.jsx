import { useState } from "react";
import { Field } from "formik";

export default function TristateHelper(props) {
  const { label, name, options, ...rest } = props;

  return (
    <div className="flex flex-wrap gap-2">
      <label>{label}</label>
      <div>
        {options.map((option, index) => {
          const STATUS_STATES = [
            `${option.key}`,
            `+ ${option.key}`,
            `- ${option.key}`,
          ];
          const [status, setStatus] = useState(0);
          function handleClick(e) {
            const newStatus = (status + 1) % STATUS_STATES.length;
            setStatus(newStatus);
            console.log(e.target.value);
          }
          console.log(`${name}[${index}]`)
          return (
            <Field
              key={option.key}
              name={`${name}[${index}]`}
              readOnly
              value={STATUS_STATES[status]}
              onClick={handleClick}
              className={
                "inline-flex items-center p-1 " +
                "rounded-md cursor-pointer justify-between" +
                "border-2 border-slate-800 select-none" +
                "md:hover:text-white md:hover:bg-slate-500 "
              }
              {...rest}
            />
          );
        })}
      </div>
    </div>
  );
}

// {options.map((option) => {
//   return (
//     <TristateCheckbox key={option.key} option={option} {...rest} />
//   );
// })}
