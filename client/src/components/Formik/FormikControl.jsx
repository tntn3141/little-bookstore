import React from "react";
import Textarea from "./Textarea";
import Input from "./Input";
import Select from "./Select";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import TristateHelper from "./TristateHelper";
import ImageUpload from "../ImageUpload";

export default function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "tristate-checkbox":
      return <TristateHelper {...rest} />;
    case "upload":
      return <ImageUpload {...rest} />;
    default:
      return null;
  }
}
