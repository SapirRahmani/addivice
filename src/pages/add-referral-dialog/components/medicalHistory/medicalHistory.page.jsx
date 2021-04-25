import React from "react";
import MedicalHistory from "./components/medical-history/medicalHistory.component";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    direction: "rtl",
    justifyContent: "center",
  },
});
const MedicalHistoryPage = ({
  medicalHistoryState,
  setMedicalHistoryState,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs>
          <Typography variant="h5" gutterBottom>
            היסטוריה רפואית
          </Typography>
        </Grid>
        <Grid item xs>
          <MedicalHistory
            MedicalHistory={medicalHistoryState}
            setMedicalHistory={setMedicalHistoryState}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MedicalHistoryPage;
