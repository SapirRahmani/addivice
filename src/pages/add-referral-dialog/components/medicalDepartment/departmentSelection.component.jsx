import React, { Fragment } from "react";
import { departments } from "../../../../constants";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  departmentButton: {
    width: 200,
  },
}));

const DepartmentSelection = ({
  chosenDepartmentState,
  setChosenDepartmentState,
}) => {
  const classes = useStyles();

  const handleClick = (department) => {
    setChosenDepartmentState(department);
  };

  const getDepartments = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        {departments.map((department) => {
          // אנדודונטיה refactor later to dep, now we have only one department
          return (
            <Grid key={department} item>
              <Button
                disabled={department !== "אנדודונטיה"}
                variant="contained"
                color={
                  chosenDepartmentState !== department ? "primary" : "secondary"
                }
                className={classes.departmentButton}
                onClick={() => handleClick(department)}
              >
                {department}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return <Fragment>{getDepartments()}</Fragment>;
};

export default DepartmentSelection;
