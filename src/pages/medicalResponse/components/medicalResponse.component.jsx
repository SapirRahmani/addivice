import React, { useState, Fragment } from "react";
import { pulp_diagnosis, diagnosis, treatment_plan } from "../../../constants";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Grid,
  Select,
  Typography,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";

import FirestoreService from "../../../services/firestore";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  responseFreeText: {
    width: "100%",
    marginTop: 15,
  },
  btn: {
    marginTop: 15,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  value: {
    textAlign: "center",
    marginBottom: "8px",
  },
}));

const MedicalResponse = ({
  isDisabled,
  referralId,
  pulp,
  diagnose,
  treatment,
  freeText,
}) => {
  const classes = useStyles();
  const [pulpValue, setPulpValue] = useState(pulp ? pulp : "");
  const [diagnoseValue, setDiagnoseValue] = useState(diagnose ? diagnose : "");
  const [treatmentValue, setTreatmentValue] = useState(
    treatment ? treatment : ""
  );
  const [freeTextValue, setFreeTextValue] = useState(freeText ? freeText : "");
  const [isLoading, setIsLoading] = useState(false);

  const pulp_diagnosis_options = () => {
    return (
      <Select
        disabled={isDisabled}
        value={pulpValue}
        onChange={(e) => setPulpValue(e.target.value)}
      >
        {pulp_diagnosis.map((value, idx) => (
          <MenuItem key={idx} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const diagnosis_options = () => {
    return (
      <Select
        disabled={isDisabled}
        value={diagnoseValue}
        onChange={(e) => setDiagnoseValue(e.target.value)}
      >
        idx
        {diagnosis.map((value, idx) => (
          <MenuItem key={idx} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const treatment_options = () => {
    return (
      <Select
        disabled={isDisabled}
        value={treatmentValue}
        onChange={(e) => setTreatmentValue(e.target.value)}
      >
        {treatment_plan.map((value, idx) => (
          <MenuItem key={idx} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      await FirestoreService.updateSpecificReferral(referralId, {
        pulp: pulpValue,
        diagnose: diagnoseValue,
        treatment: treatmentValue,
        freeText: freeTextValue,
      });
      setIsLoading(false);
      toast.success("תשובה הוזנה בהצלחה");
    } catch (error) {
      console.log(`failed to update referral response with error: ${error}`);
      setIsLoading(false);
      toast.error("תקלה בעת הזנת תשובה");
    }
  };

  const getMedicalResponseDataComponent = () => {
    return (
      <Fragment>
        <Typography
          color="textSecondary"
          gutterBottom
          className={classes.title}
        >
          אבחנת מוך השן
        </Typography>
        {pulp_diagnosis_options()}
        <Typography
          color="textSecondary"
          gutterBottom
          className={classes.title}
        >
          אבחנת סב חוד השן
        </Typography>
        {diagnosis_options()}
        <Typography
          color="textSecondary"
          gutterBottom
          className={classes.title}
        >
          תכנית טיפול
        </Typography>
        {treatment_options()}
        <TextField
          id="outlined-multiline-static"
          disabled={isDisabled}
          className={classes.responseFreeText}
          multiline
          label="מלל חופשי"
          rows={4}
          variant="outlined"
          value={freeTextValue}
          onChange={(event) => setFreeTextValue(event.target.value)}
        />
        <Button
          fullWidth
          className={classes.btn}
          onClick={onConfirm}
          variant="contained"
          color="primary"
          disabled={isDisabled}
        >
          הזן
        </Button>
      </Fragment>
    );
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {isLoading ? <CircularProgress /> : getMedicalResponseDataComponent()}
    </Grid>
  );
};

export default MedicalResponse;
