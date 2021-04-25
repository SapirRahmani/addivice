import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  historyText: {
    maxWidth: 300,
  },
}));

const MedicalHistory = ({ MedicalHistory, setMedicalHistory }) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        dir="rtl"
        variant="outlined"
        value={MedicalHistory}
        onChange={(event) => setMedicalHistory(event.target.value)}
        className={classes.historyText}
      />
    </div>
  );
};

export default MedicalHistory;
