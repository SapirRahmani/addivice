import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@material-ui/core";
import DotStepper from "../../assets/dot-stepper";
import ChooseField from "./components/choose-field";
import AddReferralConstants from "./add-referal.constants";
import PatientInfo from "./components/patient-info";
import MedicalHistoryPage from "./components/medicalHistory";
import FileUpload from "../../assets/file-upload";
import DepartmentSelection from "./components/medicalDepartment";
import ClinicalDescriptionInput from "./components/clinicalDescriptionInput";
import XRayDescriptionInput from "./components/xRayDescriptionInput";
import { toast } from "react-toastify";

import FirestoreService from "../../services/firestore";

import { withRouter } from "react-router-dom";

const AddReferralDialog = ({ history }) => {
  const {
    CLINICAL_DESCRIPTION_INITIAL_STATE,
    DEPARTMENT_INITIAL_STATE,
    PATIENT_INFO_INITIAL_STATE,
    PATIENT_MEDICAL_HISTORY_INITIAL_STATE,
    REFERRAL_FIELD_INITIAL_STATE,
    REFERRAL_PICTURE_INITIAL_STATE,
    X_RAY_DESCRIPTION_INITIAL_STATE,
  } = AddReferralConstants;

  const [open, setOpen] = useState(true);
  const [referralField, setReferralField] = useState(
    REFERRAL_FIELD_INITIAL_STATE
  );
  const [patientInfo, setPatientInfo] = useState(PATIENT_INFO_INITIAL_STATE);
  const [patientMedicalHistory, setPatientMedicalHistory] = useState(
    PATIENT_MEDICAL_HISTORY_INITIAL_STATE
  );
  const [referralPicture, setReferralPicture] = useState(
    REFERRAL_PICTURE_INITIAL_STATE
  );
  const [department, setDepartment] = useState(DEPARTMENT_INITIAL_STATE);
  const [clinicalDescription, setClinicalDescription] = useState(
    CLINICAL_DESCRIPTION_INITIAL_STATE
  );
  const [xrayDescription, setXrayDescription] = useState(
    X_RAY_DESCRIPTION_INITIAL_STATE
  );

  const [currentStep, setCurrentStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  const onFinishAddProcess = async () => {
    setIsLoading(true);
    try {
      await FirestoreService.addReferralToCollection({
        referralField,
        patientInfo,
        patientMedicalHistory,
        referralPicture,
        department,
        clinicalDescription,
        xrayDescription,
        updatedTime: Date.now(),
      });
      setIsLoading(false);
      toast.success("פנייה נוספה בהצלחה");
      handleClose();
    } catch (error) {
      setIsLoading(false);
      console.log(`error adding referral: ${error}`);
      toast.error("כשל בעת הוספת פנייה");
    }
  };

  const getCurrentComponent = () => {
    switch (currentStep) {
      case 1: {
        return (
          <ChooseField
            chosenFieldState={referralField}
            setChosenFieldState={setReferralField}
          />
        );
      }
      case 0: {
        return (
          <PatientInfo
            patientInfoState={patientInfo}
            setPatientInfoState={setPatientInfo}
          />
        );
      }
      case 2: {
        return (
          <Grid container direction="row" justify="center" alignItems="center">
            <MedicalHistoryPage
              medicalHistoryState={patientMedicalHistory}
              setMedicalHistoryState={setPatientMedicalHistory}
            />
          </Grid>
        );
      }
      case 3: {
        return (
          <Grid container direction="row" justify="center" alignItems="center">
            <FileUpload file={referralPicture} setFile={setReferralPicture} />
          </Grid>
        );
      }
      case 4: {
        return (
          <DepartmentSelection
            chosenDepartmentState={department}
            setChosenDepartmentState={setDepartment}
          />
        );
      }
      case 5: {
        return (
          <ClinicalDescriptionInput
            clinicalDescriptionState={clinicalDescription}
            setClinicalDescriptionState={setClinicalDescription}
          />
        );
      }
      case 6: {
        return (
          <XRayDescriptionInput
            xrayDescriptionState={xrayDescription}
            setXrayDescriptionState={setXrayDescription}
          />
        );
      }
      default: {
        return (
          <ChooseField
            chosenFieldState={referralField}
            setChosenFieldState={setReferralField}
          />
        );
      }
    }
  };

  const isNextDisabled = () => {
    let isDisabled = true;

    switch (currentStep) {
      case 1:
        isDisabled = referralField === REFERRAL_FIELD_INITIAL_STATE;
        break;
      case 0:
        isDisabled = patientInfo === PATIENT_INFO_INITIAL_STATE;
        break;
      case 2:
        isDisabled =
          patientMedicalHistory === PATIENT_MEDICAL_HISTORY_INITIAL_STATE;
        break;
      case 3:
        isDisabled = false;
        break;
      case 4:
        isDisabled = department === DEPARTMENT_INITIAL_STATE;
        break;
      case 5: {
        isDisabled = clinicalDescription === CLINICAL_DESCRIPTION_INITIAL_STATE;
        break;
      }
      case 6: {
        isDisabled = false;
        break;
      }
      default:
        isDisabled = true;
        break;
    }

    return isDisabled;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="פופאפ הוספת הפנייה"
      aria-describedby="פה מזינים הפנייה"
      PaperProps={{ style: { maxHeight: "600px" } }}
    >
      <DialogContent>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs>
            {isLoading ? <CircularProgress /> : getCurrentComponent()}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <DotStepper
          numberOfSteps={7}
          currentStep={currentStep}
          onFinish={onFinishAddProcess}
          setCurrentStep={setCurrentStep}
          isNextDisabled={isLoading ? isLoading : isNextDisabled()}
        />
      </DialogActions>
    </Dialog>
  );
};

export default withRouter(AddReferralDialog);
