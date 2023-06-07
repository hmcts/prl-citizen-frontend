import { CaseWithId } from '../../../app/case/case';
import {
  PRL_C1AAbuseTypes,
  PRL_C1ASafteyConcernsAbout,
  PRL_C1ASafteyConcerns_total,
  PartyDetails,
  YesOrNo,
} from '../../../app/case/definition';

export const prepareRequest = (userCase: CaseWithId): PRL_C1ASafteyConcerns_total => {
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
  } = userCase;
  let request: PRL_C1ASafteyConcerns_total = {};

  concernAboutChild(PRL_c1A_concernAboutChild, request, PRL_c1A_safteyConcerns);

  concernAboutRespondent(PRL_c1A_concernAboutRespondent, request, PRL_c1A_safteyConcerns);

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
  if (PRL_c1A_otherConcernsDrugs === YesOrNo.NO) {
    delete request.otherconcerns?.c1AotherConcernsDrugsDetails;
  }
  if (PRL_c1A_childSafetyConcerns === YesOrNo.NO) {
    delete request.otherconcerns?.c1AchildSafetyConcernsDetails;
  }
  if (
    !PRL_c1A_safetyConernAbout?.includes(PRL_C1ASafteyConcernsAbout.RESPONDENT) &&
    !PRL_c1A_concernAboutChild?.includes(PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
  ) {
    delete request.respondent;
    delete request.concernAboutRespondent;
  }

  if (!PRL_c1A_concernAboutChild?.includes(PRL_C1AAbuseTypes.ABDUCTION)) {
    delete request.abductions;
  }
  if (!PRL_c1A_possessionChildrenPassport?.includes('otherPerson')) {
    delete request.abductions?.c1AprovideOtherDetails;
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

export const mapSafetyConcernsDetails = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const {
    haveSafetyConcerns,
    safetyConcernAbout,
    concernAboutChild,
    concernAboutRespondent,
    otherconcerns,
    abductions,
    ...rest
  } = partyDetails?.response?.safetyConcerns || {};
  const safetyConerns = {
    child: {},
  } as Partial<PRL_C1ASafteyConcerns_total>;

  if (rest?.child) {
    safetyConerns.child = Object.entries(rest.child).reduce((childConcerns, [abuseType, data]) => {
      childConcerns[abuseType] = Object.assign({}, data);
      if (data?.childrenConcernedAbout && !Array.isArray(data?.childrenConcernedAbout)) {
        childConcerns[abuseType].childrenConcernedAbout = (data.childrenConcernedAbout as unknown as string).split(',');
      }
      return childConcerns;
    }, {});
  }

  return {
    PRL_c1A_haveSafetyConcerns: haveSafetyConcerns,
    PRL_c1A_safetyConernAbout: safetyConcernAbout,
    PRL_c1A_concernAboutChild: concernAboutChild,
    PRL_c1A_concernAboutRespondent: concernAboutRespondent,
    PRL_c1A_safteyConcerns: {
      ...rest,
      ...safetyConerns,
    },
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
  };
};
function concernAboutRespondent(PRL_c1A_concernAboutRespondent: PRL_C1AAbuseTypes[] | undefined, request: PRL_C1ASafteyConcerns_total, PRL_c1A_safteyConcerns: import("/Users/2209232/Documents/c100-code-base/v2/prl-citizen-frontend/src/main/app/case/definition").PRL_C1ASafteyConcerns | undefined) {
  if (PRL_c1A_concernAboutRespondent) {
    request.respondent = {};
    PRL_c1A_concernAboutRespondent.forEach((abuse: string) => {
      if (PRL_c1A_safteyConcerns?.respondent?.[abuse]) {
        request.respondent = {
          ...request.respondent,
          [abuse]: PRL_c1A_safteyConcerns?.respondent?.[abuse],
        };
        if (PRL_c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency === YesOrNo.NO) {
          delete request.respondent?.[abuse].seekHelpDetails;
        }
      }
    });
  }
}

function concernAboutChild(PRL_c1A_concernAboutChild: PRL_C1AAbuseTypes[] | undefined, request: PRL_C1ASafteyConcerns_total, PRL_c1A_safteyConcerns: import("/Users/2209232/Documents/c100-code-base/v2/prl-citizen-frontend/src/main/app/case/definition").PRL_C1ASafteyConcerns | undefined) {
  if (PRL_c1A_concernAboutChild?.length) {
    request.child = {};
    PRL_c1A_concernAboutChild.forEach((abuse: string) => {
      if (PRL_c1A_safteyConcerns?.child?.[abuse]) {
        const childrenConcern = PRL_c1A_safteyConcerns.child[abuse]?.childrenConcernedAbout;
        request.child = {
          ...request.child,
          [abuse]: {
            ...PRL_c1A_safteyConcerns.child[abuse],
            childrenConcernedAbout: Array.isArray(childrenConcern) ? childrenConcern.join(',') : childrenConcern,
          },
        };
        if (PRL_c1A_safteyConcerns.child[abuse]?.seekHelpFromPersonOrAgency === YesOrNo.NO) {
          delete request.child?.[abuse].seekHelpDetails;
        }
      }
    });
  }
}

