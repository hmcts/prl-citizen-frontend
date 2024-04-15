import { CaseWithId } from '../../../../app/case/case';
import {
  C1AAbuseTypes,
  C1ASafteyConcerns,
  C1ASafteyConcernsAbout,
  YesOrNo,
  c1ASafteyConcerns_total,
  //PartyDetails,
} from '../../../../app/case/definition';

export const prepareRequest = (userCase: CaseWithId): c1ASafteyConcerns_total => {
  const {
    c1A_haveSafetyConcerns,
    c1A_safetyConernAbout,
    c1A_concernAboutChild,
    c1A_concernAboutRespondent,
    c1A_keepingSafeStatement,
    c1A_supervisionAgreementDetails,
    c1A_agreementOtherWaysDetails,
    c1A_otherConcernsDrugs,
    c1A_otherConcernsDrugsDetails,
    c1A_childSafetyConcerns,
    c1A_childSafetyConcernsDetails,
    c1A_abductionReasonOutsideUk,
    c1A_childsCurrentLocation,
    c1A_childrenMoreThanOnePassport,
    c1A_possessionChildrenPassport,
    c1A_provideOtherDetails,
    c1A_passportOffice,
    c1A_abductionPassportOfficeNotified,
    c1A_previousAbductionsShortDesc,
    c1A_policeOrInvestigatorInvolved,
    c1A_policeOrInvestigatorOtherDetails,
    c1A_childAbductedBefore,
    c1A_safteyConcerns,
  } = userCase;
  let request: c1ASafteyConcerns_total = {};

  concernDetailsAboutChild(c1A_concernAboutChild, request, c1A_safteyConcerns);

  concernDetailsAboutRespondent(c1A_concernAboutRespondent, request, c1A_safteyConcerns);

  Object.assign(request, {
    haveSafetyConcerns: c1A_haveSafetyConcerns,
    safetyConcernAbout: c1A_safetyConernAbout,
    concernAboutChild: c1A_concernAboutChild,
    concernAboutRespondent: c1A_concernAboutRespondent,
    otherconcerns: {
      c1AkeepingSafeStatement: c1A_keepingSafeStatement,
      c1AsupervisionAgreementDetails: c1A_supervisionAgreementDetails,
      c1AagreementOtherWaysDetails: c1A_agreementOtherWaysDetails,
      c1AotherConcernsDrugs: c1A_otherConcernsDrugs,
      c1AotherConcernsDrugsDetails: c1A_otherConcernsDrugsDetails,
      c1AchildSafetyConcerns: c1A_childSafetyConcerns,
      c1AchildSafetyConcernsDetails: c1A_childSafetyConcernsDetails,
    },
    abductions: {
      c1AabductionReasonOutsideUk: c1A_abductionReasonOutsideUk,
      c1AchildsCurrentLocation: c1A_childsCurrentLocation,
      c1AchildrenMoreThanOnePassport: c1A_childrenMoreThanOnePassport,
      c1ApossessionChildrenPassport: c1A_possessionChildrenPassport,
      c1AprovideOtherDetails: c1A_provideOtherDetails,
      c1ApassportOffice: c1A_passportOffice,
      c1AabductionPassportOfficeNotified: c1A_abductionPassportOfficeNotified,
      c1ApreviousAbductionsShortDesc: c1A_previousAbductionsShortDesc,
      c1ApoliceOrInvestigatorInvolved: c1A_policeOrInvestigatorInvolved,
      c1ApoliceOrInvestigatorOtherDetails: c1A_policeOrInvestigatorOtherDetails,
      c1AchildAbductedBefore: c1A_childAbductedBefore,
    },
  });

  // data clean up
  if (c1A_haveSafetyConcerns === YesOrNo.NO) {
    request = {
      haveSafetyConcerns: c1A_haveSafetyConcerns,
    };
  }
  if (c1A_otherConcernsDrugs === YesOrNo.NO) {
    delete request.otherconcerns?.c1AotherConcernsDrugsDetails;
  }
  if (c1A_childSafetyConcerns === YesOrNo.NO) {
    delete request.otherconcerns?.c1AchildSafetyConcernsDetails;
  }
  if (
    !c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
  ) {
    delete request.respondent;
    delete request.concernAboutRespondent;
  }

  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION)) {
    delete request.abductions;
  }
  if (!c1A_possessionChildrenPassport?.includes('otherPerson')) {
    delete request.abductions?.c1AprovideOtherDetails;
  }

  if (c1A_childAbductedBefore === YesOrNo.NO) {
    delete request.abductions?.c1ApreviousAbductionsShortDesc;
    delete request.abductions?.c1ApoliceOrInvestigatorInvolved;
    delete request.abductions?.c1ApoliceOrInvestigatorOtherDetails;
  }

  if (c1A_passportOffice === YesOrNo.NO) {
    delete request.abductions?.c1AchildrenMoreThanOnePassport;
    delete request.abductions?.c1ApossessionChildrenPassport;
    delete request.abductions?.c1AabductionPassportOfficeNotified;
  }

  return request;
};

// export const mapSafetyConcernsDetails = (partyDetails: PartyDetails): Partial<CaseWithId> => {
//   const {
//     haveSafetyConcerns,
//     safetyConcernAbout,
//     concernAboutChild,
//     concernAboutRespondent,
//     otherconcerns,
//     abductions,
//     ...rest
//   } = partyDetails?.response?.safetyConcerns || {};
//   const safetyConerns = {
//     child: {},
//   } as Partial<c1ASafteyConcerns_total>;

//   if (rest?.child) {
//     safetyConerns.child = Object.entries(rest.child).reduce((childConcerns, [abuseType, data]) => {
//       childConcerns[abuseType] = Object.assign({}, data);
//       if (data?.childrenConcernedAbout && !Array.isArray(data?.childrenConcernedAbout)) {
//         childConcerns[abuseType].childrenConcernedAbout = (data.childrenConcernedAbout as unknown as string).split(',');
//       }
//       return childConcerns;
//     }, {});
//   }

//   return {
//     c1A_haveSafetyConcerns: haveSafetyConcerns,
//     c1A_safetyConernAbout: safetyConcernAbout,
//     c1A_concernAboutChild: concernAboutChild,
//     c1A_concernAboutRespondent: concernAboutRespondent,
//     c1A_safteyConcerns: {
//       ...rest,
//       ...safetyConerns,
//     },
//     c1A_abductionReasonOutsideUk: abductions?.c1AabductionReasonOutsideUk,
//     c1A_childsCurrentLocation: abductions?.c1AchildsCurrentLocation,
//     c1A_passportOffice: abductions?.c1ApassportOffice,
//     c1A_childrenMoreThanOnePassport: abductions?.c1AchildrenMoreThanOnePassport,
//     c1A_possessionChildrenPassport: abductions?.c1ApossessionChildrenPassport,
//     c1A_provideOtherDetails: abductions?.c1AprovideOtherDetails,
//     c1A_abductionPassportOfficeNotified: abductions?.c1AabductionPassportOfficeNotified,
//     c1A_childAbductedBefore: abductions?.c1AchildAbductedBefore,
//     c1A_previousAbductionsShortDesc: abductions?.c1ApreviousAbductionsShortDesc,
//     c1A_policeOrInvestigatorInvolved: abductions?.c1ApoliceOrInvestigatorInvolved,
//     c1A_policeOrInvestigatorOtherDetails: abductions?.c1ApoliceOrInvestigatorOtherDetails,
//     c1A_otherConcernsDrugs: otherconcerns?.c1AotherConcernsDrugs,
//     c1A_otherConcernsDrugsDetails: otherconcerns?.c1AotherConcernsDrugsDetails,
//     c1A_childSafetyConcerns: otherconcerns?.c1AchildSafetyConcerns,
//     c1A_childSafetyConcernsDetails: otherconcerns?.c1AchildSafetyConcernsDetails,
//     c1A_keepingSafeStatement: otherconcerns?.c1AkeepingSafeStatement,
//     c1A_supervisionAgreementDetails: otherconcerns?.c1AsupervisionAgreementDetails,
//     c1A_agreementOtherWaysDetails: otherconcerns?.c1AagreementOtherWaysDetails,
//   };
// };
function concernDetailsAboutRespondent(
  c1A_concernAboutRespondent: C1AAbuseTypes[] | undefined,
  request: c1ASafteyConcerns_total,
  c1A_safteyConcerns: C1ASafteyConcerns | undefined
) {
  if (c1A_concernAboutRespondent) {
    request.respondent = {};
    c1A_concernAboutRespondent.forEach((abuse: string) => {
      if (c1A_safteyConcerns?.respondent?.[abuse]) {
        request.respondent = {
          ...request.respondent,
          [abuse]: c1A_safteyConcerns?.respondent?.[abuse],
        };
        if (c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency === YesOrNo.NO) {
          delete request.respondent?.[abuse].seekHelpDetails;
        }
      }
    });
  }
}

const concernDetailsAboutChild = (
  c1A_concernAboutChild: C1AAbuseTypes[] | undefined,
  request: c1ASafteyConcerns_total,
  c1A_safteyConcerns: C1ASafteyConcerns | undefined
) => {
  if (c1A_concernAboutChild?.length) {
    request.child = {};
    c1A_concernAboutChild.forEach((abuse: string) => {
      if (c1A_safteyConcerns?.child?.[abuse]) {
        const childrenConcern = c1A_safteyConcerns.child[abuse]?.childrenConcernedAbout;
        request.child = {
          ...request.child,
          [abuse]: {
            ...c1A_safteyConcerns.child[abuse],
            childrenConcernedAbout: Array.isArray(childrenConcern) ? childrenConcern.join(',') : childrenConcern,
          },
        };
        if (c1A_safteyConcerns.child[abuse]?.seekHelpFromPersonOrAgency === YesOrNo.NO) {
          delete request.child?.[abuse].seekHelpDetails;
        }
      }
    });
  }
};
