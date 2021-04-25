import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClinicalDescription from "../specificReferralScreen/components/clinicalDescriptionComponent";
import XRayDescription from "../specificReferralScreen/components/xRayDescriptionComponent";
import SoldierDetails from "./components/soldierDetailsComponent";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  CircularProgress,
  Grid,
  CardMedia,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MedicalResponsePage from "../medicalResponse/medicalResponse.page";
import PictureNotFoundImage from "../../publicassets/picture-not-found.png";

import { users } from "../../LocalStorage/constants";

import FirestoreService from "../../services/firestore";

import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  media: {
    width: "100%",
  },
}));

const SpecificReferralScreen = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const [selectedReferral, setSelectedReferral] = useState(null);

  useEffect(() => {
    const getSelectedReferral = async () => {
      FirestoreService.getSpecificReferral(match.params.referralId, {
        next: (querySnapshot) => {
          if (!querySnapshot.empty) {
            setSelectedReferral({
              id: querySnapshot.id,
              ...querySnapshot.data(),
            });
          } else {
            console.log(querySnapshot);
          }
        },
        error: () => console.log("failed to get referrals from firestore"),
      });
    };

    getSelectedReferral();
  }, [setSelectedReferral, match.params.referralId]);

  return (
    <>
      {selectedReferral ? (
        <Fragment>
          <CardMedia
            component="img"
            className={classes.media}
            src={
              selectedReferral.referralPicture
                ? selectedReferral.referralPicture
                : PictureNotFoundImage
            }
            alt="תמונת תיאור הפנייה"
          />
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                היסטוריה רפואית
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{selectedReferral.patientMedicalHistory}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>פרטי החייל</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SoldierDetails soldierDetails={selectedReferral.patientInfo} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>תיאור קליני</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ClinicalDescription {...selectedReferral.clinicalDescription} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>תיאור רנטגני</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <XRayDescription {...selectedReferral.xrayDescription} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>תשובת מומחה</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MedicalResponsePage
                response={selectedReferral.response}
                referralId={selectedReferral.id}
                isDisabled={
                  localStorage.getItem(users.FIELD_NAME) === users.UNIT_DOCTOR
                }
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Fragment>
      ) : (
        <Grid item container xs justify="center" alignItems="baseline">
          <CircularProgress />
        </Grid>
      )}
    </>
  );
};

export default SpecificReferralScreen;
