import { CaseWithId } from '../../../app/case/case';
import { Miam, Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setMIAMDetails = (respondent: Respondent, req: AppRequest): Miam => {
  const { miamStart, miamWillingness, miamNotWillingExplnation } = req.session.userCase;
  const miamFromResponsent: Miam = respondent.value.response.miam!;
  Object.assign(miamFromResponsent, {
    attendedMiam: miamStart,
    willingToAttendMiam: miamWillingness,
    reasonNotAttendingMiam: miamWillingness === YesOrNo.NO ? miamNotWillingExplnation : '',
  });
  return miamFromResponsent;
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
