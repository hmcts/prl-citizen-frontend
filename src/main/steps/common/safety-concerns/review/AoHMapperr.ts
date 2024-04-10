import { CaseWithId } from '../../../../app/case/case';
import {
  C1AAbuseTypes,
  C1ASafteyConcerns,
  C1ASafteyConcernsAbout,
  //c1ASafteyConcerns_total,
  PartyDetails,
  RespDomesticAbuseBehaviours,
  Response,
  YesOrNo,
  // c1A_AOH_total
} from '../../../../app/case/definition';

export const prepareRequest = (userCase: CaseWithId): Response => {
  const {
    c1A_haveSafetyConcerns,
    c1A_safetyConernAbout,
    c1A_concernAboutChild,
    c1A_concernAboutRespondent,
    c1A_keepingSafeStatement,
    // c1A_supervisionAgreementDetails,
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
  let request: Response = {};

  Object.assign(request, {
    respAohYesOrNo: c1A_haveSafetyConcerns,
    respAohDomesticAbuseYesNo: c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT)
      ? YesOrNo.YES
      : YesOrNo.NO,
    respAohChildAbductionYesNo: c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION) ? YesOrNo.YES : YesOrNo.NO,
    respAohChildAbuseYesNo: c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) ? YesOrNo.YES : YesOrNo.NO,
    respChildAbductionReasons: c1A_abductionReasonOutsideUk,
    respPreviousAbductionThreats: c1A_childAbductedBefore,
    respPreviousAbductionThreatsDetails: c1A_previousAbductionsShortDesc,
    respChildrenLocationNow: c1A_childsCurrentLocation,
    respAbductionPassportOfficeNotified: c1A_abductionPassportOfficeNotified,
    respAbductionChildHasPassport: c1A_passportOffice,
    respChildPassportDetails: {
      respChildHasMultiplePassports: c1A_childrenMoreThanOnePassport,
      respChildPassportPossession: c1A_possessionChildrenPassport,
      respChildPassportPossessionOtherDetails: c1A_provideOtherDetails,
    },
    respAbductionPreviousPoliceInvolvement: c1A_policeOrInvestigatorInvolved,
    respAbductionPreviousPoliceInvolvementDetails: c1A_policeOrInvestigatorOtherDetails,
    respAohSubstanceAbuseYesNo: c1A_otherConcernsDrugs,
    respAohSubstanceAbuseDetails: c1A_otherConcernsDrugsDetails,
    respAohOtherConcerns: c1A_childSafetyConcerns,
    respAohOtherConcernsDetails: c1A_childSafetyConcernsDetails,
    respAohOtherConcernsCourtActions: c1A_keepingSafeStatement,

    respAgreeChildOtherContact: c1A_agreementOtherWaysDetails,
    respChildAbuses: prepareChildAbuses(c1A_concernAboutChild),
    ...concernDetailsAboutChild(c1A_concernAboutChild, request, c1A_safteyConcerns),
    respDomesticBehaviours: concernDetailsAboutRespondent(c1A_concernAboutRespondent, c1A_safteyConcerns),

    //respAgreeChildUnsupervisedTime:c1A_supervisionAgreementDetails==
    //respAgreeChildSupervisedTime:

    ///safetyConcernAbout: c1A_safetyConernAbout,
    //concernAboutChild: c1A_concernAboutChild,
    //concernAboutRespondent: c1A_concernAboutRespondent,
    // otherconcerns: {
    //   c1AsupervisionAgreementDetails: c1A_supervisionAgreementDetails,

    // },
  });

  // data clean up
  if (c1A_haveSafetyConcerns === YesOrNo.NO) {
    request = {};
    console.log(request);
    Object.assign(request, {
      respAohYesOrNo: c1A_haveSafetyConcerns,
      respAohDomesticAbuseYesNo: undefined,
      respAohChildAbductionYesNo: undefined,
      respAohChildAbuseYesNo: undefined,
      respChildAbductionReasons: undefined,
      respPreviousAbductionThreats: undefined,
      respPreviousAbductionThreatsDetails: undefined,
      respChildrenLocationNow: undefined,
      respAbductionPassportOfficeNotified: undefined,
      respAbductionChildHasPassport: undefined,
      respChildPassportDetails: {
        respChildHasMultiplePassports: undefined,
        respChildPassportPossession: undefined,
        respChildPassportPossessionOtherDetails: undefined,
      },
      respAbductionPreviousPoliceInvolvement: undefined,
      respAbductionPreviousPoliceInvolvementDetails: undefined,
      respAohSubstanceAbuseYesNo: undefined,
      respAohSubstanceAbuseDetails: undefined,
      respAohOtherConcerns: undefined,
      respAohOtherConcernsDetails: undefined,
      respAohOtherConcernsCourtActions: undefined,

      respAgreeChildOtherContact: undefined,
      respChildAbuses: undefined,
      respChildPhysicalAbuse: undefined,
      respWhichChildrenAreRiskPhysicalAbuse: undefined,
      respChildPsychologicalAbuse: undefined,
      respWhichChildrenAreRiskPsychologicalAbuse: undefined,
      respChildFinancialAbuse: undefined,
      respWhichChildrenAreRiskFinancialAbuse: undefined,
      respChildSexualAbuse: undefined,
      respWhichChildrenAreRiskSexualAbuse: undefined,
      respChildEmotionalAbuse: undefined,
      respWhichChildrenAreRiskEmotionalAbuse: undefined,
      respDomesticBehaviours: undefined,
    });
  }
  if (c1A_otherConcernsDrugs === YesOrNo.NO) {
    Object.assign(request, { respAohSubstanceAbuseDetails: undefined });
  }
  if (c1A_childSafetyConcerns === YesOrNo.NO) {
    Object.assign(request, { respAohOtherConcernsDetails: undefined });
  }
  if (
    !c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
  ) {
    Object.assign(request, { respDomesticBehaviours: undefined });
  }

  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION)) {
    Object.assign(request, {
      respPreviousAbductionThreats: undefined,
      respPreviousAbductionThreatsDetails: undefined,
      respChildrenLocationNow: undefined,
      respAbductionPassportOfficeNotified: undefined,
      respAbductionChildHasPassport: undefined,
      respAbductionPreviousPoliceInvolvement: undefined,
      respAbductionPreviousPoliceInvolvementDetails: undefined,
    });
  }
  if (!c1A_possessionChildrenPassport?.includes('otherPerson')) {
    Object.assign(request, { respChildPassportPossessionOtherDetails: undefined });
  }

  if (c1A_childAbductedBefore === YesOrNo.NO) {
    Object.assign(request, {
      respPreviousAbductionThreatsDetails: undefined,
      respAbductionPreviousPoliceInvolvement: undefined,
      respAbductionPreviousPoliceInvolvementDetails: undefined,
    });
  }

  if (c1A_passportOffice === YesOrNo.NO) {
    const respChildPassportDetail = {};
    Object.assign(respChildPassportDetail, {
      respChildHasMultiplePassports: undefined,
      respChildPassportPossession: undefined,
      respChildPassportPossessionOtherDetails: undefined,
    });
    Object.assign(request, {
      respChildPassportDetails: respChildPassportDetail,
      respAbductionPassportOfficeNotified: undefined,
    });
  }

  if (c1A_policeOrInvestigatorInvolved === YesOrNo.NO) {
    Object.assign(request, { respAbductionPreviousPoliceInvolvementDetails: undefined });
  }

  return request;
};

export const mapSafetyConcernsDetails = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const {
    respAohYesOrNo,
    respAohDomesticAbuseYesNo,
    respAohChildAbductionYesNo,
    respAohChildAbuseYesNo,
    respChildAbductionReasons,
    respPreviousAbductionThreats,
    respPreviousAbductionThreatsDetails,
    respChildrenLocationNow,
    respAbductionPassportOfficeNotified,
    respAbductionChildHasPassport,
    respChildPassportDetails,
    respAbductionPreviousPoliceInvolvement,
    respAbductionPreviousPoliceInvolvementDetails,
    respAohSubstanceAbuseYesNo,
    respAohSubstanceAbuseDetails,
    respAohOtherConcerns,
    respAohOtherConcernsDetails,
    respAohOtherConcernsCourtActions,

    respAgreeChildOtherContact,
    respChildAbuses,
    respChildPhysicalAbuse,
    respWhichChildrenAreRiskPhysicalAbuse,
    respChildPsychologicalAbuse,
    respWhichChildrenAreRiskPsychologicalAbuse,
    respChildFinancialAbuse,
    respWhichChildrenAreRiskSexualAbuse,
    respChildSexualAbuse,
    respWhichChildrenAreRiskEmotionalAbuse,
    respChildEmotionalAbuse,
    respWhichChildrenAreRiskFinancialAbuse,
    respDomesticBehaviours,
    //otherconcerns,
  } = partyDetails?.response || {};
  // const respondentAllegationsOfHarmData = {
  //   child: {},
  // } as Partial<c1A_AOH_total>;

  // if (rest?.child) {
  //   safetyConerns.child = Object.entries(rest.child).reduce((childConcerns, [abuseType, data]) => {
  //     childConcerns[abuseType] = Object.assign({}, data);
  //     if (data?.childrenConcernedAbout && !Array.isArray(data?.childrenConcernedAbout)) {
  //       childConcerns[abuseType].childrenConcernedAbout = (data.childrenConcernedAbout as unknown as string).split(',');
  //     }
  //     return childConcerns;
  //   }, {});
  // }

  return {
    c1A_haveSafetyConcerns: respAohYesOrNo,
    c1A_safetyConernAbout: mapConcernAbout(respAohDomesticAbuseYesNo, respAohChildAbuseYesNo),
    c1A_concernAboutChild: mapAbduction(respAohChildAbductionYesNo, respChildAbuses),
    c1A_abductionReasonOutsideUk: respChildAbductionReasons,
    c1A_childAbductedBefore: respPreviousAbductionThreats,
    c1A_previousAbductionsShortDesc: respPreviousAbductionThreatsDetails,
    c1A_childsCurrentLocation: respChildrenLocationNow,
    c1A_abductionPassportOfficeNotified: respAbductionPassportOfficeNotified,
    c1A_passportOffice: respAbductionChildHasPassport,
    c1A_childrenMoreThanOnePassport: respChildPassportDetails?.respChildHasMultiplePassports,
    c1A_possessionChildrenPassport: respChildPassportDetails?.respChildPassportPossession,
    c1A_provideOtherDetails: respChildPassportDetails?.respChildPassportPossessionOtherDetails,
    c1A_policeOrInvestigatorInvolved: respAbductionPreviousPoliceInvolvement,
    c1A_policeOrInvestigatorOtherDetails: respAbductionPreviousPoliceInvolvementDetails,
    c1A_otherConcernsDrugs: respAohSubstanceAbuseYesNo,
    c1A_otherConcernsDrugsDetails: respAohSubstanceAbuseDetails,
    c1A_childSafetyConcerns: respAohOtherConcerns,
    c1A_childSafetyConcernsDetails: respAohOtherConcernsDetails,
    c1A_keepingSafeStatement: respAohOtherConcernsCourtActions,
    //respAgreeChildUnsupervisedTime:c1A_supervisionAgreementDetails==
    //respAgreeChildSupervisedTime:
    c1A_agreementOtherWaysDetails: respAgreeChildOtherContact,
    //c1A_concernAboutChild:respChildAbuses,

    ...mapconcernDetailsAboutChild(
      respChildPhysicalAbuse,
      respWhichChildrenAreRiskPhysicalAbuse,
      respChildPsychologicalAbuse,
      respWhichChildrenAreRiskPsychologicalAbuse,
      respChildFinancialAbuse,
      respWhichChildrenAreRiskFinancialAbuse,
      respChildSexualAbuse,
      respWhichChildrenAreRiskSexualAbuse,
      respChildEmotionalAbuse,
      respWhichChildrenAreRiskEmotionalAbuse,
      respDomesticBehaviours
    ),
  };
};
function concernDetailsAboutRespondent(
  c1A_concernAboutRespondent: C1AAbuseTypes[] | undefined,
  //request: Partial<PartyDetails>,
  c1A_safteyConcerns: C1ASafteyConcerns | undefined
) {
  const respDomesticBehaviour: RespDomesticAbuseBehaviours[] = [];
  if (c1A_concernAboutRespondent) {
    c1A_concernAboutRespondent.forEach((abuse: string) => {
      const respTypeOfAbuseText: string | undefined = prepareRespTypeOfAbuseText(abuse);
      if (c1A_safteyConcerns?.respondent?.[abuse]) {
        respDomesticBehaviour?.push({
          value: {
            respTypeOfAbuse: respTypeOfAbuseText,
            respAbuseNatureDescription: c1A_safteyConcerns?.respondent?.[abuse].behaviourDetails,
            respBehavioursStartDateAndLength: c1A_safteyConcerns?.respondent?.[abuse].behaviourStartDate,
            respBehavioursApplicantSoughtHelp: c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency,
            respBehavioursApplicantHelpSoughtWho:
              c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency === YesOrNo.YES
                ? c1A_safteyConcerns?.respondent?.[abuse].seekHelpDetails
                : undefined,
          },
        });
      }
    });
  }
  return respDomesticBehaviour;
}
const prepareRespTypeOfAbuseText = (abuse: string): string | undefined => {
  switch (abuse) {
    case 'physicalAbuse':
      return 'TypeOfAbuseEnum_value_1';

    case 'psychologicalAbuse':
      return 'TypeOfAbuseEnum_value_2';

    case 'emotionalAbuse':
      return 'TypeOfAbuseEnum_value_4';
    case 'sexualAbuse':
      return 'TypeOfAbuseEnum_value_3';

    case 'financialAbuse':
      return 'TypeOfAbuseEnum_value_5';
  }
  return undefined;
};
const mapAbuseForRespondent = (abuse): C1AAbuseTypes => {
  switch (abuse) {
    case 'TypeOfAbuseEnum_value_1':
      return C1AAbuseTypes.PHYSICAL_ABUSE;

    case 'TypeOfAbuseEnum_value_2':
      return C1AAbuseTypes.PSYCHOLOGICAL_ABUSE;

    case 'TypeOfAbuseEnum_value_4':
      return C1AAbuseTypes.EMOTIONAL_ABUSE;
    case 'TypeOfAbuseEnum_value_3':
      return C1AAbuseTypes.SEXUAL_ABUSE;

    case 'TypeOfAbuseEnum_value_5':
      return C1AAbuseTypes.FINANCIAL_ABUSE;
  }
  return C1AAbuseTypes.SOMETHING_ELSE;
};

function mapconcernDetailsAboutRespondent(respDomesticBehaviours) {
  const c1A_concernAboutRespondent: C1AAbuseTypes[] = [];
  const c1A_safteyConcerns: C1ASafteyConcerns = {};
  if (respDomesticBehaviours) {
    respDomesticBehaviours.forEach(behaviour => {
      const abuse = mapAbuseForRespondent(behaviour.value.respTypeOfAbuse);
      c1A_concernAboutRespondent.push(abuse);
      Object.assign(c1A_safteyConcerns, {
        ...c1A_safteyConcerns,
        respondent: {
          [abuse]: {
            behaviourDetails: behaviour.value.respAbuseNatureDescription,
            behaviourStartDate: behaviour.value.respBehavioursStartDateAndLength,
            seekHelpFromPersonOrAgency: behaviour.value.respBehavioursApplicantSoughtHelp,
            seekHelpDetails: behaviour.value.respBehavioursApplicantHelpSoughtWho,
          },
        },
      });
    });
    return {
      c1A_concernAboutRespondent,
      c1A_safteyConcerns,
    };
  }
}
export function prepareChildAbuses(c1A_concernAboutChild: C1AAbuseTypes[] | undefined): C1AAbuseTypes[] {
  const abuses: C1AAbuseTypes[] = [];
  if (c1A_concernAboutChild?.length) {
    c1A_concernAboutChild?.forEach(i => {
      if (
        i !== C1AAbuseTypes.ABDUCTION &&
        i !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        i !== C1AAbuseTypes.SOMETHING_ELSE
      ) {
        abuses.push(i);
      }
    });
  }
  return abuses;
}

const concernDetailsAboutChild = (
  c1A_concernAboutChild: C1AAbuseTypes[] | undefined,
  request: Response,
  c1A_safteyConcerns: C1ASafteyConcerns | undefined
) => {
  if (c1A_concernAboutChild?.length) {
    c1A_concernAboutChild.forEach((abuse: string) => {
      if (
        c1A_safteyConcerns?.child?.[abuse] &&
        c1A_safteyConcerns?.child?.[abuse] !== C1AAbuseTypes.ABDUCTION &&
        c1A_safteyConcerns?.child?.[abuse] !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        c1A_safteyConcerns?.child?.[abuse] !== C1AAbuseTypes.SOMETHING_ELSE
      ) {
        let abuseObjectName;
        // let childrenAtRiskObjectName;
        switch (abuse) {
          case C1AAbuseTypes.PHYSICAL_ABUSE:
            abuseObjectName = 'respChildPhysicalAbuse';
            //  childrenAtRiskObjectName="respWhichChildrenAreRiskPhysicalAbuse"
            break;
          case C1AAbuseTypes.PSYCHOLOGICAL_ABUSE:
            abuseObjectName = 'respChildPsychologicalAbuse';
            //  childrenAtRiskObjectName="respWhichChildrenAreRiskPsychologicalAbuse"
            break;
          case C1AAbuseTypes.FINANCIAL_ABUSE:
            abuseObjectName = 'respChildFinancialAbuse';
            //  childrenAtRiskObjectName="respWhichChildrenAreRiskFinancialAbuse"
            break;
          case C1AAbuseTypes.SEXUAL_ABUSE:
            abuseObjectName = 'respChildSexualAbuse';
            // childrenAtRiskObjectName="respWhichChildrenAreRiskSexualAbuse"
            break;
          case C1AAbuseTypes.EMOTIONAL_ABUSE:
            abuseObjectName = 'respChildEmotionalAbuse';
            // childrenAtRiskObjectName="respWhichChildrenAreRiskEmotionalAbuse"
            break;
        }

        //const childrenConcern = c1A_safteyConcerns.child[abuse]?.childrenConcernedAbout;
        request = {
          ...request,
          [abuseObjectName]: {
            respAbuseNatureDescription: c1A_safteyConcerns.child[abuse].behaviourDetails,
            respBehavioursStartDateAndLength: c1A_safteyConcerns.child[abuse].behaviourStartDate,
            respBehavioursApplicantSoughtHelp: c1A_safteyConcerns.child[abuse].seekHelpFromPersonOrAgency,
            respBehavioursApplicantHelpSoughtWho:
              c1A_safteyConcerns.child[abuse].seekHelpFromPersonOrAgency === YesOrNo.YES
                ? c1A_safteyConcerns.child[abuse].seekHelpDetails
                : undefined,
          },
          // [childrenAtRiskObjectName]:childrenConcern
        };
      }
      // if (c1A_safteyConcerns.child[abuse]?.seekHelpFromPersonOrAgency === YesOrNo.NO) {
      //   delete request.child?.[abuse].seekHelpDetails;
      // }
    });
  }
  //data clean up
  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.PHYSICAL_ABUSE)) {
    request = {
      ...request,
      respChildPhysicalAbuse: {
        respAbuseNatureDescription: undefined,
        respBehavioursStartDateAndLength: undefined,
        respBehavioursApplicantSoughtHelp: undefined,
        respBehavioursApplicantHelpSoughtWho: undefined,
      },
      //respWhichChildrenAreRiskPhysicalAbuse
    };
  }
  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.PSYCHOLOGICAL_ABUSE)) {
    request = {
      ...request,
      respChildPsychologicalAbuse: {
        respAbuseNatureDescription: undefined,
        respBehavioursStartDateAndLength: undefined,
        respBehavioursApplicantSoughtHelp: undefined,
        respBehavioursApplicantHelpSoughtWho: undefined,
      },
      //respWhichChildrenAreRiskPsychologicalAbuse
    };
  }
  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.FINANCIAL_ABUSE)) {
    request = {
      ...request,
      respChildFinancialAbuse: {
        respAbuseNatureDescription: undefined,
        respBehavioursStartDateAndLength: undefined,
        respBehavioursApplicantSoughtHelp: undefined,
        respBehavioursApplicantHelpSoughtWho: undefined,
      },
      //respWhichChildrenAreRiskFinancialAbuse
    };
  }
  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.SEXUAL_ABUSE)) {
    request = {
      ...request,
      respChildSexualAbuse: {
        respAbuseNatureDescription: undefined,
        respBehavioursStartDateAndLength: undefined,
        respBehavioursApplicantSoughtHelp: undefined,
        respBehavioursApplicantHelpSoughtWho: undefined,
      },
      //respWhichChildrenAreRiskSexualAbuse
    };
  }
  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.EMOTIONAL_ABUSE)) {
    request = {
      ...request,
      respChildEmotionalAbuse: {
        respAbuseNatureDescription: undefined,
        respBehavioursStartDateAndLength: undefined,
        respBehavioursApplicantSoughtHelp: undefined,
        respBehavioursApplicantHelpSoughtWho: undefined,
      },
      //respWhichChildrenAreRiskEmotionalAbus
    };
  }
  return request;
};
function mapconcernDetailsAboutChild(
  respChildPhysicalAbuse,
  respWhichChildrenAreRiskPhysicalAbuse,
  respChildPsychologicalAbuse,
  respWhichChildrenAreRiskPsychologicalAbuse,
  respChildFinancialAbuse,
  respWhichChildrenAreRiskFinancialAbuse,
  respChildSexualAbuse,
  respWhichChildrenAreRiskSexualAbuse,
  respChildEmotionalAbuse,
  respWhichChildrenAreRiskEmotionalAbuse,
  respDomesticBehaviours
) {
  //let c1A_concernAboutChild: C1AAbuseTypes[] | undefined;
  //let c1A_safteyConcerns: C1ASafteyConcerns;
  const concernAboutRespondent = mapconcernDetailsAboutRespondent(respDomesticBehaviours) || {};
  let c1A_safteyConcerns = concernAboutRespondent['c1A_safteyConcerns'];
  //const c1A_concernAboutRespondent = concernAboutRespondent['c1A_concernAboutRespondent'];
  if (!c1A_safteyConcerns) {
    c1A_safteyConcerns = {};
  }
  if (
    respChildPhysicalAbuse.respAbuseNatureDescription ||
    respChildPhysicalAbuse.respBehavioursStartDateAndLength ||
    respChildPhysicalAbuse.respBehavioursApplicantSoughtHelp ||
    respChildPhysicalAbuse.respBehavioursApplicantHelpSoughtWho
  ) {
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        physicalAbuse: {
          behaviourDetails: respChildPhysicalAbuse.respAbuseNatureDescription,
          behaviourStartDate: respChildPhysicalAbuse.respBehavioursStartDateAndLength,
          seekHelpFromPersonOrAgency: respChildPhysicalAbuse.respBehavioursApplicantSoughtHelp,
          seekHelpDetails: respChildPhysicalAbuse.respBehavioursApplicantHelpSoughtWho,
        },
      },
    });
  }

  if (
    respChildPsychologicalAbuse.respAbuseNatureDescription ||
    respChildPsychologicalAbuse.respBehavioursStartDateAndLength ||
    respChildPsychologicalAbuse.respBehavioursApplicantSoughtHelp ||
    respChildPsychologicalAbuse.respBehavioursApplicantHelpSoughtWho
  ) {
    // c1A_concernAboutChild?.push(C1AAbuseTypes.PSYCHOLOGICAL_ABUSE)
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        psychologicalAbuse: {
          behaviourDetails: respChildPsychologicalAbuse.respAbuseNatureDescription,
          behaviourStartDate: respChildPsychologicalAbuse.respBehavioursStartDateAndLength,
          seekHelpFromPersonOrAgency: respChildPsychologicalAbuse.respBehavioursApplicantSoughtHelp,
          seekHelpDetails: respChildPsychologicalAbuse.respBehavioursApplicantHelpSoughtWho,
        },
      },
    });
  }
  if (
    respChildFinancialAbuse.respAbuseNatureDescription ||
    respChildFinancialAbuse.respBehavioursStartDateAndLength ||
    respChildFinancialAbuse.respBehavioursApplicantSoughtHelp ||
    respChildFinancialAbuse.respBehavioursApplicantHelpSoughtWho
  ) {
    // c1A_concernAboutChild?.push(C1AAbuseTypes.FINANCIAL_ABUSE)
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        financialAbuse: {
          behaviourDetails: respChildFinancialAbuse.respAbuseNatureDescription,
          behaviourStartDate: respChildFinancialAbuse.respBehavioursStartDateAndLength,
          seekHelpFromPersonOrAgency: respChildFinancialAbuse.respBehavioursApplicantSoughtHelp,
          seekHelpDetails: respChildFinancialAbuse.respBehavioursApplicantHelpSoughtWho,
        },
      },
    });
  }
  if (
    respChildSexualAbuse.respAbuseNatureDescription ||
    respChildSexualAbuse.respBehavioursStartDateAndLength ||
    respChildSexualAbuse.respBehavioursApplicantSoughtHelp ||
    respChildSexualAbuse.respBehavioursApplicantHelpSoughtWho
  ) {
    // c1A_concernAboutChild?.push(C1AAbuseTypes.SEXUAL_ABUSE)
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        sexualAbuse: {
          behaviourDetails: respChildSexualAbuse.respAbuseNatureDescription,
          behaviourStartDate: respChildSexualAbuse.respBehavioursStartDateAndLength,
          seekHelpFromPersonOrAgency: respChildSexualAbuse.respBehavioursApplicantSoughtHelp,
          seekHelpDetails: respChildSexualAbuse.respBehavioursApplicantHelpSoughtWho,
        },
      },
    });
  }
  if (
    respChildEmotionalAbuse.respAbuseNatureDescription ||
    respChildEmotionalAbuse.respBehavioursStartDateAndLength ||
    respChildEmotionalAbuse.respBehavioursApplicantSoughtHelp ||
    respChildEmotionalAbuse.respBehavioursApplicantHelpSoughtWho
  ) {
    //c1A_concernAboutChild?.push(C1AAbuseTypes.EMOTIONAL_ABUSE)
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        emotionalAbuse: {
          behaviourDetails: respChildEmotionalAbuse.respAbuseNatureDescription,
          behaviourStartDate: respChildEmotionalAbuse.respBehavioursStartDateAndLength,
          seekHelpFromPersonOrAgency: respChildEmotionalAbuse.respBehavioursApplicantSoughtHelp,
          seekHelpDetails: respChildEmotionalAbuse.respBehavioursApplicantHelpSoughtWho,
        },
      },
    });
  }
  if (respWhichChildrenAreRiskPhysicalAbuse) {
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        physicalAbuse: {
          ...c1A_safteyConcerns.child?.physicalAbuse,
          childrenConcernedAbout: respWhichChildrenAreRiskPhysicalAbuse,
        },
      },
    });
  }
  if (respWhichChildrenAreRiskPsychologicalAbuse) {
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        psychologicalAbuse: {
          ...c1A_safteyConcerns.child?.psychologicalAbuse,
          childrenConcernedAbout: respWhichChildrenAreRiskPsychologicalAbuse,
        },
      },
    });
  }
  if (respWhichChildrenAreRiskFinancialAbuse) {
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        financialAbuse: {
          ...c1A_safteyConcerns.child?.financialAbuse,
          childrenConcernedAbout: respWhichChildrenAreRiskFinancialAbuse,
        },
      },
    });
  }
  if (respWhichChildrenAreRiskSexualAbuse) {
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        sexualAbuse: {
          ...c1A_safteyConcerns.child?.sexualAbuse,
          childrenConcernedAbout: respWhichChildrenAreRiskSexualAbuse,
        },
      },
    });
  }
  if (respWhichChildrenAreRiskEmotionalAbuse) {
    Object.assign(c1A_safteyConcerns, {
      ...c1A_safteyConcerns,
      child: {
        ...c1A_safteyConcerns.child,
        emotionalAbuse: {
          ...c1A_safteyConcerns.child?.emotionalAbuse,
          childrenConcernedAbout: respWhichChildrenAreRiskEmotionalAbuse,
        },
      },
    });
  }

  return {
    c1A_safteyConcerns,
    c1A_concernAboutRespondent: concernAboutRespondent['c1A_concernAboutRespondent'],
  };
}
const mapConcernAbout = (
  respAohDomesticAbuseYesNo: YesOrNo | undefined,
  respAohChildAbuseYesNo: YesOrNo | undefined
) => {
  const concernAbout: C1ASafteyConcernsAbout[] = [];
  if (respAohDomesticAbuseYesNo === YesOrNo.YES) {
    concernAbout.push(C1ASafteyConcernsAbout.RESPONDENT);
  }
  if (respAohChildAbuseYesNo === YesOrNo.YES) {
    concernAbout.push(C1ASafteyConcernsAbout.CHILDREN);
  }
  return concernAbout;
};
const mapAbduction = (respAohChildAbductionYesNo: YesOrNo | undefined, respChildAbuses) => {
  if (respAohChildAbductionYesNo === YesOrNo.YES) {
    respChildAbuses.push(C1AAbuseTypes.ABDUCTION);
  }

  return respChildAbuses;
};
