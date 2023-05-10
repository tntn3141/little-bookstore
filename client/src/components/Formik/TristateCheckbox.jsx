import { useState, memo } from "react";

function TristateCheckbox(props) {
  const { name, option, inputStyle, manualSetFieldValue, index } = props;

  const [status, setStatus] = useState(0);

  // old STATUS_VALUES = [null, `${option.value}`, { $nin: `${option.value}` }]
  const STATUS_VALUES = ["", option.value, `${option.value}`];
  const STATUS_DISPLAY = [`${option.key}`, `+ ${option.key}`, `- ${option.key}`];
  const STATUS_COLORS = ["", "default-tristate-positive", "default-tristate-negative"];
  
  // No click? Nothing happens. 1st click? Change the "name" to name[0], update the value in name[0]
  // 2nd click? Change the "name" to name[1], update the value in name[1], AND remove the old value in name[0]
  // 3rd click? Change the "name to "" (basically this will link to nothing), AND remove the old value in name[1]
  // 4th click? Same as 1st click, and so on
  const NAME = ["", name[0], name[1]]

  function handleClick() {
    const newStatus = (status + 1) % STATUS_DISPLAY.length;
    setStatus(newStatus);
    // Remove the old value in its corresponding array (aka name)
    manualSetFieldValue(`${NAME[newStatus - 1]}[${index}]`, "");
    // Set the new value in its corresponding array (aka name)
    manualSetFieldValue(`${NAME[newStatus]}[${index}]`, STATUS_VALUES[newStatus]);

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
