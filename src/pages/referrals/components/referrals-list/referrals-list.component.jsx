import React, { useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import ReferralCard from "../referral-card";
import { makeStyles, Typography } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

const ReferralListStyles = makeStyles((theme) => ({
  listItem: {
    width: "-webkit-fill-available",
    maxWidth: 600,
  },
  word: {
    marginTop: '16px', marginBottom: '16px',
  },
  flex: {
    display: 'flex',
  }
}));

const ReferralsList = ({ referralsList }) => {
  const classes = ReferralListStyles();
  const [filtered, setFiltered] = useState(false);

  const renderReferrals = () => {
    let referrals = referralsList;

    if (filtered) {
      referrals = referrals.filter((referral) => {
        return referral.response ? false : true
      })
    }

    return (<Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      {referrals.map((referral) => (
        <Grid key={referral.id} item xs={10} lg={3} md={4} sm={6}>
          <ReferralCard
            id={referral.id}
            department={referral.department}
            patientName={referral.patientInfo.fullName}
            mediaUrl={referral.referralPicture}
            privateNumber={referral.patientInfo.privateNumber}
            isAnswered={referral.response ? true : false}
            updatedDate={referral.updatedTime}
          />
        </Grid>))}
    </Grid>)
  }

  return (
    <Fragment>
      <div className={classes.flex}>
        <Checkbox onChange={(e) => setFiltered(!filtered)} />
        <Typography className={classes.word}>הסתר הפניות שטופלו</Typography>
      </div>
      {renderReferrals()}
    </Fragment >
  );
};

export default ReferralsList;

