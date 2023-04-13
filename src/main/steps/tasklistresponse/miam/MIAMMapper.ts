import { CaseWithId } from '../../../app/case/case';
import { Miam, Respondent, YesOrNo } from '../../../app/case/definition';

export const prepareMIAMRequest = (userCase: CaseWithId): Miam => {
  const { miamStart, miamWillingness, miamNotWillingExplnation } = userCase;
  const miamFromResponsent: Miam = {};
  Object.assign(miamFromResponsent, {
    attendedMiam: miamStart,
    willingToAttendMiam: miamStart === YesOrNo.NO ? miamWillingness : null,
    reasonNotAttendingMiam:
      miamWillingness === YesOrNo.YES || miamStart === YesOrNo.YES ? '' : miamNotWillingExplnation,
  });
  return miamFromResponsent;
};

export const mapMIAMRequest = (respondent: Respondent): Partial<CaseWithId> => {
  const { attendedMiam, willingToAttendMiam, reasonNotAttendingMiam } = respondent.value.response.miam!;
  const miamcontent = {
    miamStart: attendedMiam,
    miamWillingness: willingToAttendMiam,
    miamNotWillingExplnation: reasonNotAttendingMiam,
  };

  return miamcontent;
};
