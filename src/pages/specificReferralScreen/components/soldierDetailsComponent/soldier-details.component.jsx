import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  PRIVATE_NUMBER,
  FULL_NAME,
  AGE,
  GENDER,
  UNIT,
} from "../../../../constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
    direction: "rtl",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  value: {
    textAlign: "center",
    marginBottom: "8px",
  },
  pos: {
    marginBottom: 12,
  },
});

const SoldierDetails = ({ soldierDetails }) => {
  const classes = useStyles();
  const { age, fullName, gender, privateNumber, unit } = soldierDetails;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div id="privateNumber">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${PRIVATE_NUMBER}`}
          </Typography>
          <Typography className={classes.value} variant="h5" component="h2">
            {privateNumber}
          </Typography>
        </div>
        <div id="fullName">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${FULL_NAME}`}
          </Typography>
          <Typography className={classes.value} variant="h5" component="h2">
            {fullName}
          </Typography>
        </div>
        <div id="age">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${AGE}`}
          </Typography>
          <Typography className={classes.value} variant="h5" component="h2">
            {age}
          </Typography>
        </div>
        <div id="gender">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${GENDER}`}
          </Typography>
          <Typography className={classes.value} variant="h5" component="h2">
            {gender}
          </Typography>
        </div>
        <div id="unit">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${UNIT}`}
          </Typography>
          <Typography className={classes.value} variant="h5" component="h2">
            {unit}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoldierDetails;
