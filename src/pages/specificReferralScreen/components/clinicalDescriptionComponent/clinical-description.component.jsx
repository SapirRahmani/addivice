import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Slider, Badge } from "@material-ui/core";
import {
  POUND_SENSITIVITY,
  PROBING,
  MM,
  TACTILE_SENSITIVITY,
  MOBILITY,
  TEMPERATURE_TEST,
  TOOTH_COLOR,
  TOOTH_COLOR_VALUES,
  SINUS_TRACK,
} from "../../../../constants";

const ClinicalDescription = ({
  poundSensitivity,
  tactileSensitivity,
  mobility,
  tempratureTest,
  color = "PROPER",
  probing,
  sinusTrack,
}) => {
  const toothColorHEX = TOOTH_COLOR_VALUES[color].color;

  const useStyles = makeStyles({
    root: {
      width: `100%`,
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
    shape: {
      backgroundColor: toothColorHEX,
      width: 40,
      height: 40,
    },

    shapeCircle: {
      border: `solid grey 1px`,
      borderRadius: "50%",
      textAlign: "center",
      marginBottom: "8px",
    },
  });

  const classes = useStyles();
  const circle = <span className={clsx(classes.shape, classes.shapeCircle)} />;

  const sensitivity = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
  ];

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${POUND_SENSITIVITY}`}
        </Typography>
        <Slider
          disabled
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          value={poundSensitivity}
          step={1}
          max={3}
          min={0}
          marks={sensitivity}
        />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${TACTILE_SENSITIVITY}`}
        </Typography>
        <Slider
          disabled
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          value={tactileSensitivity}
          step={1}
          max={3}
          min={0}
          marks={sensitivity}
        />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${MOBILITY}`}
        </Typography>
        <Slider
          disabled
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          value={mobility}
          step={1}
          max={3}
          min={1}
          marks={sensitivity}
        />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${TEMPERATURE_TEST}`}
        </Typography>
        <Typography className={classes.value}>{tempratureTest}</Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${TOOTH_COLOR}`}
        </Typography>
        <Typography className={classes.value}>
          <Badge overlap="circle">{circle}</Badge>
        </Typography>
        <Typography className={classes.value}>
          {TOOTH_COLOR_VALUES[color].value}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${PROBING}`}
        </Typography>
        <Typography className={classes.value}>{`${probing} ${MM}`}</Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${SINUS_TRACK}`}
        </Typography>
        <Typography className={classes.value}>
          {sinusTrack.valid ? sinusTrack.description : "אין"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClinicalDescription;
