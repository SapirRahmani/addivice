import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextInput from "../../../../assets/TextInput.component";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  button: {
    marginTop: "20px",
  },
  bage: {
    justifyContent: "center",
    display: "grid",
  },
  radio: {
    marginRight: "0px",
  },
});

const PatientInfoCard = ({ patientInfoState, setPatientInfoState }) => {
  const classes = useStyles();
  const { age, fullName, gender, privateNumber, unit } = patientInfoState;
  const [personalNumberState, setPrivateNumber] = useState(
    privateNumber ? privateNumber : ""
  );
  const [fullNameState, setFullName] = useState(fullName ? fullName : "");
  const [ageState, setAge] = useState(age ? age : "");
  const [genderState, setGender] = useState(gender ? gender : "");
  const [unitState, setUnit] = useState(unit ? unit : "");

  const validatePrivateNumber = () => {
    return /^\d{7}$/.test(personalNumberState);
  };

  const validateFullName = () => {
    return /^[א-ת\s"]+$/.test(fullNameState) && fullNameState !== "";
  };

  const validateAge = () => {
    return (
      /^\d+$/.test(ageState) &&
      parseInt(ageState) >= 18 &&
      parseInt(ageState) <= 60
    );
  };

  const validateGender = () => {
    return genderState !== "";
  };

  const validateUnit = () => {
    return /^[א-ת\s"\d]+$/.test(unitState) && unitState !== "";
  };

  const validateInfo = () => {
    return (
      validatePrivateNumber() &&
      validateFullName() &&
      validateAge() &&
      validateGender() &&
      validateUnit()
    );
  };

  const submitInfo = () => {
    if (validateInfo()) {
      setPatientInfoState({
        privateNumber: personalNumberState,
        fullName: fullNameState,
        age: ageState,
        gender: genderState,
        unit: unitState,
      });
    } else {
      toast.error("פרטים שגויים או חסרים");
    }
  };

  return (
    <Card>
      <CardContent className={classes.bage}>
        <TextInput
          placeholder={"מספר אישי"}
          textStateValue={personalNumberState}
          setTextState={setPrivateNumber}
          validatorFunc={() =>
            validatePrivateNumber() || personalNumberState === ""
          }
          maxLength={7}
        />
        <TextInput
          placeholder={"שם"}
          textStateValue={fullNameState}
          setTextState={setFullName}
          validatorFunc={() => validateFullName() || fullNameState === ""}
        />
        <TextInput
          placeholder={"גיל"}
          textStateValue={ageState}
          setTextState={setAge}
          validatorFunc={() => validateAge() || ageState === ""}
          maxLength={2}
        />
        <TextInput
          placeholder={"יחידה"}
          textStateValue={unitState}
          setTextState={setUnit}
          validatorFunc={() => validateUnit() || unitState === ""}
        />
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={genderState}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel
            className={classes.radio}
            value="נקבה"
            control={<Radio />}
            label="נקבה"
          />
          <FormControlLabel
            className={classes.radio}
            value="זכר"
            control={<Radio />}
            label="זכר"
          />
          <FormControlLabel
            className={classes.radio}
            value="אחר"
            control={<Radio />}
            label="אחר"
          />
        </RadioGroup>
        <Button
          fullWidth
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={submitInfo}
        >
          עדכן פרטים
        </Button>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
