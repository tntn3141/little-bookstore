import { useState, memo } from "react";

function TristateCheckbox(props) {
  const { name, option, inputStyle, manualSetFieldValue, index } = props;

  const [status, setStatus] = useState(0);

  const STATUS_VALUES = [null, `${option.value}`, { $nin: `${option.value}` }];
  const STATUS_DISPLAY = [`${option.key}`, `+ ${option.key}`, `- ${option.key}`];
  const STATUS_COLORS = ["", "default-tristate-positive", "default-tristate-negative"];

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
          "default-tristate-input " +
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
