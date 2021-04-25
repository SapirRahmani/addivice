import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChooseFieldCard from "./components/choose-field-card";
import {
  teethField,
  planeField,
  medicineField,
} from "./choose-field.constants";

const ChooseFieldStyles = makeStyles({
  chooseFieldHeadline: {
    marginTop: 20,
  },
  fieldSection: {
    marginTop: 40,
  },
});

const ChooseField = ({ chosenFieldState, setChosenFieldState }) => {
  const classes = ChooseFieldStyles();
  const [fields] = useState([teethField, planeField, medicineField]);

  const onFieldChosen = (fieldName) => {
    setChosenFieldState(fieldName);
  };

  const fieldsSection = () => (
    <Grid
      className={classes.fieldSection}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      {fields.map((field) => {
        const { id, name, image } = field;
        return (
          <Grid key={id} item xs={4}>
            <ChooseFieldCard
              isDisabled={name !== "שיניים"}
              fieldName={name}
              imageUrl={image}
              onFieldChosen={onFieldChosen}
              checkedInitialState={name === chosenFieldState}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Fragment>
      <Typography className={classes.chooseFieldHeadline} variant="h4">
        בחר תחום:
      </Typography>
      {fieldsSection()}
    </Fragment>
  );
};

export default ChooseField;
