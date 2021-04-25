import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = ({
  placeholder,
  textStateValue,
  setTextState,
  type = "text",
  validatorFunc = () => true,
  maxLength,
}) => {
  return (
    <TextField
      label={placeholder}
      type={type}
      inputProps={{
        maxLength: maxLength,
      }}
      error={!validatorFunc()}
      placeholder={placeholder}
      value={textStateValue}
      onChange={(e) => setTextState(e.target.value)}
    />
  );
};

export default TextInput;
