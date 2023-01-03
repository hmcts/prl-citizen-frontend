import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const setSupportDetails = (respondent: Respondent, req: AppRequest): Respondent => {
  //const safetyConcerns = req.session.userCase.c1A_safteyConcerns ?? {};
  // req.session.userCase.c1A_concernAboutChild.forEach((abuse: string) => {
  //   if (req.session?.userCase?.c1A_safteyConcerns?.child?.[`${abuse}`]) {
  //     if (safetyConcerns.child) {
  //       safetyConcerns.child[`${abuse}`].childrenConcernedAbout =
  //         req.session?.userCase?.c1A_safteyConcerns?.child?.[`${abuse}`].childrenConcernedAbout.join(',');
  //     }
  //   }
  // });
  respondent.value.response = {
    supportYouNeed: {
      communicationSupportOther: req.session.userCase?.communicationSupportOther,
      courtComfort: req.session.userCase?.courtComfort,
      courtHearing: req.session.userCase?.courtHearing,
      courtProceedingProvideDetails: req.session.userCase?.courtProceedingProvideDetails,
      describeOtherNeed: req.session.userCase?.describeOtherNeed,
      docsSupport: req.session.userCase.docsSupport,
      helpCommunication: req.session.userCase?.helpCommunication,
      languageDetails: req.session.userCase?.languageDetails,
      otherDetails: req.session.userCase.otherDetails,
      otherProvideDetails: req.session.userCase?.otherProvideDetails,
      unableForCourtProceedings: req.session.userCase?.unableForCourtProceedings,
      reasonableAdjustments: req.session.userCase.reasonableAdjustments,
      languageRequirements: req.session.userCase.languageRequirements,
      safetyArrangements: req.session.userCase.safetyArrangements,
      safetyArrangementsDetails: req.session.userCase.safetyArrangementsDetails,
      travellingOtherDetails: req.session.userCase.travellingOtherDetails,
      travellingToCourt: req.session.userCase.travellingToCourt,
    },
  };

  return respondent;
};
