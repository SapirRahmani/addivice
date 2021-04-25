import React, { Fragment } from "react";
import UserType from "./components/userType.component";
import { withRouter } from "react-router-dom";

const UserTypePage = () => {
  return (
    <Fragment>
      <UserType />
    </Fragment>
  );
};

export default withRouter(UserTypePage);
