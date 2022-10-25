/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/content';

import {
  ChildernDetails,
  ChildernDetailsAdditional,
  InternationalElement,
  MiamAttendance,
  MiamExemption,
  MiamTitle,
  PastAndCurrentProceedings,
  TypeOfOrder,
  WithoutNoticeHearing,
} from './mainUtil';
import { hearingDetailsContents } from './util/hearingwithout.util';
import { MiamFieldsLoader } from './util/miam.util';
import { otherProceedingsContents } from './util/otherProceeding.util';
import { typeOfCourtOrderContents } from './util/typeOfOrder.util';

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
    otherProceedings: '9. Past and current proceeding',
    additionationDetailsAboutChildern: 'Additional details about the children',
  },
  keys: {
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
    childInvolvementInSupervision:
      'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?',
    attendedMiamMidiation: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
    mediatorConfirmation: 'Has a mediator confirmed that you do not need to attend a MIAM?',
    reasonForNotAttendingMiam: 'Do you have valid reasons for not attending a MIAM?',
    validResonsNotAttendingMiam: 'What are your valid reasons for not attending a MIAM?',
    domesticVoilenceHeading: DomesticAbuseEn().title,
    childProtectionHeading: ChildProtectionEn().title,
    midatatorDocumentTitle: EnMidiationDocument().title,
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case?',
  },
};
export const cyContent: typeof enContent = {
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
    otherProceedings: '9. Past and current proceeding - welsh',
    additionationDetailsAboutChildern: 'Additional details about the children - welsh',
  },
  keys: {
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
    childInvolvementInSupervision:
      'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?',
    attendedMiamMidiation: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
    mediatorConfirmation: 'Has a mediator confirmed that you do not need to attend a MIAM?',
    reasonForNotAttendingMiam: 'Do you have valid reasons for not attending a MIAM?',
    validResonsNotAttendingMiam: 'What are your valid reasons for not attending a MIAM?',
    domesticVoilenceHeading: DomesticAbuseCy().title,
    childProtectionHeading: ChildProtectionCy().title,
    midatatorDocumentTitle: CyMidiationDocument().title,
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case?',
  },
};

const en = (content: CommonContent, newEnContents?: any) => {
  const userCase = content.userCase!;

  return {
    ...enContent,
    language: content.language,
    sections: [
      MiamTitle(enContent),
      MiamAttendance(enContent, userCase),
      MiamExemption(newEnContents, userCase),
      TypeOfOrder(enContent, userCase),
      WithoutNoticeHearing(enContent, userCase),
      ChildernDetails(enContent, userCase),
      ChildernDetailsAdditional(enContent, userCase),
      PastAndCurrentProceedings(enContent, userCase),
      InternationalElement(enContent, userCase),
    ],
  };
};

const cy: typeof en = (content: CommonContent, newCyContents?: any) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      MiamTitle(cyContent),
      MiamAttendance(cyContent, userCase),
      MiamExemption(newCyContents, userCase),
      TypeOfOrder(cyContent, userCase),
      WithoutNoticeHearing(cyContent, userCase),
      ChildernDetails(cyContent, userCase),
      ChildernDetailsAdditional(cyContent, userCase),
      PastAndCurrentProceedings(cyContent, userCase),
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

export const SystemLanguageContent = (content, Function) => {
  return content['language'] === 'en' ? Function(content.userCase)?.en() : Function(content.userCase)?.cy();
};

export const generateContent: TranslationFn = content => {
  const newContents = content['language'] === 'en' ? enContent : cyContent;
  newContents['keys'] = {
    ...newContents.keys,
    ...MiamFieldsLoader(SystemLanguageContent, content),
    ...otherProceedingsContents(content['language']),
    ...hearingDetailsContents(content['language']),
    ...typeOfCourtOrderContents(content['language']),
    ...hearingDetailsContents(content['language']),
  };
  const translations = languages[content.language](content, newContents);
  return {
    ...translations,
    form,
  };
};
