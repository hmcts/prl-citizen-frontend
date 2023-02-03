import { CaseWithId } from '../../../app/case/case';
import {
  PRL_C1AAbuseTypes,
  PRL_C1ASafteyConcernsAbout,
  PRL_C1ASafteyConcerns_total,
  Respondent,
  YesOrNo,
} from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const prepareRequest = (respondent: Respondent, req: AppRequest): PRL_C1ASafteyConcerns_total => {
  const {
    PRL_c1A_haveSafetyConcerns,
    PRL_c1A_safetyConernAbout,
    PRL_c1A_concernAboutChild,
    PRL_c1A_concernAboutRespondent,
    PRL_c1A_keepingSafeStatement,
    PRL_c1A_supervisionAgreementDetails,
    PRL_c1A_agreementOtherWaysDetails,
    PRL_c1A_otherConcernsDrugs,
    PRL_c1A_otherConcernsDrugsDetails,
    PRL_c1A_childSafetyConcerns,
    PRL_c1A_childSafetyConcernsDetails,
    PRL_c1A_abductionReasonOutsideUk,
    PRL_c1A_childsCurrentLocation,
    PRL_c1A_childrenMoreThanOnePassport,
    PRL_c1A_possessionChildrenPassport,
    PRL_c1A_provideOtherDetails,
    PRL_c1A_passportOffice,
    PRL_c1A_abductionPassportOfficeNotified,
    PRL_c1A_previousAbductionsShortDesc,
    PRL_c1A_policeOrInvestigatorInvolved,
    PRL_c1A_policeOrInvestigatorOtherDetails,
    PRL_c1A_childAbductedBefore,
    PRL_c1A_safteyConcerns,
  } = req.session.userCase;
  let request: PRL_C1ASafteyConcerns_total = {};

  if (PRL_c1A_concernAboutChild?.length) {
    request.child = {};
    PRL_c1A_concernAboutChild.forEach((abuse: string) => {
      if (PRL_c1A_safteyConcerns?.child?.[abuse]) {
        request.child = {
          ...request.child,
          [abuse]: {
            ...PRL_c1A_safteyConcerns?.child?.[abuse],
            childrenConcernedAbout: PRL_c1A_safteyConcerns?.child?.[abuse].childrenConcernedAbout.join(','),
          },
        };
      }
    });
  }

  if (PRL_c1A_concernAboutRespondent) {
    request.respondent = {};
    PRL_c1A_concernAboutRespondent.forEach((abuse: string) => {
      if (PRL_c1A_safteyConcerns?.respondent?.[abuse]) {
        request.respondent = {
          ...request.respondent,
          [abuse]: PRL_c1A_safteyConcerns?.respondent?.[abuse],
        };
      }
    });
  }

  Object.assign(request, {
    haveSafetyConcerns: PRL_c1A_haveSafetyConcerns,
    safetyConcernAbout: PRL_c1A_safetyConernAbout,
    concernAboutChild: PRL_c1A_concernAboutChild,
    concernAboutRespondent: PRL_c1A_concernAboutRespondent,
    otherconcerns: {
      c1AkeepingSafeStatement: PRL_c1A_keepingSafeStatement,
      c1AsupervisionAgreementDetails: PRL_c1A_supervisionAgreementDetails,
      c1AagreementOtherWaysDetails: PRL_c1A_agreementOtherWaysDetails,
      c1AotherConcernsDrugs: PRL_c1A_otherConcernsDrugs,
      c1AotherConcernsDrugsDetails: PRL_c1A_otherConcernsDrugsDetails,
      c1AchildSafetyConcerns: PRL_c1A_childSafetyConcerns,
      c1AchildSafetyConcernsDetails: PRL_c1A_childSafetyConcernsDetails,
    },
    abductions: {
      c1AabductionReasonOutsideUk: PRL_c1A_abductionReasonOutsideUk,
      c1AchildsCurrentLocation: PRL_c1A_childsCurrentLocation,
      c1AchildrenMoreThanOnePassport: PRL_c1A_childrenMoreThanOnePassport,
      c1ApossessionChildrenPassport: PRL_c1A_possessionChildrenPassport,
      c1AprovideOtherDetails: PRL_c1A_provideOtherDetails,
      c1ApassportOffice: PRL_c1A_passportOffice,
      c1AabductionPassportOfficeNotified: PRL_c1A_abductionPassportOfficeNotified,
      c1ApreviousAbductionsShortDesc: PRL_c1A_previousAbductionsShortDesc,
      c1ApoliceOrInvestigatorInvolved: PRL_c1A_policeOrInvestigatorInvolved,
      c1ApoliceOrInvestigatorOtherDetails: PRL_c1A_policeOrInvestigatorOtherDetails,
      c1AchildAbductedBefore: PRL_c1A_childAbductedBefore,
    },
  });

  // data clean up
  if (PRL_c1A_haveSafetyConcerns === YesOrNo.NO) {
    request = {
      haveSafetyConcerns: PRL_c1A_haveSafetyConcerns,
    };
  }

  if (
    !PRL_c1A_safetyConernAbout?.includes(PRL_C1ASafteyConcernsAbout.RESPONDENT) &&
    !PRL_c1A_concernAboutChild?.includes(PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
  ) {
    delete request.respondent;
  }

  if (!PRL_c1A_concernAboutChild?.includes(PRL_C1AAbuseTypes.ABDUCTION)) {
    delete request.abductions;
  }

  if (PRL_c1A_childAbductedBefore === YesOrNo.NO) {
    delete request.abductions?.c1ApreviousAbductionsShortDesc;
    delete request.abductions?.c1ApoliceOrInvestigatorInvolved;
    delete request.abductions?.c1ApoliceOrInvestigatorOtherDetails;
  }

  if (PRL_c1A_passportOffice === YesOrNo.NO) {
    delete request.abductions?.c1AchildrenMoreThanOnePassport;
    delete request.abductions?.c1ApossessionChildrenPassport;
    delete request.abductions?.c1AabductionPassportOfficeNotified;
  }

  return request;
};

export const mapSafetyConcernsDetails = (respondent: Respondent): Partial<CaseWithId> => {
  const safetyConcenrs = {};
  const {
    haveSafetyConcerns,
    safetyConcernAbout,
    concernAboutChild,
    concernAboutRespondent,
    otherconcerns,
    abductions,
    ...rest
  } = respondent?.value?.response?.safetyConcerns ?? {};

  if (rest?.child) {
    rest.child = Object.entries(rest.child).reduce((childConcerns, [abuseType, data]) => {
      childConcerns[abuseType] = data;
      if (data?.childrenConcernedAbout && !Array.isArray(data?.childrenConcernedAbout)) {
        childConcerns[abuseType].childrenConcernedAbout = (data.childrenConcernedAbout as unknown as string).split(',');
      }
      return childConcerns;
    }, {});
  }

  Object.assign(safetyConcenrs, {
    PRL_c1A_haveSafetyConcerns: haveSafetyConcerns,
    PRL_c1A_safetyConernAbout: safetyConcernAbout,
    PRL_c1A_concernAboutChild: concernAboutChild,
    PRL_c1A_concernAboutRespondent: concernAboutRespondent,
    PRL_c1A_safteyConcerns: rest,
    PRL_c1A_abductionReasonOutsideUk: abductions?.c1AabductionReasonOutsideUk,
    PRL_c1A_childsCurrentLocation: abductions?.c1AchildsCurrentLocation,
    PRL_c1A_passportOffice: abductions?.c1ApassportOffice,
    PRL_c1A_childrenMoreThanOnePassport: abductions?.c1AchildrenMoreThanOnePassport,
    PRL_c1A_possessionChildrenPassport: abductions?.c1ApossessionChildrenPassport,
    PRL_c1A_provideOtherDetails: abductions?.c1AprovideOtherDetails,
    PRL_c1A_abductionPassportOfficeNotified: abductions?.c1AabductionPassportOfficeNotified,
    PRL_c1A_childAbductedBefore: abductions?.c1AchildAbductedBefore,
    PRL_c1A_previousAbductionsShortDesc: abductions?.c1ApreviousAbductionsShortDesc,
    PRL_c1A_policeOrInvestigatorInvolved: abductions?.c1ApoliceOrInvestigatorInvolved,
    PRL_c1A_policeOrInvestigatorOtherDetails: abductions?.c1ApoliceOrInvestigatorOtherDetails,
    PRL_c1A_otherConcernsDrugs: otherconcerns?.c1AotherConcernsDrugs,
    PRL_c1A_otherConcernsDrugsDetails: otherconcerns?.c1AotherConcernsDrugsDetails,
    PRL_c1A_childSafetyConcerns: otherconcerns?.c1AchildSafetyConcerns,
    PRL_c1A_childSafetyConcernsDetails: otherconcerns?.c1AchildSafetyConcernsDetails,
    PRL_c1A_keepingSafeStatement: otherconcerns?.c1AkeepingSafeStatement,
    PRL_c1A_supervisionAgreementDetails: otherconcerns?.c1AsupervisionAgreementDetails,
    PRL_c1A_agreementOtherWaysDetails: otherconcerns?.c1AagreementOtherWaysDetails,
  });

  return safetyConcenrs;
};
