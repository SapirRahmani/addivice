import REFERRAL_ACTION_TYPES from "./referrals.types";

export const updateReferralsList = (referralsList) => ({
  type: REFERRAL_ACTION_TYPES.UPDATE_REFERRALS_LIST,
  payload: referralsList,
});
