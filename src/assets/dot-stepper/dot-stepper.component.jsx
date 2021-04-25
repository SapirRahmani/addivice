import React from "react";
import { makeStyles } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const DotStepperStyles = makeStyles((theme) => ({
  referralDialogStepper: {
    position: "sticky",
    bottom: 0,
    width: "100%",
  },
}));

const DotStepper = ({
  numberOfSteps,
  currentStep,
  setCurrentStep,
  onFinish,
  isNextDisabled,
}) => {
  const classes = DotStepperStyles();

  const handleNext = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      className={classes.referralDialogStepper}
      variant="dots"
      steps={numberOfSteps}
      position="static"
      activeStep={currentStep}
      backButton={
        <Button size="small" onClick={handleBack} disabled={currentStep === 0}>
          חזור
          <KeyboardArrowRight />
        </Button>
      }
      nextButton={
        <Button
          size="small"
          onClick={currentStep === numberOfSteps - 1 ? onFinish : handleNext}
          disabled={isNextDisabled}
        >
          <KeyboardArrowLeft />
          {currentStep === numberOfSteps - 1 ? (
            <Typography variant="subtitle2">סיים</Typography>
          ) : (
            <Typography variant="subtitle2">הבא</Typography>
          )}
        </Button>
      }
    />
  );
};

export default DotStepper;
