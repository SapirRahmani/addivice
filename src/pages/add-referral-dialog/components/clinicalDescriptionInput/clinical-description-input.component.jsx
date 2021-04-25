import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import {
  Slider,
  Select,
  Grid,
  CardActions,
  Button,
  MenuItem,
} from "@material-ui/core";
import {
  POUND_SENSITIVITY,
  TACTILE_SENSITIVITY,
  PROBING,
  MM,
  MOBILITY,
  TEMPERATURE_TEST,
  TEMPERATURE_TEST_VALUES,
  TOOTH_COLOR,
  TOOTH_COLOR_VALUES,
  SINUS_TRACK,
  EXIST,
  NOT_EXIST,
  DESCRIPTION,
} from "../../../../constants";
import TextInput from "../../../../assets/TextInput.component";

const ClinicalDescriptionInput = ({
  clinicalDescriptionState,
  setClinicalDescriptionState,
}) => {
  const {
    color,
    mobility,
    probing,
    poundSensitivity,
    sinusTrack,
    tactileSensitivity,
    tempratureTest,
  } = clinicalDescriptionState;

  const getTemperatureInitialState = () => {
    let returnedValue = "";
    if (TEMPERATURE_TEST_VALUES.some((element) => element === tempratureTest)) {
      returnedValue = tempratureTest;
    } else if (tempratureTest) {
      returnedValue =
        TEMPERATURE_TEST_VALUES[TEMPERATURE_TEST_VALUES.length - 1];
    }

    return returnedValue;
  };

  const getSpecialTemperatureInitialState = () => {
    if (
      getTemperatureInitialState() ===
      TEMPERATURE_TEST_VALUES[TEMPERATURE_TEST_VALUES.length - 1]
    ) {
      return tempratureTest;
    }

    return "";
  };

  const getColorInitialState = () => {
    let returnedValue = "";
    if (TOOTH_COLOR_VALUES[color]) {
      returnedValue = color;
    } else if (color) {
      returnedValue = "OTHER";
    }

    return returnedValue;
  };

  const getSpecialColorInitialState = () => {
    if (getColorInitialState() === "OTHER") {
      return color;
    }

    return "";
  };

  const [mobilityState, setMobility] = useState(mobility ? mobility : 0);
  const [poundSensitivityState, setPoundSensitivity] = useState(
    poundSensitivity ? poundSensitivity : 0
  );
  const [tactileSensitivityState, setTactileSensitivity] = useState(
    tactileSensitivity ? tactileSensitivity : 0
  );
  const [coldTestValue, setColdTestValue] = useState(
    getTemperatureInitialState()
  );
  const [coldTestSpecialValue, setColdTestSpecialValue] = useState(
    getSpecialTemperatureInitialState()
  );
  const [toothColorValue, setToothColorValue] = useState(
    getColorInitialState()
  );
  const [probingValue, setProbingValue] = useState(probing ? probing : 0);
  const [sinusTrackState, setSinusTrack] = useState(
    sinusTrack ? sinusTrack.valid : false
  );
  const [sinusTrackSpecialValue, setSinusTrackSpecialValue] = useState(
    sinusTrack ? sinusTrack.description : false
  );
  const [colorSpecialValue, setColorSpecialValue] = useState(
    getSpecialColorInitialState()
  );

  const toothColorsKeys = Object.keys(TOOTH_COLOR_VALUES);

  const useStyles = makeStyles({
    root: {
      direction: "rtl",
      justifyContent: "center",
    },
    rootTitle: {
      textAlign: "center",
      fontWeight: "bold",
    },
    title: {
      fontSize: 14,
      textAlign: "center",
    },
    value: {
      textAlign: "center",
      marginBottom: "8px",
    },
    Input: {
      maxWidth: "50px",
      marginRight: "15px",
    },
    pos: {
      marginBottom: 12,
    },
    shape: {
      width: 40,
      height: 40,
    },

    shapeCircle: {
      borderRadius: "50%",
      textAlign: "center",
      marginBottom: "8px",
    },
    switch: {
      justifyContent: "center",
    },
  });

  const classes = useStyles();

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

  const validateProbingValue = () => {
    return probingValue >= 0 && probingValue <= 100;
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.rootTitle} component="h1">
          תיאור קליני
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${POUND_SENSITIVITY}`}
        </Typography>
        <Slider
          defaultValue={0}
          step={1}
          max={3}
          min={0}
          value={poundSensitivityState}
          onChange={(event, value) => setPoundSensitivity(value)}
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
          defaultValue={0}
          step={1}
          max={3}
          min={0}
          value={tactileSensitivityState}
          onChange={(event, value) => setTactileSensitivity(value)}
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
          defaultValue={1}
          step={1}
          max={3}
          min={1}
          value={mobilityState}
          onChange={(event, value) => setMobility(value)}
          marks={sensitivity}
        />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${TEMPERATURE_TEST}`}
        </Typography>
        <div className={classes.value}>
          <Select
            value={coldTestValue}
            onChange={(e) => {
              setColdTestValue(e.target.value);
            }}
          >
            {TEMPERATURE_TEST_VALUES.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {coldTestValue === "תגובה ביתר" && (
            <TextInput
              className={classes.Input}
              textStateValue={coldTestSpecialValue}
              setTextState={setColdTestSpecialValue}
              type="number"
              placeholder="שניות"
            />
          )}
        </div>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${TOOTH_COLOR}`}
        </Typography>
        <div className={classes.value}>
          <Select
            value={toothColorValue}
            onChange={(e) => {
              setToothColorValue(e.target.value);
            }}
          >
            {toothColorsKeys.map((key) => (
              <MenuItem key={key} value={key}>
                {TOOTH_COLOR_VALUES[key].value}
              </MenuItem>
            ))}
          </Select>
          {toothColorValue === "OTHER" && (
            <TextInput
              className={classes.Input}
              textStateValue={colorSpecialValue}
              setTextState={setColorSpecialValue}
              type="text"
              placeholder="צבע"
            />
          )}
        </div>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${PROBING}`}
        </Typography>
        <div className={classes.value}>
          <TextInput
            type="number"
            textStateValue={probingValue}
            placeholder={MM}
            setTextState={setProbingValue}
            validatorFunc={() => validateProbingValue() || probingValue === ""}
          />
        </div>

        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${SINUS_TRACK}`}
        </Typography>
        <Fragment>
          <Grid container direction={"row"} className={classes.switch}>
            <Grid container item className={classes.switch}>
              <Grid item>
                <Typography>{EXIST}</Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={sinusTrackState ? true : false}
                  onChange={(e) => setSinusTrack(!sinusTrackState)}
                />
              </Grid>
              <Grid item>{NOT_EXIST}</Grid>
            </Grid>
            {sinusTrackState && (
              <Grid item>
                <TextInput
                  type="text"
                  textStateValue={sinusTrackSpecialValue}
                  placeholder={DESCRIPTION}
                  setTextState={setSinusTrackSpecialValue}
                />
              </Grid>
            )}
          </Grid>
        </Fragment>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            setClinicalDescriptionState({
              color: colorSpecialValue ? colorSpecialValue : toothColorValue,
              mobility: mobilityState,
              poundSensitivity: poundSensitivityState,
              sinusTrack: {
                valid: sinusTrackState,
                description: sinusTrackSpecialValue,
              },
              tactileSensitivity: tactileSensitivityState,
              probing: probingValue,
              tempratureTest: coldTestSpecialValue
                ? coldTestSpecialValue
                : coldTestValue,
            });
          }}
        >
          עדכן פרטים
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClinicalDescriptionInput;
