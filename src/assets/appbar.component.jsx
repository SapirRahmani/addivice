import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import MedicIcon from "../icons/IDF_medical.png";
import HeadquartersIcon from "../icons/IDF_Headquarters.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    width: `100%`,
  },
  title: {
    flexGrow: 1,
    fontWeight: "bolder",
    color: "white",
    direction: "initial",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "white",
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
}));

const Appbar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CardMedia className={classes.icon} src={MedicIcon} component="img" />
          <CardMedia
            className={classes.icon}
            src={HeadquartersIcon}
            component="img"
          />
          <Typography
            direction="ltr"
            variant="h5"
            color="inherit"
            className={classes.title}
            onClick={() => history.replace("/referrals")}
          >
            Addivice
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
