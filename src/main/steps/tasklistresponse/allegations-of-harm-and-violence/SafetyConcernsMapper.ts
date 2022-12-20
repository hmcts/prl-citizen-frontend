import { CaseWithId } from '../../../app/case/case';
import { Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setSafetyConcerns = (respondent: Respondent, req: AppRequest): Respondent => {
  const otherConcerns =
    {
      c1A_keepingSafeStatement: req.session.userCase.PRL_c1A_keepingSafeStatement,
      c1A_supervisionAgreementDetails: req.session.userCase.PRL_c1A_supervisionAgreementDetails,
      c1A_agreementOtherWaysDetails: req.session.userCase.PRL_c1A_agreementOtherWaysDetails,
      c1A_otherConcernsDrugs: req.session.userCase.PRL_c1A_otherConcernsDrugs,
      c1A_otherConcernsDrugsDetails: req.session.userCase.PRL_c1A_otherConcernsDrugsDetails,
      c1A_childSafetyConcerns: req.session.userCase.PRL_c1A_childSafetyConcerns,
      c1A_childSafetyConcernsDetails: req.session.userCase.PRL_c1A_childSafetyConcernsDetails,
    } ?? {};

  const Abductions =
    {
      c1A_abductionReasonOutsideUk: req.session.userCase.PRL_c1A_abductionReasonOutsideUk,
      c1A_childsCurrentLocation: req.session.userCase.PRL_c1A_childsCurrentLocation,
      c1A_childrenMoreThanOnePassport: req.session.userCase.PRL_c1A_childrenMoreThanOnePassport,
      c1A_possessionChildrenPassport: req.session.userCase.PRL_c1A_possessionChildrenPassport,
      c1A_provideOtherDetails: req.session.userCase.PRL_c1A_provideOtherDetails,
      c1A_passportOffice: req.session.userCase.PRL_c1A_passportOffice,
      c1A_abductionPassportOfficeNotified: req.session.userCase.PRL_c1A_abductionPassportOfficeNotified,
      c1A_previousAbductionsShortDesc: req.session.userCase.PRL_c1A_previousAbductionsShortDesc,
      c1A_policeOrInvestigatorInvolved: req.session.userCase.PRL_c1A_policeOrInvestigatorInvolved,
      c1A_policeOrInvestigatorOtherDetails: req.session.userCase.PRL_c1A_policeOrInvestigatorOtherDetails,
      c1A_childAbductedBefore: req.session.userCase.PRL_c1A_childAbductedBefore,
    } ?? {};
  if (req.session.userCase.PRL_c1A_concernAboutChild) {
    const safetyConcerns = req.session.userCase.PRL_c1A_safteyConcerns ?? {};

    req.session.userCase.PRL_c1A_concernAboutChild.forEach((abuse: string) => {
      if (req.session?.userCase?.PRL_c1A_safteyConcerns?.child?.[`${abuse}`]) {
        if (safetyConcerns.child) {
          safetyConcerns.child[`${abuse}`].childrenConcernedAbout =
            req.session?.userCase?.PRL_c1A_safteyConcerns?.child?.[`${abuse}`].childrenConcernedAbout.join(',');
        }
      }
    });
    (respondent.value.response.safetyConcerns!.c1asafetyconcerns = safetyConcerns),
      (respondent.value.response.safetyConcerns!.otherconcerns = otherConcerns);
    respondent.value.response.safetyConcerns!.abductions = Abductions;
  } else {
    (respondent.value.response.safetyConcerns!.c1asafetyconcerns = req.session.userCase.PRL_c1A_safteyConcerns ?? {}),
      (respondent.value.response.safetyConcerns!.otherconcerns = otherConcerns);
    respondent.value.response.safetyConcerns!.abductions = Abductions;
  }
  console.log(respondent.value.response.safetyConcerns);
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
