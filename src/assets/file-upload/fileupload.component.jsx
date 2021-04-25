import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles(() => ({
  upload: {
    display: "none",
  },
  media: {
    maxWidth: 300,
  },
  root: {
    marginTop: 15,
    marginBottom: 5,
  },
  photoCamera: {
    justifyContent: "center",
  },
}));

const FileUpload = ({ file, setFile }) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(
    file ? URL.createObjectURL(file) : null
  );

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setDisplay(URL.createObjectURL(e.target.files[0]));
  }

  function checkFileType() {
    return file?.name.split(".")[1] === "mp4";
  }

  // refactor later: send file to firebase after clicking next

  return (
    <Card variant="outlined" className={classes.root}>
      <CardMedia>
        <video
          className={classes.media}
          poster={display}
          controls={checkFileType()}
          autoPlay
        >
          <source src={display} type="video/mp4" />
        </video>
      </CardMedia>

      <CardContent>
        <input
          accept="image/*"
          className={classes.upload}
          id="icon-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="icon-button-file" className={classes.photoCamera}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
