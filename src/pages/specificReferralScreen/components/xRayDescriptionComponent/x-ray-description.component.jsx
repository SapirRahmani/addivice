import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  TOOTH_TITLE,
  LINT_BUREAU,
  STRUCTURE,
  LINT_TUNNEL,
  PDL,
} from "../../../../constants";

const XRayDescription = ({
  toothTitle,
  lintBureau,
  structure,
  lintTunnel,
  pdl,
}) => {
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
  });

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div id="tooth-title">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${TOOTH_TITLE}`}
          </Typography>
          <Typography className={classes.value}>{toothTitle}</Typography>
        </div>
        <div id="lint-bureau">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${LINT_BUREAU}`}
          </Typography>
          <Typography className={classes.value}>{lintBureau}</Typography>
        </div>
        <div id="structure">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${STRUCTURE}`}
          </Typography>
          <Typography className={classes.value}>
            {structure.valid ? structure.description : "אין"}
          </Typography>
        </div>
        <div id="lint-tunnel">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${LINT_TUNNEL}`}
          </Typography>
          <Typography className={classes.value}>{lintTunnel}</Typography>
        </div>
        <div id="pdl">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${PDL}`}
          </Typography>
          <Typography className={classes.value}>{pdl}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default XRayDescription;
