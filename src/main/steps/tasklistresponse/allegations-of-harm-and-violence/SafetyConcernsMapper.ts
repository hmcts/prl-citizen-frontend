import { CaseWithId } from '../../../app/case/case';
import { Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setSafetyConcerns = (respondent: Respondent, req: AppRequest): Respondent => {
  if (req.session.userCase.c1A_concernAboutChild) {
    const safetyConcerns = req.session.userCase.c1A_safteyConcerns ?? {};
    req.session.userCase.c1A_concernAboutChild.forEach((abuse: string) => {
      if (req.session?.userCase?.c1A_safteyConcerns?.child?.[`${abuse}`]) {
        if (safetyConcerns.child) {
          safetyConcerns.child[`${abuse}`].childrenConcernedAbout =
            req.session?.userCase?.c1A_safteyConcerns?.child?.[`${abuse}`].childrenConcernedAbout.join(',');
        }
      }
    });
    respondent.value.response = {
      safetyConcerns,
    };
  } else {
    respondent.value.response = {
      safetyConcerns: req.session.userCase.c1A_safteyConcerns,
    };
  }

  return respondent;
};

export const getSafetyConcerns = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
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
