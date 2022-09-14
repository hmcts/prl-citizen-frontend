import { CaseWithId } from '../../../app/case/case';
import { MiamTable, Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setMIAMDetails = (respondent: Respondent, req: AppRequest): Respondent => {
  let miamFromResponsent: MiamTable;
  if (respondent?.value?.response && respondent?.value?.response?.miam) {
    miamFromResponsent = respondent?.value?.response?.miam;
    miamFromResponsent.applicantAttendedMiam = req.session.userCase.miamStart;
    miamFromResponsent.claimingExemptionMiam = req.session.userCase.miamWillingness;
    miamFromResponsent.familyMediatorServiceName = req.session.userCase.miamNotWillingExplnation;
  } else {
    respondent.value.response = {
      miam: {
        applicantAttendedMiam: req.session.userCase.miamStart,
        claimingExemptionMiam: req.session.userCase.miamWillingness,
        familyMediatorServiceName: req.session.userCase.miamNotWillingExplnation,
      },
    };
  }
  return respondent;
};

//get the values from db and set the value to request user session front end fields
export const getMIAMDetails = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
  if (respondent?.value?.response?.miam?.applicantAttendedMiam === YesOrNo.YES) {
    req.session.userCase.miamStart = YesOrNo.YES;
    req.session.userCase.miamWillingness = YesOrNo.NO;
    req.session.userCase.miamNotWillingExplnation = '';
  } else if (respondent?.value?.response?.miam?.applicantAttendedMiam === YesOrNo.NO) {
    if (respondent?.value?.response?.miam?.claimingExemptionMiam === YesOrNo.YES) {
      req.session.userCase.miamStart = YesOrNo.NO;
      req.session.userCase.miamWillingness = YesOrNo.YES;
      req.session.userCase.miamNotWillingExplnation = '';
    } else if (respondent?.value?.response?.miam?.claimingExemptionMiam === YesOrNo.NO) {
      req.session.userCase.miamStart = YesOrNo.NO;
      req.session.userCase.miamWillingness = YesOrNo.NO;
      req.session.userCase.miamNotWillingExplnation = respondent?.value?.response?.miam?.familyMediatorServiceName;
    }
  }

  return req.session.userCase;
};
