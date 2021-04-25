import React from "react";
import { users } from "../../LocalStorage/constants";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";

const addFabStyles = makeStyles((theme) => ({
  addFab: {
    position: "fixed",
    right: 10,
    bottom: 10,
  },
}));

const AddFab = ({ action, dataCy }) => {
  const classes = addFabStyles();

  return (
    <div className={classes.addFab} data-cy={dataCy}>
      <Tooltip title="Add" aria-label="add">
        <Fab
          disabled={
            localStorage.getItem(users.FIELD_NAME) === users.EXPERT_DOCTOR
          }
          color="primary"
          onClick={action}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default AddFab;
