import React from "react";
import Appbar from "./assets/appbar.component";
import ReferralsPage from "./pages/referrals";
import UserTypePage from "./pages/userType";

import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <>
      <Appbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/identification" />
        </Route>
        <Route path="/identification" component={UserTypePage} />
        <Route path="/referrals" component={ReferralsPage} />
      </Switch>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        autoClose={3000}
        rtl={true}
      />
    </>
  );
}

export default App;
