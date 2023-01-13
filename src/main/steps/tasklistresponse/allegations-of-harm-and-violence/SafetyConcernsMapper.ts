import { CaseWithId } from '../../../app/case/case';
import { Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setSafetyConcerns = (respondent: Respondent, req: AppRequest): Respondent => {
  const otherConcerns =
    {
      c1AkeepingSafeStatement: req.session.userCase.PRL_c1A_keepingSafeStatement,
      c1AsupervisionAgreementDetails: req.session.userCase.PRL_c1A_supervisionAgreementDetails,
      c1AagreementOtherWaysDetails: req.session.userCase.PRL_c1A_agreementOtherWaysDetails,
      c1AotherConcernsDrugs: req.session.userCase.PRL_c1A_otherConcernsDrugs,
      c1AotherConcernsDrugsDetails: req.session.userCase.PRL_c1A_otherConcernsDrugsDetails,
      c1AchildSafetyConcerns: req.session.userCase.PRL_c1A_childSafetyConcerns,
      c1AchildSafetyConcernsDetails: req.session.userCase.PRL_c1A_childSafetyConcernsDetails,
    } ?? {};

  const Abductions =
    {
      c1AabductionReasonOutsideUk: req.session.userCase.PRL_c1A_abductionReasonOutsideUk,
      c1AchildsCurrentLocation: req.session.userCase.PRL_c1A_childsCurrentLocation,
      c1AchildrenMoreThanOnePassport: req.session.userCase.PRL_c1A_childrenMoreThanOnePassport,
      c1ApossessionChildrenPassport: req.session.userCase.PRL_c1A_possessionChildrenPassport,
      c1AprovideOtherDetails: req.session.userCase.PRL_c1A_provideOtherDetails,
      c1ApassportOffice: req.session.userCase.PRL_c1A_passportOffice,
      c1AabductionPassportOfficeNotified: req.session.userCase.PRL_c1A_abductionPassportOfficeNotified,
      c1ApreviousAbductionsShortDesc: req.session.userCase.PRL_c1A_previousAbductionsShortDesc,
      c1ApoliceOrInvestigatorInvolved: req.session.userCase.PRL_c1A_policeOrInvestigatorInvolved,
      c1ApoliceOrInvestigatorOtherDetails: req.session.userCase.PRL_c1A_policeOrInvestigatorOtherDetails,
      c1AchildAbductedBefore: req.session.userCase.PRL_c1A_childAbductedBefore,
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
