import React from "react";
import MedicalResponse from "./components/medicalResponse.component";

const MedicalResponsePage = ({ response, referralId, isDisabled }) => {
  return (
    <>
      <MedicalResponse
        {...response}
        referralId={referralId}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default MedicalResponsePage;
