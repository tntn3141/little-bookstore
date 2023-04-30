import { useState, memo } from "react";

function TristateCheckbox(props) {
  const { name, option, inputStyle, manualSetFieldValue, index } = props;

  const defaultInputStyle = "text-center justify-between p-1 rounded-md " +
    "cursor-pointer border-2 border-slate-800 " +
    "md:hover:text-white md:hover:bg-slate-500 ";

  const [status, setStatus] = useState(0);

  const STATUS_VALUES = [null, `${option.value}`, { $nin: `${option.value}` }];
  const STATUS_DISPLAY = [`${option.key}`, `+ ${option.key}`, `- ${option.key}`];
  const STATUS_COLORS = ["", "text-white bg-slate-800 ", "bg-slate-300 border-dashed "];

  function handleClick() {
    const newStatus = (status + 1) % STATUS_DISPLAY.length;
    setStatus(newStatus);
    manualSetFieldValue(`${name}[${index}]`, STATUS_VALUES[newStatus]);
  }

  return (
    <div className="ml-2">
      <button
        type="button"
        className={
          defaultInputStyle +
          (inputStyle ? inputStyle : "") +
          STATUS_COLORS[status]
        }
        value={STATUS_VALUES[status]}
        onClick={handleClick}
      >
        {STATUS_DISPLAY[status]}
      </button>
    </div>
  );
}
export default memo(TristateCheckbox);
