import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";
import TextInput from "./TextInput.component";
import { OTHER, DESCRIPTION } from "../constants";

const useStyles = makeStyles((theme) => ({}));

const SuggestedInput = ({
  VALUES,
  currValue,
  currSpecialValue,
  setValue,
  setSpecialValue,
  placeholder = DESCRIPTION,
  type = "text",
}) => {
  const classes = useStyles();

  const NEW_VALUES = [...VALUES, OTHER];

  return (
    <div>
      <Select
        value={currValue}
        onChange={(e) => {
          setSpecialValue("");
          setValue(e.target.value);
        }}
      >
        {NEW_VALUES.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {currValue === OTHER && (
        <TextInput
          className={classes.Input}
          textStateValue={currSpecialValue}
          type={type}
          placeholder={placeholder}
          setTextState={setSpecialValue}
        />
      )}
    </div>
  );
};

export default SuggestedInput;
