import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const ChooseFieldCardStyles = makeStyles({
  fieldCardBorder: {
    margin: 10,
  },
  media: {
    maxHeight: 200,
  },
});

const FieldCard = ({
  checkedInitialState,
  imageUrl,
  fieldName,
  onFieldChosen,
  isDisabled,
}) => {
  const classes = ChooseFieldCardStyles();

  const onFieldClicked = () => {
    onFieldChosen(fieldName);
  };

  return (
    <Box
      className={classes.fieldCardTextContainer}
      border={checkedInitialState ? 3 : 0}
    >
      <Card>
        <CardActionArea
          disabled={isDisabled}
          className={classes.FeidCardActionArea}
          onClick={onFieldClicked}
        >
          <CardMedia className={classes.media} src={imageUrl} component="img" />
          <CardContent>
            <Grid container justify="center">
              <Typography gutterBottom variant="h5">
                {fieldName}
              </Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default FieldCard;
