import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/content';
import { cy as GeneralContentCy, en as GeneralContentEn } from '../miam/general-reasons/content';

import {
  ChildernDetails,
  ChildernDetailsAdditional,
  InternationalElement,
  MiamAttendance,
  MiamExemption,
  MiamTitle,
  TypeOfOrder,
  WithoutNoticeHearing,
} from './utils';

export const enContent = {
  serviceName: 'Check your answers ',
  section: '',
  title: 'Check your Answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Accept and continue',
  Yes: 'Yes',
  No: 'No ',
  SummaryDetail: 'Download a draft of your application (PDF)',
  SummaryDetailInnerText:
    "<p class='govuk-body'>            If you cannot open the PDF file after downloading, download and install            <a href='https://get.adobe.com/uk/reader/' class='govuk-link' rel='external' target='_blank'>Adobe Acrobat Reader</a> to try again.          </p><p class='govuk-body'>            Please note this draft is for your records. Only the completed application will be admitted in court.          </p><a class='govuk-button ga-pageLink govuk-button--secondary' role='button' draggable='false' data-module='govuk-button' data-ga-category='check your answers' data-ga-label='download draft' download='' href='/steps/completion/summary.pdf'>Download draft application</a>",
  StatementOfTruth: {
    title: 'Statement of Truth',
    heading: 'Confirm before you submit the application',
    warning:
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
    inset:
      '<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select Pay and submit your application to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>',
    check: 'I believe that the facts stated in this application are true',
    lastPara:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
  },
  sectionTitles: {
    Miam: '5. MIAM: Mediation Information and Assessment Meeting',
    MiamAttendance: 'MIAM attendance',
    MiamExemption: 'MIAM exemption',
    AdvisingCourt: "6. What you're asking the court to decide",
    WithoutNoticeHearing: '7. Hearing details',
    ChildernDetails: "8. Childen's details",
    InternationalElement: '11. International elements',
    additionationDetailsAboutChildern: 'Additional details about the children',
  },
  keys: {
    whatAreYouAsking: 'What are you asking the court to do?',
    wantingCourtToDo: 'Describe what you want the court to do regarding the children in this application',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing?',
    askingNoHearing: 'Are you asking for a without notice hearing?',
    phoneNumber: 'Phone number',
    emailAddress: 'Contact number of the person named on the application',
    fullName: 'Full name',
    dateOfBirth: 'Date of birth',
    gender: 'Gender',
    address: 'Address',
    ordersAppliedFor: 'Orders applied for',
    isDecisionTaken:
      'State everyone who has parental responsibility for child 2 and how they have parental responsibility',
    socialServiceLink: 'Are any of the children known to social services?',
    subjectToChildProtection: 'Are any of the children the subject of a child protection plan?',
    haveOtherChildern: "Do you or the respondents have other children who aren't part of this application?",
    liveOutSideUk: "Are the children's lives mainly based outside of England and Wales?",
    basedOutSideEnglandOrWales:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
    anotherPersonSameOrder:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    otherCountryRequestInfo: 'Has another country asked (or been asked) for information or help for the children?',
    detailOfWhyWithoutNotice: 'Give details of why you’re asking for a without notice hearing',
    areAskingwithoutNoticeHearing:
      'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application?',
    areAskingwithoutNoticeHearingDetails: 'Details',
    areAskingDuetoNoTimeGrant:
      'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people?',
    areAskingDuetoNoTimeGrantDetails: 'Details',
    doYouNeedAWithoutNoticeHearingDetails: 'Details',
    whoChildLiveWith: 'Decide who the children live with and when',
    childTimeSpent: 'Decide how much time the children spend with each person',
    stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something',
    resolveSpecificIssue: 'Resolve a specific issue you are concerned about',
    changeChildrenNameSurname: "Changing the children's names or surname",
    allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children',
    takingChildOnHoliday: 'Taking the children on holiday',
    relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales',
    relocateChildrenOutsideUk:
      'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
    specificHoliday: 'A specific holiday or arrangement',
    whatSchoolChildrenWillGoTo: 'What school the children will go to',
    religiousIssue: 'A religious issue',
    changeChildrenNameSurnameA: "Changing the children's names or surname",
    medicalTreatment: 'Medical treatment',
    relocateChildrenDifferentUkAreaA: 'Relocating the children to a different area in England and Wales',
    relocateChildrenOutsideUkA:
      'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
    returningChildrenToYourCare:
      'Returning the children to your care <div id="resolveSpecificIssueSubField-8-item-hint" class="govuk-hint govuk-checkboxes__hint">If the children have been abducted, unlawfully removed or unlawfully retained</div>',
    childInvolvementInSupervision:
      'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?',
    attendedMiamMidiation: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
    mediatorConfirmation: 'Has a mediator confirmed that you do not need to attend a MIAM?',
    reasonForNotAttendingMiam: 'Do you have valid reasons for not attending a MIAM?',
    validResonsNotAttendingMiam: 'What are your valid reasons for not attending a MIAM?',
    domesticViolence: GeneralContentEn.domesticViolence,
    childProtection: GeneralContentEn.childProtection,
    urgentHearing: GeneralContentEn.urgentHearing,
    previousMIAMOrExempt: GeneralContentEn.previousMIAMOrExempt,
    validExemption: GeneralContentEn.validExemption,
    noReason: GeneralContentEn.noReason,
    domesticVoilenceHeading: DomesticAbuseEn().title,
    childProtectionHeading: ChildProtectionEn().title,
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case?',
    policeInvolvement: 'The police have been involved',
    policeInvolvement_hint:
      'This may mean that someone in the application (you or the respondents) have been arrested, cautioned, charged or convicted for domestic or child abuse offences. Select all evidence you have to support your claim.',
    evidenceOfSomeoneArrest:
      'Evidence that someone in the application has been arrested for a domestic violence offence',
    evidenceOfPolice: 'Evidence of a police caution for a domestic violence offence',
    evidenceOfOnGoingCriminalProceeding: 'Evidence of ongoing criminal proceedings for a domestic violence offence',
    evidenceOfConviction: 'Evidence of a conviction for a domestic violence offence',
    evidenceOFProtectionNotice: 'A domestic violence protection notice issued against someone in the application',
    courtInvolvement: 'A court has already been involved',
    boundedByCourtAction:
      'Someone in the case is bound by a court order in connection with a domestic violence offence',
    protectionInjuction: ' protective injunction is in place',
    fmlAct1996:
      'An undertaking given in England and Wales under section 46 or 63E of the Family Law Act 1996 (or given in Scotland or Northern Ireland in place of a protective injunction) by a prospective party, provided that a cross-undertaking relating to domestic violence was not given by another prospective party',
    ukdomesticVoilcenceUK:
      'There has been a finding of fact in proceedings in the United Kingdom, that proves that someone in the case has committed domestic violence',
    ukPotentialVictim:
      'An expert report was produced as evidence in proceedings in the United Kingdom, and it showed that a person with whom a prospective party is or was in a family relationship was a victim (or potential victim) of domestic abuse by that person',
    courtInvolvement_hint:
      'A court has made an order against you or the other people in the application (or someone close to you, or them) in connection to domestic violence and abuse. Select all evidence you have to support your claim.',
    letterOfBeingVictim:
      'A letter confirms that you or the other people in the application are (or have been) a victim of domestic violence or abuse',
    letterFromHealthProfessional: 'A letter or report from an appropriate health professional',
    letterFromHealthProfessional_hint:
      'The letter or report must confirm that an appropriate health professional has examined the person directly - and in their professional judgement, the person has (or has had) injuries that are consistent with being a victim of domestic violence',
    letterFromHPfromPerspectiveParty:
      'A letter or report confirming that there was a referral by an appropriate health professional of a prospective party to a person who provides specialist support or assistance for victims of, or those at risk of, domestic violence',
    letterFromHPfromPerspectiveParty_hint:
      '<div class="govuk-hint govuk-checkboxes__hint" id="sletterconfirmation-hint">The letter or report must be from: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>the appropriate health professional who made the referral</li> <li>an appropriate health professional who has access to the medical records of the prospective party referred to</li> <li>or the person to whom the referral was made</li> </ul> </div>',
    letterFromPublicAuthority:
      'A letter from a public authority confirming that a person with whom a prospective party is or was in a family relationship, was assessed as being, or at risk of being, a victim of domestic violence by that prospective party (or a copy of that assessment)',
    letterOfBeingVictim_hint:
      'This may mean that a health professional has confirmed injuries that are (or were) a result of domestic violence and abuse. Select which evidence of this you can provide.',
    letterFromAuthority: 'A letter from a local authority or other agency confirms a risk of harm',
    letterFromMultiAgencyMember:
      "A letter from any person who is a member of a multi-agency risk assessment conference, or local safeguarding forum. The letter confirms that one of the people in the application, or someone in that person's family, are (or have been) at risk of harm from domestic violence from a prospective party.",
    letterFromOfficer:
      'A letter from an officer employed by a local authority or housing association, for the purpose of supporting tenants.',
    letterFromOfficer_hint:
      "<div class='govuk-hint govuk-checkboxes__hint' id='authorityletter-hint'>The letter must contain: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'> <li>a statement that says that in their professional judgement, a prospective party poses an actual or potential risk of domestic violence towards someone else who they are (or have been) in a family relationship with.</li> <li>a description of the specific information they relied on to support this judgement</li> <li>a description of the support that they provided to the victim (or potential victim) of domestic violence from the prospective party</li> </ul> </div>",
    letterFromAuthority_hint:
      'For example, a local authority or housing association has confirmed there is or has been a risk of domestic violence or abuse. Select which evidence of this you can provide.',
    letterFromSupportService: 'A letter from a domestic violence or abuse support service, specialist or organisation',
    letterFromSupportService_hint:
      'This could be an independent domestic violence or abuse adviser confirming support to you or the other people in this application (the respondents). Select which evidence of this you can provide.',
    letterFromDomesticViolenceAdvisor:
      'A letter from an independent domestic violence advisor confirming that they are providing support to a prospective party',
    letterFromSexualViolenceAdvisor:
      'A letter from an independent sexual violence advisor confirming that they are providing support to a prospective party relating to sexual violence by another prospective party',
    letterFromOrgDomesticViolenceSupport:
      'A letter from an organisation providing domestic violence support services, or a registered charity',
    letterFromOrgDomesticViolenceInUk:
      'A letter or report from an organisation providing domestic violence support services in the United Kingdom',
    letterFromOrgDomesticViolenceSupportHint:
      "The letter confirms all the following.<br/>The Organisation: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>is situated in England and Wales</li><li>has been operating for an uninterrupted period of six months or more</li><li>provided a prospective party with support in relation to that person’s needs as a victim, or a person at risk, of domestic violence</li></ul>The letter contains all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>a statement to the effect that, in the reasonable professional judgment of the author of the letter, the prospective party is, or is at risk of being, a victim of domestic violence</li><li>a description of the specific matters relied upon to support that judgment</li><li>a description of the support provided to the prospective party</li><li>a statement of the reasons why the prospective party needed that support</li></ul>",
    letterFromOrgDomesticViolenceInUkHint:
      "The letter or report must confirm all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>that a person with whom a prospective party is or was in a family relationship was refused admission to a refuge </li><li>the date on which they were refused admission to the refuge</li><li>they sought admission to the refuge becuase of allegations of domestic violence by the prospective party</li></ul>",
    ILRDuetoDomesticAbuse:
      'You or any of the other people in this application (the respondents) have been granted indefinite leave to remain in the UK as a victim of domestic violence or abuse',
    ILRDuetoDomesticAbuse_hint: 'A letter from the Home Office will have confirmed that leave was granted',
    financiallyAbuse:
      'You have evidence that you or the other people in the application (the respondents) have been (or are at risk of being) financially abused by the other party',
    financiallyAbuse_hint:
      'Financial abuse is a way of controlling someone being able to earn, spend or keep their own money. For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>a copy of a credit card account, loan document or bank statements</li><li>a letter from a domestic violence support organisation</li><li>emails, text messages or a diary kept by the victim</li> </ul>',
    noneOfOptions: 'None of the above',
    localAuthority:
      'The children in the application, or another child in the household, is the subject of enquiries by a local authority under section 47 of the Children Act 1989 Act',
    localAuthorityHint:
      'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm. See <a href="https://www.legislation.gov.uk/ukpga/1989/41/section/17" class="govuk-link" target="_blank" aria-label="section 47 of the Children Act 1989 Act">section 47 of the Children Act 1989 Act</a> for further details.',
    childProtectionPlan:
      'The children in the application, or another child in the household, is the subject of a child protection plan put in place by the local authority',
    freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety',
    freedomPhysicalSafetyInFamily: 'There is a risk to the life, freedom or physical safety of someone in your family',
    riskSafetyInHome: 'There is a risk to the safety of your home',
    riskUnreasonableFinancialHardship:
      'Any delay caused by attending a MIAM would cause a risk of unreasonable financial hardship',
    riskOfHarmToChildren: 'Any delay caused by attending a MIAM would cause a risk of harm to the children',
    unlawfullyRemovedFromUK:
      'Any delay caused by attending a MIAM would cause a risk that the children will be unlawfully removed from the UK or unlawfully kept overseas',
    riskOfUnfairCourtDecision:
      'Any delay caused by attending a MIAM would cause a significant risk of an unfair court decision (miscarriage of justice)',
    riskOfIrretrievableProblems:
      'Any delay caused by attending a MIAM would cause a risk of irretrievable problems, including irretrievable loss of evidence in the case',
    riskOfCourtProceedingsDispute:
      'There is a risk of court proceedings related to the dispute starting or taking place in a country other than England or Wales',
    fourMonthsPriorAttended: `In the 4 months prior to making the application, you attended 
                            a MIAM or participated in another form of non-court dispute resolution relating 
                            to the same or substantially the same dispute`,
    onTimeParticipation: `At the time of making the application, you are participating in another
                        form of non-court dispute resolution relating to the same or 
                        substantially the same dispute`,
    beforeInitiationProceeding: `This application would be made in existing proceedings which are continuing 
                               and you attended a MIAM before initiating those proceedings`,
    fourMonthsPriorFiled: `In the 4 months prior to making the application, you filed a relevant
                        family application confirming that a MIAM exemption applied and that application
                        related to the same or substantially the same dispute`,
    miamExamptionApplied: `The application would be made in existing proceedings which are continuing
                         and a MIAM exemption applied to the application for those proceedings`,
    beforStatingApplication: `The application would be made in existing proceedings which 
                            are continuing and and the applicant attended a MIAM before starting those proceedings`,
  },
};
const cyContent: typeof enContent = {
  serviceName: 'Check your answers - welsh ',
  section: '',
  title: 'Check your Answers -welsh',
  change: 'change - welsh',
  topWarning: 'Your answers will be shared with the other people in this case. - welsh',
  makingSure: 'Please review your answers before you finish your application.- welsh',
  continue: 'Accept and continue - welsh',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  SummaryDetail: 'Download a draft of your application (PDF)- welsh',
  SummaryDetailInnerText:
    "<p class='govuk-body'>            If you cannot open the PDF file after downloading, download and install            <a href='https://get.adobe.com/uk/reader/' class='govuk-link' rel='external' target='_blank'>Adobe Acrobat Reader</a> to try again.          </p><p class='govuk-body'>            Please note this draft is for your records. Only the completed application will be admitted in court.          </p><a class='govuk-button ga-pageLink govuk-button--secondary' role='button' draggable='false' data-module='govuk-button' data-ga-category='check your answers' data-ga-label='download draft' download='' href='/steps/completion/summary.pdf'>Download draft application</a>",
  StatementOfTruth: {
    title: 'Statement of Truth - welsh',
    heading: 'Confirm before you submit the application - welsh',
    warning:
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
    inset:
      '<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select Pay and submit your application to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>',
    check: 'I believe that the facts stated in this application are true',
    lastPara:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
  },
  sectionTitles: {
    Miam: '5. MIAM: Mediation Information and Assessment Meeting',
    MiamAttendance: 'MIAM attendance - welsh',
    MiamExemption: 'MIAM exemption - welsh',
    AdvisingCourt: "6. What you're asking the court to decide - welsh",
    WithoutNoticeHearing: '7. Hearing details - welsh',
    ChildernDetails: "8. Childen's details - welsh",
    InternationalElement: '11. International elements - welsh',
    additionationDetailsAboutChildern: 'Additional details about the children - welsh',
  },
  keys: {
    whatAreYouAsking: 'What are you asking the court to do? - welsh',
    wantingCourtToDo: 'Describe what you want the court to do regarding the children in this application - welsh',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing? - welsh',
    askingNoHearing: 'Are you asking for a without notice hearing? - welsh',
    phoneNumber: 'Phone number -welsh',
    emailAddress: 'Contact number of the person named on the application - welsh',
    fullName: 'Full name - welsh',
    dateOfBirth: 'Date of birth - welsh',
    gender: 'Gender - welsh',
    address: 'Address - welsh',
    ordersAppliedFor: 'Orders applied for - welsh',
    isDecisionTaken:
      'State everyone who has parental responsibility for child 2 and how they have parental responsibility - welsh',
    socialServiceLink: 'Are any of the children known to social services? - welsh',
    subjectToChildProtection: 'Are any of the children the subject of a child protection plan? - welsh',
    haveOtherChildern: "Do you or the respondents have other children who aren't part of this application? - welsh",
    liveOutSideUk: "Are the children's lives mainly based outside of England and Wales?",
    basedOutSideEnglandOrWales:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales? - welsh",
    anotherPersonSameOrder:
      'Could another person in the application apply for a similar order in a country outside England or Wales? - welsh',
    otherCountryRequestInfo:
      'Has another country asked (or been asked) for information or help for the children? - welsh',
    detailOfWhyWithoutNotice: 'Give details of why you’re asking for a without notice hearing - welsh',
    areAskingwithoutNoticeHearing:
      'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application?',
    areAskingwithoutNoticeHearingDetails: 'Details - welsh',
    areAskingDuetoNoTimeGrant:
      'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people?',
    areAskingDuetoNoTimeGrantDetails: 'Details',
    doYouNeedAWithoutNoticeHearingDetails: 'Details - welsh',
    whoChildLiveWith: 'Decide who the children live with and when - welsh',
    childTimeSpent: 'Decide how much time the children spend with each person - welsh',
    stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something - welsh',
    resolveSpecificIssue: 'Resolve a specific issue you are concerned about - welsh',
    changeChildrenNameSurname: "Changing the children's names or surname - welsh",
    allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children - welsh',
    takingChildOnHoliday: 'Taking the children on holiday - welsh',
    relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales - welsh',
    relocateChildrenOutsideUk:
      'Relocating the children outside of England and Wales (including Scotland and Northern Ireland) - welsh',
    specificHoliday: 'A specific holiday or arrangement',
    whatSchoolChildrenWillGoTo: 'What school the children will go to',
    religiousIssue: 'A religious issue',
    changeChildrenNameSurnameA: "Changing the children's names or surname",
    medicalTreatment: 'Medical treatment',
    relocateChildrenDifferentUkAreaA: 'Relocating the children to a different area in England and Wales',
    relocateChildrenOutsideUkA:
      'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
    returningChildrenToYourCare:
      'Returning the children to your care <div id="resolveSpecificIssueSubField-8-item-hint" class="govuk-hint govuk-checkboxes__hint">If the children have been abducted, unlawfully removed or unlawfully retained</div>',
    childInvolvementInSupervision:
      'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?',
    attendedMiamMidiation: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
    mediatorConfirmation: 'Has a mediator confirmed that you do not need to attend a MIAM?',
    reasonForNotAttendingMiam: 'Do you have valid reasons for not attending a MIAM?',
    validResonsNotAttendingMiam: 'What are your valid reasons for not attending a MIAM?',
    domesticViolence: GeneralContentCy.domesticViolence,
    childProtection: GeneralContentCy.childProtection,
    urgentHearing: GeneralContentCy.urgentHearing,
    previousMIAMOrExempt: GeneralContentCy.previousMIAMOrExempt,
    validExemption: GeneralContentCy.validExemption,
    noReason: GeneralContentCy.noReason,
    domesticVoilenceHeading: DomesticAbuseCy().title,
    childProtectionHeading: ChildProtectionCy().title,
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case?',
    policeInvolvement: 'The police have been involved',
    policeInvolvement_hint:
      'This may mean that someone in the application (you or the respondents) have been arrested, cautioned, charged or convicted for domestic or child abuse offences. Select all evidence you have to support your claim.',
    evidenceOfSomeoneArrest:
      'Evidence that someone in the application has been arrested for a domestic violence offence',
    evidenceOfPolice: 'Evidence of a police caution for a domestic violence offence',
    evidenceOfOnGoingCriminalProceeding: 'Evidence of ongoing criminal proceedings for a domestic violence offence',
    evidenceOfConviction: 'Evidence of a conviction for a domestic violence offence',
    evidenceOFProtectionNotice: 'A domestic violence protection notice issued against someone in the application',
    courtInvolvement: 'A court has already been involved',
    boundedByCourtAction:
      'Someone in the case is bound by a court order in connection with a domestic violence offence',
    protectionInjuction: ' protective injunction is in place',
    fmlAct1996:
      'An undertaking given in England and Wales under section 46 or 63E of the Family Law Act 1996 (or given in Scotland or Northern Ireland in place of a protective injunction) by a prospective party, provided that a cross-undertaking relating to domestic violence was not given by another prospective party',
    ukdomesticVoilcenceUK:
      'There has been a finding of fact in proceedings in the United Kingdom, that proves that someone in the case has committed domestic violence',
    ukPotentialVictim:
      'An expert report was produced as evidence in proceedings in the United Kingdom, and it showed that a person with whom a prospective party is or was in a family relationship was a victim (or potential victim) of domestic abuse by that person',
    courtInvolvement_hint:
      'A court has made an order against you or the other people in the application (or someone close to you, or them) in connection to domestic violence and abuse. Select all evidence you have to support your claim.',
    letterOfBeingVictim:
      'A letter confirms that you or the other people in the application are (or have been) a victim of domestic violence or abuse',
    letterFromHealthProfessional: 'A letter or report from an appropriate health professional',
    letterFromHealthProfessional_hint:
      'The letter or report must confirm that an appropriate health professional has examined the person directly - and in their professional judgement, the person has (or has had) injuries that are consistent with being a victim of domestic violence',
    letterFromHPfromPerspectiveParty:
      'A letter or report confirming that there was a referral by an appropriate health professional of a prospective party to a person who provides specialist support or assistance for victims of, or those at risk of, domestic violence',
    letterFromHPfromPerspectiveParty_hint:
      '<div class="govuk-hint govuk-checkboxes__hint" id="sletterconfirmation-hint">The letter or report must be from: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>the appropriate health professional who made the referral</li> <li>an appropriate health professional who has access to the medical records of the prospective party referred to</li> <li>or the person to whom the referral was made</li> </ul> </div>',
    letterFromPublicAuthority:
      'A letter from a public authority confirming that a person with whom a prospective party is or was in a family relationship, was assessed as being, or at risk of being, a victim of domestic violence by that prospective party (or a copy of that assessment)',
    letterOfBeingVictim_hint:
      'This may mean that a health professional has confirmed injuries that are (or were) a result of domestic violence and abuse. Select which evidence of this you can provide.',
    letterFromAuthority: 'A letter from a local authority or other agency confirms a risk of harm',
    letterFromMultiAgencyMember:
      "A letter from any person who is a member of a multi-agency risk assessment conference, or local safeguarding forum. The letter confirms that one of the people in the application, or someone in that person's family, are (or have been) at risk of harm from domestic violence from a prospective party.",
    letterFromOfficer:
      'A letter from an officer employed by a local authority or housing association, for the purpose of supporting tenants.',
    letterFromOfficer_hint:
      "<div class='govuk-hint govuk-checkboxes__hint' id='authorityletter-hint'>The letter must contain: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'> <li>a statement that says that in their professional judgement, a prospective party poses an actual or potential risk of domestic violence towards someone else who they are (or have been) in a family relationship with.</li> <li>a description of the specific information they relied on to support this judgement</li> <li>a description of the support that they provided to the victim (or potential victim) of domestic violence from the prospective party</li> </ul> </div>",
    letterFromAuthority_hint:
      'For example, a local authority or housing association has confirmed there is or has been a risk of domestic violence or abuse. Select which evidence of this you can provide.',
    letterFromSupportService: 'A letter from a domestic violence or abuse support service, specialist or organisation',
    letterFromSupportService_hint:
      'This could be an independent domestic violence or abuse adviser confirming support to you or the other people in this application (the respondents). Select which evidence of this you can provide.',
    letterFromDomesticViolenceAdvisor:
      'A letter from an independent domestic violence advisor confirming that they are providing support to a prospective party',
    letterFromSexualViolenceAdvisor:
      'A letter from an independent sexual violence advisor confirming that they are providing support to a prospective party relating to sexual violence by another prospective party',
    letterFromOrgDomesticViolenceSupport:
      'A letter from an organisation providing domestic violence support services, or a registered charity',
    letterFromOrgDomesticViolenceInUk:
      'A letter or report from an organisation providing domestic violence support services in the United Kingdom',
    letterFromOrgDomesticViolenceSupportHint:
      "The letter confirms all the following.<br/>The Organisation: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>is situated in England and Wales</li><li>has been operating for an uninterrupted period of six months or more</li><li>provided a prospective party with support in relation to that person’s needs as a victim, or a person at risk, of domestic violence</li></ul>The letter contains all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>a statement to the effect that, in the reasonable professional judgment of the author of the letter, the prospective party is, or is at risk of being, a victim of domestic violence</li><li>a description of the specific matters relied upon to support that judgment</li><li>a description of the support provided to the prospective party</li><li>a statement of the reasons why the prospective party needed that support</li></ul>",
    letterFromOrgDomesticViolenceInUkHint:
      "The letter or report must confirm all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>that a person with whom a prospective party is or was in a family relationship was refused admission to a refuge </li><li>the date on which they were refused admission to the refuge</li><li>they sought admission to the refuge becuase of allegations of domestic violence by the prospective party</li></ul>",
    ILRDuetoDomesticAbuse:
      'You or any of the other people in this application (the respondents) have been granted indefinite leave to remain in the UK as a victim of domestic violence or abuse',
    ILRDuetoDomesticAbuse_hint: 'A letter from the Home Office will have confirmed that leave was granted',
    financiallyAbuse:
      'You have evidence that you or the other people in the application (the respondents) have been (or are at risk of being) financially abused by the other party',
    financiallyAbuse_hint:
      'Financial abuse is a way of controlling someone being able to earn, spend or keep their own money. For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>a copy of a credit card account, loan document or bank statements</li><li>a letter from a domestic violence support organisation</li><li>emails, text messages or a diary kept by the victim</li> </ul>',
    noneOfOptions: 'None of the above',
    localAuthority:
      'The children in the application, or another child in the household, is the subject of enquiries by a local authority under section 47 of the Children Act 1989 Act',
    localAuthorityHint:
      'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm. See <a href="https://www.legislation.gov.uk/ukpga/1989/41/section/17" class="govuk-link" target="_blank" aria-label="section 47 of the Children Act 1989 Act">section 47 of the Children Act 1989 Act</a> for further details.',
    childProtectionPlan:
      'The children in the application, or another child in the household, is the subject of a child protection plan put in place by the local authority',
    freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety - welsh',
    freedomPhysicalSafetyInFamily:
      'There is a risk to the life, freedom or physical safety of someone in your family - welsh',
    riskSafetyInHome: 'There is a risk to the safety of your home - welsh',
    riskUnreasonableFinancialHardship:
      'Any delay caused by attending a MIAM would cause a risk of unreasonable financial hardship - welsh',
    riskOfHarmToChildren: 'Any delay caused by attending a MIAM would cause a risk of harm to the children - welsh',
    unlawfullyRemovedFromUK:
      'Any delay caused by attending a MIAM would cause a risk that the children will be unlawfully removed from the UK or unlawfully kept overseas - welsh',
    riskOfUnfairCourtDecision:
      'Any delay caused by attending a MIAM would cause a significant risk of an unfair court decision (miscarriage of justice) - welsh',
    riskOfIrretrievableProblems:
      'Any delay caused by attending a MIAM would cause a risk of irretrievable problems, including irretrievable loss of evidence in the case - welsh',
    riskOfCourtProceedingsDispute:
      'There is a risk of court proceedings related to the dispute starting or taking place in a country other than England or Wales - welsh',
    fourMonthsPriorAttended: `In the 4 months prior to making the application, you attended 
                            a MIAM or participated in another form of non-court dispute resolution relating 
                            to the same or substantially the same dispute`,
    onTimeParticipation: `At the time of making the application, you are participating in another
                        form of non-court dispute resolution relating to the same or 
                        substantially the same dispute`,
    beforeInitiationProceeding: `This application would be made in existing proceedings which are continuing 
                               and you attended a MIAM before initiating those proceedings`,
    fourMonthsPriorFiled: `In the 4 months prior to making the application, you filed a relevant
                        family application confirming that a MIAM exemption applied and that application
                        related to the same or substantially the same dispute`,
    miamExamptionApplied: `The application would be made in existing proceedings which are continuing
                         and a MIAM exemption applied to the application for those proceedings`,
    beforStatingApplication: `The application would be made in existing proceedings which 
                            are continuing and and the applicant attended a MIAM before starting those proceedings`,
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;

  return {
    ...enContent,
    language: content.language,
    sections: [
      MiamTitle(enContent),
      MiamAttendance(enContent, userCase),
      MiamExemption(enContent, userCase),
      TypeOfOrder(enContent, userCase),
      WithoutNoticeHearing(enContent, userCase),
      ChildernDetails(enContent, userCase),
      ChildernDetailsAdditional(enContent, userCase),
      InternationalElement(enContent, userCase),
    ],
  };
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;

  return {
    ...cyContent,
    language: content.language,
    sections: [
      MiamTitle(enContent),
      MiamAttendance(enContent, userCase),
      MiamExemption(enContent, userCase),
      TypeOfOrder(cyContent, userCase),
      WithoutNoticeHearing(cyContent, userCase),
      ChildernDetails(cyContent, userCase),
      ChildernDetailsAdditional(cyContent, userCase),
      InternationalElement(cyContent, userCase),
    ],
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
