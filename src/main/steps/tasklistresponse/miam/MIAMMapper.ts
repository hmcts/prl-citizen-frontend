import { CaseWithId } from '../../../app/case/case';
import { Miam, Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setMIAMDetails = (respondent: Respondent, req: AppRequest): Respondent => {
  let miamFromResponsent: Miam;
  if (respondent?.value?.response && respondent?.value?.response?.miam) {
    miamFromResponsent = respondent?.value?.response?.miam;
    miamFromResponsent.attendedMiam = req.session.userCase.miamStart;
    miamFromResponsent.willingToAttendMiam = req.session.userCase.miamWillingness;
    miamFromResponsent.reasonNotAttendingMiam = req.session.userCase.miamNotWillingExplnation;
    respondent.value.response.miam = miamFromResponsent;
  } else {
    respondent.value.response = {
      miam: {
        attendedMiam: req.session.userCase.miamStart,
        willingToAttendMiam: req.session.userCase.miamWillingness,
        reasonNotAttendingMiam: req.session.userCase.miamNotWillingExplnation,
      },
    };
  }
  return respondent;
};

export const getMIAMDetails = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
  if (respondent?.value?.response?.miam?.attendedMiam === YesOrNo.YES) {
    req.session.userCase.miamStart = YesOrNo.YES;
    req.session.userCase.miamWillingness = YesOrNo.NO;
    req.session.userCase.miamNotWillingExplnation = '';
  } else if (respondent?.value?.response?.miam?.attendedMiam === YesOrNo.NO) {
    if (respondent?.value?.response?.miam?.willingToAttendMiam === YesOrNo.YES) {
      req.session.userCase.miamStart = YesOrNo.NO;
      req.session.userCase.miamWillingness = YesOrNo.YES;
      req.session.userCase.miamNotWillingExplnation = '';
    } else if (respondent?.value?.response?.miam?.willingToAttendMiam === YesOrNo.NO) {
      req.session.userCase.miamStart = YesOrNo.NO;
      req.session.userCase.miamWillingness = YesOrNo.NO;
      req.session.userCase.miamNotWillingExplnation = respondent?.value?.response?.miam?.reasonNotAttendingMiam;
    }
  }

  return req.session.userCase;
};
