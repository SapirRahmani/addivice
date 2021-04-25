import React, { useEffect, Fragment } from "react";
import ReferralsList from "./components/referrals-list";
import AddFab from "../../assets/add-fab";
import AddReferralDialog from "../add-referral-dialog";
import SpecificReferralPage from "../specificReferralScreen";
import { makeStyles } from "@material-ui/core";

import FirestoreService from "../../services/firestore";

import { useDispatch, useSelector } from "react-redux";
import { updateReferralsList } from "../../redux/referrals/referrals.actions";

import { Switch, Route, withRouter } from "react-router-dom";

const ReferralsPageStyles = makeStyles((theme) => ({
  referralsList: {
    marginTop: 20,
  },
}));

const ReferralsPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const referrals = useSelector((state) => state.referrals.referralsList);
  const classes = ReferralsPageStyles();

  useEffect(() => {
    FirestoreService.streamReferrals({
      next: (querySnapshot) => {
        if (!querySnapshot.empty) {
          const updatedReferrals = querySnapshot.docs.map((docSnapshot) => ({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          }));

          // Sort referrals by date
          updatedReferrals.sort((refA, refB) => refB.updatedTime - refA.updatedTime);
          dispatch(updateReferralsList(updatedReferrals));
        } else {
          console.log(querySnapshot);
        }
      },
      error: () => console.log("failed to get referrals from firestore"),
    });
  }, [dispatch]);

  const mainPage = () => {
    return (
      <Fragment>
        <div className={classes.referralsList}>
          <ReferralsList referralsList={referrals} />
        </div>

        <AddFab action={() => history.push(`${match.url}/add`)} />
      </Fragment>
    );
  };

  return (
    <Switch>
      <Route exact path={`${match.url}`} component={mainPage} />
      <Route path={`${match.url}/add`} component={AddReferralDialog} />
      <Route
        path={`${match.url}/:referralId`}
        component={SpecificReferralPage}
      />
    </Switch>
  );
};

export default withRouter(ReferralsPage);
