import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Select, CardActions, Button, MenuItem } from "@material-ui/core";
import {
  TOOTH_TITLE,
  TOOTH_TITLE_VALUES,
  XRAY_DENSITY,
  MM,
  ROOT_CLOGGING_LENGTH,
  LINT_BUREAU,
  LINT_BUREAU_VALUES,
  STRUCTURE,
  STRUCTURE_VALUES,
  LINT_TUNNEL,
  LINT_TUNNEL_VALUES,
  ROOT_CLOGGING,
  ROOT_CLOGGING_VALUES,
  XRAY_DENSITY_VALUES,
  ROOT_CLOGGING_LENGTH_VALUES,
  PDL,
  PDL_VALUES,
  STRUCTURE_WITH_STAKE_VALUES,
  OTHER,
} from "../../../../constants";
import TextInput from "../../../../assets/TextInput.component";
import SuggestedInput from "../../../../assets/SuggestedInput.component";

const XRayDescriptionInput = ({
  xrayDescriptionState,
  setXrayDescriptionState,
}) => {
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
  });

  const classes = useStyles();

  const {
    lintBureau,
    lintTunnel,
    pdl,
    structure,
    toothTitle,
  } = xrayDescriptionState;

  const toothTitleInitialState = () => {
    if (toothTitle) {
      if (TOOTH_TITLE_VALUES.some((title) => title === toothTitle)) {
        return toothTitle;
      } else {
        return OTHER;
      }
    }
    return "";
  };

  const toothTitleSpecialValueInitialState = () => {
    if (toothTitleInitialState() === OTHER) {
      return toothTitle;
    } else {
      return "";
    }
  };

  const lintBureauInitialValue = () => {
    if (LINT_BUREAU_VALUES.some((title) => title === lintBureau)) {
      return lintBureau;
    } else if (lintBureau) {
      return OTHER;
    } else {
      return "";
    }
  };

  const lintBureauSpecialValueInitialState = () => {
    if (lintBureauInitialValue() === OTHER) {
      return lintBureau;
    } else {
      return "";
    }
  };

  const stakeValueInitialState = () => {
    if (
      STRUCTURE_WITH_STAKE_VALUES.some(
        (title) => title === structure.description
      )
    ) {
      return structure.description;
    } else {
      return OTHER;
    }
  };

  const stakeSpecialValueInitialState = () => {
    if (stakeValueInitialState() === OTHER) {
      return structure.description;
    } else {
      return "";
    }
  };

  const lintTunnelValueInitialState = () => {
    if (lintTunnel) {
      if (LINT_TUNNEL_VALUES.some((value) => value === lintTunnel)) {
        return lintTunnel;
      }
    } else {
      return "";
    }

    return LINT_TUNNEL_VALUES[2];
  };

  const rootCloggingValueInitialState = () => {
    if (lintTunnel) {
      if (ROOT_CLOGGING_VALUES.some((value) => value === lintTunnel)) {
        return lintTunnel;
      }
    } else {
      return "";
    }

    return ROOT_CLOGGING_VALUES[1];
  };

  const rootCloggingLengthValueInitialState = () => {
    if (lintTunnel) {
      if (ROOT_CLOGGING_LENGTH_VALUES.some((value) => value === lintTunnel)) {
        return lintTunnel;
      }
    } else {
      return "";
    }

    return OTHER;
  };

  const xrayDensityValueInitialState = () => {
    if (lintTunnel) {
      if (XRAY_DENSITY_VALUES.some((value) => value === lintTunnel)) {
        return lintTunnel;
      }
    } else {
      return "";
    }

    return OTHER;
  };

  const xrayDensitySpecialValueInitialState = () => {
    if (xrayDensityValueInitialState() === OTHER) {
      return lintTunnel;
    }

    return "";
  };

  const pdlValueInitialState = () => {
    if (pdl) {
      if (PDL_VALUES.some((value) => value === pdl)) {
        return pdl;
      }
    } else {
      return "";
    }

    return PDL_VALUES[2];
  };

  const pdlSpecialValueInitialState = () => {
    if (pdlValueInitialState() === PDL_VALUES[2]) {
      return pdl;
    }

    return "";
  };

  const getLintTunnelValueToSend = () => {
    if (lintTunnelValue === LINT_TUNNEL_VALUES[2]) {
      if (rootCloggingValue === ROOT_CLOGGING_VALUES[1]) {
        if (xrayDensityValue === OTHER) {
          return xrayDensitySpecialValue;
        }
        return xrayDensityValue;
      } else {
        return rootCloggingValue;
      }
    } else {
      return lintTunnelValue;
    }
  };

  const getStructureValueToSend = () => {
    return {
      valid: structureValue !== STRUCTURE_VALUES[0],
      description: stakeSpecialValue ? stakeSpecialValue : stakeValue,
    };
  };

  const validateRlCircumference = () => {
    return rlCircumference > 0 && rlCircumference <= 100;
  };

  const [toothTitleValue, setToothTitleValue] = useState(
    toothTitleInitialState()
  );
  const [toothTitleSpecialValue, setToothTitleSpecialValue] = useState(
    toothTitleSpecialValueInitialState()
  );
  const [lintBureauValue, setLintBureauValue] = useState(
    lintBureauInitialValue()
  );
  const [lintBureauSpecialValue, setLintBureauSpecialValue] = useState(
    lintBureauSpecialValueInitialState()
  );
  const [structureValue, setStructureValue] = useState(
    structure.valid ? STRUCTURE_VALUES[1] : ""
  );
  const [stakeValue, setStakeValue] = useState(stakeValueInitialState());
  const [stakeSpecialValue, setStakeSpecialValue] = useState(
    stakeSpecialValueInitialState()
  );
  const [lintTunnelValue, setLintTunnelValue] = useState(
    lintTunnelValueInitialState()
  );
  const [rootCloggingValue, setRootCloggingValue] = useState(
    rootCloggingValueInitialState()
  );
  const [rootCloggingLengthValue, setRootCloggingLengthValue] = useState(
    rootCloggingLengthValueInitialState()
  );
  const [xrayDensityValue, setXrayDensityValue] = useState(
    xrayDensityValueInitialState()
  );
  const [xrayDensitySpecialValue, setXrayDensitySepcialValue] = useState(
    xrayDensitySpecialValueInitialState()
  );
  const [pdlValue, setPdlValue] = useState(pdlValueInitialState());
  const [rlCircumference, setRlCircumference] = useState(
    pdlSpecialValueInitialState()
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.rootTitle} component="h1">
          תיאור רנטגני
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${TOOTH_TITLE}`}
        </Typography>
        <div className={classes.value}>
          <SuggestedInput
            VALUES={TOOTH_TITLE_VALUES}
            currValue={toothTitleValue}
            currSpecialValue={toothTitleSpecialValue}
            setValue={setToothTitleValue}
            setSpecialValue={setToothTitleSpecialValue}
          />
        </div>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${LINT_BUREAU}`}
        </Typography>
        <div className={classes.value}>
          <SuggestedInput
            VALUES={LINT_BUREAU_VALUES}
            currValue={lintBureauValue}
            currSpecialValue={lintBureauSpecialValue}
            setValue={setLintBureauValue}
            setSpecialValue={setLintBureauSpecialValue}
          />
        </div>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${STRUCTURE}`}
        </Typography>
        <div className={classes.value}>
          <Select
            value={structureValue}
            onChange={(e) => setStructureValue(e.target.value)}
          >
            {STRUCTURE_VALUES.map((value, idx) => (
              <MenuItem key={idx} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {structureValue === STRUCTURE_VALUES[1] && (
            <SuggestedInput
              VALUES={STRUCTURE_WITH_STAKE_VALUES}
              currValue={stakeValue}
              currSpecialValue={stakeSpecialValue}
              setValue={setStakeValue}
              setSpecialValue={setStakeSpecialValue}
            />
          )}
        </div>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${LINT_TUNNEL}`}
        </Typography>
        <div className={classes.value}>
          <Select
            value={lintTunnelValue}
            onChange={(e) => setLintTunnelValue(e.target.value)}
          >
            {LINT_TUNNEL_VALUES.map((value, idx) => (
              <MenuItem key={idx} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {lintTunnelValue === LINT_TUNNEL_VALUES[2] && (
            <Fragment>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {`${ROOT_CLOGGING}`}
              </Typography>
              <Select
                value={rootCloggingValue}
                onChange={(e) => setRootCloggingValue(e.target.value)}
              >
                {ROOT_CLOGGING_VALUES.map((value, idx) => (
                  <MenuItem key={idx} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {rootCloggingValue === ROOT_CLOGGING_VALUES[0] && (
                <Fragment>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {`${ROOT_CLOGGING_LENGTH}`}
                  </Typography>
                  <Select
                    value={rootCloggingLengthValue}
                    onChange={(e) => setRootCloggingLengthValue(e.target.value)}
                  >
                    {ROOT_CLOGGING_LENGTH_VALUES.map((value, idx) => (
                      <MenuItem key={idx} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Fragment>
              )}
              {rootCloggingValue === ROOT_CLOGGING_VALUES[1] && (
                <Fragment>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {`${XRAY_DENSITY}`}
                  </Typography>
                  <SuggestedInput
                    VALUES={XRAY_DENSITY_VALUES}
                    currValue={xrayDensityValue}
                    currSpecialValue={xrayDensitySpecialValue}
                    setValue={setXrayDensityValue}
                    setSpecialValue={setXrayDensitySepcialValue}
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`${PDL}`}
        </Typography>
        <div className={classes.value}>
          <Select
            value={pdlValue}
            onChange={(e) => setPdlValue(e.target.value)}
          >
            {PDL_VALUES.map((value, idx) => (
              <MenuItem key={idx} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {pdlValue === PDL_VALUES[2] && (
            <TextInput
              placeholder={MM}
              type="number"
              textStateValue={rlCircumference}
              validatorFunc={validateRlCircumference}
              setTextState={setRlCircumference}
            />
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() =>
            setXrayDescriptionState({
              lintBureau: lintBureauSpecialValue
                ? lintBureauSpecialValue
                : lintBureauValue,
              lintTunnel: getLintTunnelValueToSend(),
              pdl: rlCircumference ? rlCircumference : pdlValue,
              structure: getStructureValueToSend(),
              toothTitle: toothTitleSpecialValue
                ? toothTitleSpecialValue
                : toothTitleValue,
            })
          }
        >
          עדכן פרטים
        </Button>
      </CardActions>
    </Card>
  );
};

export default XRayDescriptionInput;
