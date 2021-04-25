import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CheckCircleOutlined } from "@material-ui/icons";
import PictureNotFoundImage from "../../../../publicassets/picture-not-found.png";
import {
  Grid,
  CardActions,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";

import moment from "moment";

import { useHistory, useRouteMatch } from "react-router-dom";

import FirestoreService from "../../../../services/firestore";
import { useState } from "react";

const useStyles = makeStyles({
  media: {
    maxHeight: 300,
  },
  isAnswered: {
    width: 50,
    height: 50,
    color: green[300],
  },
  referralCard: {
    maxWidth: 400,
  },
});

const ReferralsCard = ({
  mediaUrl,
  privateNumber,
  isAnswered,
  updatedDate,
  patientName,
  department,
  id,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);

  const deleteReferral = async () => {
    setIsLoading(true);
    try {
      await FirestoreService.deleteSpecificReferral(id);
      setIsLoading(false);
      toast.warn("פנייה הוסרה בהצלחה");
    } catch (error) {
      console.log(`failed to delete referral with error: ${error}`);
      setIsLoading(false);
      toast.error("מחיקת פנייה נכשלה");
    }
  };

  const onReferralCardClicked = () => {
    history.push(`${match.url}/${id}`);
  };

  return (
    <Card className={classes.referralCard}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <CardActionArea onClick={onReferralCardClicked}>
            <CardMedia
              className={classes.media}
              src={mediaUrl ? mediaUrl : PictureNotFoundImage}
              component="img"
            />
            <CardContent>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {department}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    {moment(updatedDate).format("L")}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="span"
                  >
                    {`${patientName}  ${privateNumber}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {isAnswered ? (
                    <CheckCircleOutlined className={classes.isAnswered} />
                  ) : undefined}
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton onClick={deleteReferral}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Fragment>
      )}
    </Card>
  );
};

export default ReferralsCard;
