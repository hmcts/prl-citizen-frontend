import { CaseWithId } from '../../../../app/case/case';
import {
  C1AAbuseTypes,
  C1ASafteyConcerns,
  C1ASafteyConcernsAbout,
  //c1ASafteyConcerns_total,
  PartyDetails,
  YesOrNo,
  c1A_AOH_total
} from '../../../../app/case/definition';

export const prepareRequest = (userCase: CaseWithId): c1A_AOH_total => {
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
  let request: c1A_AOH_total = {};

  concernDetailsAboutChild(c1A_concernAboutChild, request, c1A_safteyConcerns);

  concernDetailsAboutRespondent(c1A_concernAboutRespondent, request, c1A_safteyConcerns);

  Object.assign(request, {
    respAohYesOrNo: c1A_haveSafetyConcerns,
    respAohDomesticAbuseYesNo:c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT)?YesOrNo.YES:YesOrNo.NO,
    respAohChildAbductionYesNo:c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION)?YesOrNo.YES:YesOrNo.NO,
    respAohChildAbuseYesNo:c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN)?YesOrNo.YES:YesOrNo.NO,
    respChildAbductionReasons:c1A_abductionReasonOutsideUk,
    respPreviousAbductionThreats:c1A_childAbductedBefore,
    respPreviousAbductionThreatsDetails:c1A_previousAbductionsShortDesc,
    respChildrenLocationNow: c1A_childsCurrentLocation,
    respAbductionPassportOfficeNotified: c1A_abductionPassportOfficeNotified,
    respAbductionChildHasPassport: c1A_passportOffice,
    respChildPassportDetails:{
      respChildHasMultiplePassports:c1A_childrenMoreThanOnePassport,
      respChildPassportPossession:c1A_possessionChildrenPassport,
      respChildPassportPossessionOtherDetails:c1A_provideOtherDetails
    },
    respAbductionPreviousPoliceInvolvement: c1A_policeOrInvestigatorInvolved,
    respAbductionPreviousPoliceInvolvementDetails: c1A_policeOrInvestigatorOtherDetails,
    respAohSubstanceAbuseYesNo: c1A_otherConcernsDrugs,
    respAohSubstanceAbuseDetails: c1A_otherConcernsDrugsDetails,
    respAohOtherConcerns:c1A_childSafetyConcerns,
    respAohOtherConcernsDetails:c1A_childSafetyConcernsDetails,
    respAohOtherConcernsCourtActions:c1A_keepingSafeStatement,
    //respAgreeChildUnsupervisedTime:c1A_supervisionAgreementDetails==
    //respAgreeChildSupervisedTime:
    respAgreeChildOtherContact:c1A_agreementOtherWaysDetails,
    respChildAbuses:c1A_concernAboutChild,



    ///safetyConcernAbout: c1A_safetyConernAbout,
    //concernAboutChild: c1A_concernAboutChild,
    //concernAboutRespondent: c1A_concernAboutRespondent,
    // otherconcerns: {
    //   c1AsupervisionAgreementDetails: c1A_supervisionAgreementDetails,
      
    // },
  });

  // data clean up
  if (c1A_haveSafetyConcerns === YesOrNo.NO) {
    request = {
      respAohYesOrNo: c1A_haveSafetyConcerns,
    };
  }
  if (c1A_otherConcernsDrugs === YesOrNo.NO) {
    delete request.respAohSubstanceAbuseDetails;
  }
  if (c1A_childSafetyConcerns === YesOrNo.NO) {
    delete request.respAohOtherConcernsDetails;
  }
  if (
    !c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
  ) {
    delete request.respDomesticBehaviours;
    delete request.respDomesticBehaviours;
  }

  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION)) {
    delete request.respPreviousAbductionThreats;
    delete request.respPreviousAbductionThreatsDetails
    delete request.respChildrenLocationNow
    delete request.respAbductionPassportOfficeNotified
    delete request.respAbductionChildHasPassport
    delete request.respChildPassportDetails
    delete request.respAbductionPreviousPoliceInvolvement
    delete request.respAbductionPreviousPoliceInvolvementDetails
    
  }
  if (!c1A_possessionChildrenPassport?.includes('otherPerson')) {
    delete request.respChildPassportDetails?.respChildPassportPossessionOtherDetails;
  }

  if (c1A_childAbductedBefore === YesOrNo.NO) {
    delete request.respPreviousAbductionThreatsDetails;
    delete request.respAbductionPreviousPoliceInvolvement;
    delete request.respAbductionPreviousPoliceInvolvementDetails;
  }

  if (c1A_passportOffice === YesOrNo.NO) {
    delete request.respChildPassportDetails?.respChildHasMultiplePassports;
    delete request.respChildPassportDetails?.respChildPassportPossession;
    delete request.respChildPassportDetails?.respChildPassportPossessionOtherDetails;
    delete request.respAbductionPassportOfficeNotified;
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
      
  } = partyDetails?.response?.respondentAllegationsOfHarmData ||{};
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
    c1A_haveSafetyConcerns:respAohYesOrNo,
    c1A_safetyConernAbout:mapConcernAbout(respAohDomesticAbuseYesNo,respAohChildAbuseYesNo),
    c1A_concernAboutChild:mapAbduction(respAohChildAbductionYesNo,respChildAbuses),
    c1A_abductionReasonOutsideUk:respChildAbductionReasons,
    c1A_childAbductedBefore:respPreviousAbductionThreats,
    c1A_previousAbductionsShortDesc:respPreviousAbductionThreatsDetails,
    c1A_childsCurrentLocation:respChildrenLocationNow,
    c1A_abductionPassportOfficeNotified:respAbductionPassportOfficeNotified,
    c1A_passportOffice:respAbductionChildHasPassport,
    c1A_childrenMoreThanOnePassport:respChildPassportDetails?.respChildHasMultiplePassports,
    c1A_possessionChildrenPassport:respChildPassportDetails?.respChildPassportPossession,
    c1A_provideOtherDetails:respChildPassportDetails?.respChildPassportPossessionOtherDetails,
    c1A_policeOrInvestigatorInvolved:respAbductionPreviousPoliceInvolvement,
    c1A_policeOrInvestigatorOtherDetails:respAbductionPreviousPoliceInvolvementDetails,
     c1A_otherConcernsDrugs:respAohSubstanceAbuseYesNo,
    c1A_otherConcernsDrugsDetails:respAohSubstanceAbuseDetails,
    c1A_childSafetyConcerns:respAohOtherConcerns,
    c1A_childSafetyConcernsDetails:respAohOtherConcernsDetails,
    c1A_keepingSafeStatement:respAohOtherConcernsCourtActions,
    //respAgreeChildUnsupervisedTime:c1A_supervisionAgreementDetails==
    //respAgreeChildSupervisedTime:
    c1A_agreementOtherWaysDetails:respAgreeChildOtherContact,
    //c1A_concernAboutChild:respChildAbuses,
    ...mapconcernDetailsAboutRespondent(respDomesticBehaviours),
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
      respWhichChildrenAreRiskEmotionalAbuse
    
    
    )
  };
};
function concernDetailsAboutRespondent(
  c1A_concernAboutRespondent: C1AAbuseTypes[] | undefined,
  request: c1A_AOH_total,
  c1A_safteyConcerns: C1ASafteyConcerns | undefined
) {
  if (c1A_concernAboutRespondent) {

    c1A_concernAboutRespondent.forEach((abuse: string) => {
      if (c1A_safteyConcerns?.respondent?.[abuse]) {
        request.respDomesticBehaviours?.push( {
          ...request.respDomesticBehaviours,
          value:{
          respTypeOfAbuse:abuse as C1AAbuseTypes,
          respAbuseNatureDescription:c1A_safteyConcerns?.respondent?.[abuse].behaviourDetails,
          respBehavioursStartDateAndLength:c1A_safteyConcerns?.respondent?.[abuse].behaviourStartDate,
          respBehavioursApplicantSoughtHelp:c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency,
          respBehavioursApplicantHelpSoughtWho:c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency === YesOrNo.YES
                                                ?c1A_safteyConcerns?.respondent?.[abuse].seekHelpDetails:undefined,
          }
        });
        // if (c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency === YesOrNo.NO) {
        //   delete request.respDomesticBehaviours?.value.respBehavioursApplicantHelpSoughtWho;
        // }
      }
    });
  }
}
function mapconcernDetailsAboutRespondent(
  respDomesticBehaviours,
) {
  let c1A_concernAboutRespondent: C1AAbuseTypes[] | undefined;
  let c1A_safteyConcerns: C1ASafteyConcerns | undefined;
  if(respDomesticBehaviours){
    respDomesticBehaviours.forEach(behaviour => {
      let abuse=respDomesticBehaviours[behaviour].value.respTypeOfAbuse
      c1A_concernAboutRespondent?.push(abuse)
     Object.assign(c1A_safteyConcerns?.respondent?.[abuse].behaviourDetails,respDomesticBehaviours[behaviour].value.respAbuseNatureDescription),
     Object.assign(c1A_safteyConcerns?.respondent?.[abuse].behaviourStartDate,respDomesticBehaviours[behaviour].value.respBehavioursStartDateAndLength),
     Object.assign(c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency,respDomesticBehaviours[behaviour].value.respBehavioursApplicantSoughtHelp),
     Object.assign(c1A_safteyConcerns?.respondent?.[abuse].seekHelpFromPersonOrAgency,respDomesticBehaviours[behaviour].value.respBehavioursApplicantHelpSoughtWho)
  })
  return{
    c1A_concernAboutRespondent,
    c1A_safteyConcerns
  }
  
  
  }
}

const concernDetailsAboutChild = (
  c1A_concernAboutChild: C1AAbuseTypes[] | undefined,
  request: c1A_AOH_total,
  c1A_safteyConcerns: C1ASafteyConcerns | undefined
) => {
  if (c1A_concernAboutChild?.length) {
    c1A_concernAboutChild.forEach((abuse: string) => {
      if (c1A_safteyConcerns?.child?.[abuse]) {
        let abuseObjectName;
        let childrenAtRiskObjectName;
        switch (abuse) {
          case C1AAbuseTypes.PHYSICAL_ABUSE:
            abuseObjectName="respChildPhysicalAbuse"
            childrenAtRiskObjectName="respWhichChildrenAreRiskPhysicalAbuse"
            break;
          case C1AAbuseTypes.PSYCHOLOGICAL_ABUSE:
            abuseObjectName="respChildPsychologicalAbuse"
            childrenAtRiskObjectName="respWhichChildrenAreRiskPsychologicalAbuse"
          break;
          case C1AAbuseTypes.FINANCIAL_ABUSE:
            abuseObjectName="respChildFinancialAbuse"
            childrenAtRiskObjectName="respWhichChildrenAreRiskFinancialAbuse"
            break;
          case C1AAbuseTypes.SEXUAL_ABUSE:
            abuseObjectName="respChildSexualAbuse"
            childrenAtRiskObjectName="respWhichChildrenAreRiskSexualAbuse"
            break;
          case C1AAbuseTypes.EMOTIONAL_ABUSE:
            abuseObjectName="respChildEmotionalAbuse"
            childrenAtRiskObjectName="respWhichChildrenAreRiskEmotionalAbuse"
            break;
        }

    const childrenConcern = c1A_safteyConcerns.child[abuse]?.childrenConcernedAbout;
        request = {
          ...request,
            [abuseObjectName]:{
            respAbuseNatureDescription:c1A_safteyConcerns.child[abuse].behaviourDetails,
            respBehavioursStartDateAndLength:c1A_safteyConcerns.child[abuse].behaviourStartDate,
             respBehavioursApplicantSoughtHelp:c1A_safteyConcerns.child[abuse].seekHelpFromPersonOrAgency,
             respBehavioursApplicantHelpSoughtWho:c1A_safteyConcerns.child[abuse].seekHelpDetails === YesOrNo.YES??undefined
            },
            [childrenAtRiskObjectName]:Array.isArray(childrenConcern) ? childrenConcern.join(',') : childrenConcern
          
          }
        // if (c1A_safteyConcerns.child[abuse]?.seekHelpFromPersonOrAgency === YesOrNo.NO) {
        //   delete request.child?.[abuse].seekHelpDetails;
        // }
      }
    });
  }
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
  respWhichChildrenAreRiskEmotionalAbuse


) {
  //let c1A_concernAboutChild: C1AAbuseTypes[] | undefined;
  let c1A_safteyConcerns: C1ASafteyConcerns | undefined;
  if(respChildPhysicalAbuse){
    //c1A_concernAboutChild?.push(C1AAbuseTypes.PHYSICAL_ABUSE)
    c1A_safteyConcerns!.child!.physicalAbuse!.behaviourDetails=respChildPhysicalAbuse.respAbuseNatureDescription,
    c1A_safteyConcerns!.child!.physicalAbuse!.behaviourStartDate=respChildPhysicalAbuse.respBehavioursStartDateAndLength,
    c1A_safteyConcerns!.child!.physicalAbuse!.seekHelpFromPersonOrAgency=respChildPhysicalAbuse.respBehavioursApplicantSoughtHelp,
    c1A_safteyConcerns!.child!.physicalAbuse!.seekHelpDetails!=respChildPhysicalAbuse.respBehavioursApplicantHelpSoughtWho
  }
  if(respChildPsychologicalAbuse){
   // c1A_concernAboutChild?.push(C1AAbuseTypes.PSYCHOLOGICAL_ABUSE)
   c1A_safteyConcerns!.child!.psychologicalAbuse!.behaviourDetails=respChildPsychologicalAbuse.respAbuseNatureDescription,
    c1A_safteyConcerns!.child!.psychologicalAbuse!.behaviourStartDate=respChildPsychologicalAbuse.respBehavioursStartDateAndLength,
    c1A_safteyConcerns!.child!.psychologicalAbuse!.seekHelpFromPersonOrAgency=respChildPsychologicalAbuse.respBehavioursApplicantSoughtHelp,
    c1A_safteyConcerns!.child!.psychologicalAbuse!.seekHelpDetails!=respChildPsychologicalAbuse.respBehavioursApplicantHelpSoughtWho
  }
  if(respChildFinancialAbuse){
   // c1A_concernAboutChild?.push(C1AAbuseTypes.FINANCIAL_ABUSE)
   c1A_safteyConcerns!.child!.financialAbuse!.behaviourDetails=respChildFinancialAbuse.respAbuseNatureDescription,
    c1A_safteyConcerns!.child!.financialAbuse!.behaviourStartDate=respChildFinancialAbuse.respBehavioursStartDateAndLength,
    c1A_safteyConcerns!.child!.financialAbuse!.seekHelpFromPersonOrAgency=respChildFinancialAbuse.respBehavioursApplicantSoughtHelp,
    c1A_safteyConcerns!.child!.financialAbuse!.seekHelpDetails!=respChildFinancialAbuse.respBehavioursApplicantHelpSoughtWho
  }
  if(respChildSexualAbuse){
   // c1A_concernAboutChild?.push(C1AAbuseTypes.SEXUAL_ABUSE)
   c1A_safteyConcerns!.child!.sexualAbuse!.behaviourDetails=respChildSexualAbuse.respAbuseNatureDescription,
    c1A_safteyConcerns!.child!.sexualAbuse!.behaviourStartDate=respChildSexualAbuse.respBehavioursStartDateAndLength,
    c1A_safteyConcerns!.child!.sexualAbuse!.seekHelpFromPersonOrAgency=respChildSexualAbuse.respBehavioursApplicantSoughtHelp,
    c1A_safteyConcerns!.child!.sexualAbuse!.seekHelpDetails!=respChildSexualAbuse.respBehavioursApplicantHelpSoughtWho
  }
  if(respChildEmotionalAbuse){
    //c1A_concernAboutChild?.push(C1AAbuseTypes.EMOTIONAL_ABUSE)
    c1A_safteyConcerns!.child!.emotionalAbuse!.behaviourDetails=respChildEmotionalAbuse.respAbuseNatureDescription,
    c1A_safteyConcerns!.child!.emotionalAbuse!.behaviourStartDate=respChildEmotionalAbuse.respBehavioursStartDateAndLength,
    c1A_safteyConcerns!.child!.emotionalAbuse!.seekHelpFromPersonOrAgency=respChildEmotionalAbuse.respBehavioursApplicantSoughtHelp,
    c1A_safteyConcerns!.child!.emotionalAbuse!.seekHelpDetails!=respChildEmotionalAbuse.respBehavioursApplicantHelpSoughtWho
  }
  if(respWhichChildrenAreRiskPhysicalAbuse){
    c1A_safteyConcerns?.child?.physicalAbuse?.childrenConcernedAbout!=respWhichChildrenAreRiskPhysicalAbuse
  }
  if(respWhichChildrenAreRiskPsychologicalAbuse){
    c1A_safteyConcerns?.child?.physicalAbuse?.childrenConcernedAbout!=respWhichChildrenAreRiskPhysicalAbuse
  }
  if(respWhichChildrenAreRiskFinancialAbuse){
    c1A_safteyConcerns?.child?.financialAbuse?.childrenConcernedAbout!=respWhichChildrenAreRiskPhysicalAbuse
  }
  if(respWhichChildrenAreRiskSexualAbuse){
    c1A_safteyConcerns?.child?.sexualAbuse?.childrenConcernedAbout!=respWhichChildrenAreRiskPhysicalAbuse
  }
  if(respWhichChildrenAreRiskEmotionalAbuse){
    c1A_safteyConcerns?.child?.emotionalAbuse?.childrenConcernedAbout!=respWhichChildrenAreRiskPhysicalAbuse
  }
  
  return{
    c1A_safteyConcerns
  }
  
  
  }
const mapConcernAbout = (
  respAohDomesticAbuseYesNo: YesOrNo|undefined,
  respAohChildAbuseYesNo: YesOrNo|undefined
) => {
let concernAbout:C1ASafteyConcernsAbout[]=[]
if(respAohDomesticAbuseYesNo===YesOrNo.YES)
  concernAbout.push(C1ASafteyConcernsAbout.RESPONDENT)
if(respAohChildAbuseYesNo===YesOrNo.YES)
  concernAbout.push(C1ASafteyConcernsAbout.CHILDREN)
return concernAbout

};
const mapAbduction = (
  respAohChildAbductionYesNo: YesOrNo|undefined,
  respChildAbuses
) => {
if(respAohChildAbductionYesNo===YesOrNo.YES)
  respChildAbuses.push(C1AAbuseTypes.ABDUCTION)

return respChildAbuses

};