import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { USERS_TYPE } from "../../../constants";
import { users } from "../../../LocalStorage/constants";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  userType: {
    margin: 50,
  },
});

const UserType = () => {
  const classes = useStyles();
  const history = useHistory();

  const onUserClicked = (value) => {
    localStorage.setItem(users.FIELD_NAME, value);
    history.push(`/referrals`);
  };

  return (
    <Fragment>
      <Grid>
        {USERS_TYPE.map((value) => (
          <Card key={value} className={classes.userType}>
            <CardActionArea onClick={() => onUserClicked(value)}>
              <CardContent>
                <Grid container justify="center">
                  <Typography gutterBottom variant="h5">
                    {value}
                  </Typography>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Fragment>
  );
};

export default UserType;
