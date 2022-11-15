/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { CaseWithId } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, YesOrNo } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import * as Urls from '../../urls';

import { DATE_FORMATTOR } from './common/dateformatter';
import { HTML } from './common/htmlSelectors';
import { ANYTYPE } from './common/index';
import { InternationElementHelper } from './helpers/InternationElementsHelper';
// eslint-disable-next-line import/namespace
import { applicantAddressParser, applicantAddressParserForRespondents, applicantContactDetailsParser, applicantCourtCanLeaveVoiceMail, otherPeopleAddressParser } from './helpers/applicantHelper';
import {  courtTypeOfOrderHelper } from './helpers/courtOrderHelper';
import { hearingDetailsHelper } from './helpers/hearingdetailHelper';
import { MiamHelper } from './helpers/miamHelper';
import { resonableAdjustmentHelper } from './helpers/reasonableAdjustment';
import { SafetyConcernsHelper } from './helpers/satetyConcernHelper';
import { SummaryList, SummaryListContent, SummaryListContentWithBoolean, getSectionSummaryList } from './lib/lib';
import { OPotherProceedingsSessionParserUtil } from './util/otherProceeding.util';

/* eslint-disable import/namespace */
export const LocationDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whereDoChildLive'],
      value: userCase['c100RebuildChildPostCode'],
      changeUrl: Urls['C100_CHILD_ADDRESS'],
    },
  ];
  return {
    title: sectionTitles['locationDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const TypeOfApplication = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['writtenAgreement'],
      value: userCase['sq_writtenAgreement'],
      changeUrl: Urls['C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT'],
    },
  ];
  return {
    title: sectionTitles['typeOfApplication'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const LegalRepresentativeDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['willYoubeUsingLegalRespresentator'],
      value: userCase['sq_legalRepresentation'],
      changeUrl: Urls['C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION'],
    },
    {
      key: keys['doyouWantLegalRespresentatorToCompleteApplication'],
      value: userCase['sq_legalRepresentationApplication'],
      changeUrl: Urls['C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION'],
    },
  ];
  return {
    title: sectionTitles['legalRepresentativeDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const PermissionForApplication = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whyCourtGrantSubmittingPermission'],
      value: userCase['sq_permissionsRequest'],
      changeUrl: Urls['C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST'], 
    },
    {
      key: keys['reasonPermissionRequired'],
      value: userCase['sq_courtPermissionRequired'],
      changeUrl: Urls['C100_SCREENING_QUESTIONS_COURT_PERMISSION'],
    },
    {
      key: keys['whyPermissionRequiredFromCourt'],
      valueHtml: userCase.hasOwnProperty('sq_permissionsWhy') ? (HTML.UNORDER_LIST + userCase['sq_permissionsWhy']?.map(props => HTML.LIST_ITEM + keys[props] + HTML.LIST_ITEM_END) + HTML.UNORDER_LIST_END).split(',').join('')
      : '',
      changeUrl: Urls['C100_SCREENING_QUESTIONS_PERMISSIONS_WHY'],
    },
  ];
  return {
    title: sectionTitles['permissionForApplication'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};





/* eslint-disable import/namespace */
export const TypeOfOrder = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whatAreYouAsking'],
      value: '',
      valueHtml: courtTypeOfOrderHelper(userCase, keys, 'too_courtOrder'),
      changeUrl: Urls['C100_TYPE_ORDER_SELECT_COURT_ORDER'],
    },
    {
      key: keys['wantingCourtToDo'],
      value: userCase['too_shortStatement'],
      changeUrl: Urls['C100_TYPE_ORDER_SHORT_STATEMENT'],
    },
  ];
  return {
    title: sectionTitles['AdvisingCourt'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const WithoutNoticeHearing = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['qualifyForUrgentHearing'],
      value: userCase['hwn_hearingPart1'],
      changeUrl: Urls['C100_HEARING_WITHOUT_NOTICE_PART1'],
    },
    {
      key: keys['askingNoHearing'],
      value: userCase['hearingPart1'],
      valueHtml: hearingDetailsHelper(userCase, keys, 'hwn_reasonsForApplicationWithoutNotice'),
      changeUrl: Urls['C100_HEARING_WITHOUT_NOTICE_PART2'],
    },
  ];
  return {
    title: sectionTitles['WithoutNoticeHearing'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const PeopleDetails = ({ sectionTitles, keys, ...content }: SummaryListContent): SummaryList | undefined => {
  const SummaryData = [];

  return {
    title: sectionTitles['peopleDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

//peopleDetails

/* eslint-disable import/namespace */
export const ChildernDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const sessionChildData = userCase['cd_children'];
  const newChildDataStorage: { key: string; keyHtml?: string; value: string; valueHtml?: string; changeUrl: string }[] =
    [];
  for (const child in sessionChildData) {
    const firstname = sessionChildData[child]['firstName'],
      lastname = sessionChildData[child]['lastName'],
      id = sessionChildData[child]['id'],
      personalDetails = sessionChildData[child]['personalDetails'],
      childMatters = sessionChildData[child]['childMatters'],
      parentialResponsibility = sessionChildData[child]['parentialResponsibility'];
    const childNo = Number(child) + 1;
    newChildDataStorage.push(
      {
        key: '',
        keyHtml: '<h4 class="app-task-list__section">Child ' + childNo + '</h4>',
        value: '',
        changeUrl: '',
      },
      {
        key: keys['fullName'],
        value: firstname + ' ' + lastname,
        changeUrl: Urls['C100_CHILDERN_DETAILS_ADD'],
      },
      {
        key: keys['dobLabel'],
        value: DATE_FORMATTOR(personalDetails['dateOfBirth']),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['childGenderLabel'],
        value: personalDetails?.['gender'],
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['orderAppliedFor'],
        value: '',
        valueHtml: (
          HTML.UNORDER_LIST +
          Object.values(childMatters['needsResolution']).map(
            (field: ANYTYPE) => `${HTML.LIST_ITEM}${keys[field]}${HTML.LIST_ITEM_END}`
          ) +
          HTML.UNORDER_LIST_END
        )
          ?.split(',')
          .join(''),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_CHILD_MATTERS'], { childId: id }),
      },
      {
        key: keys['parentalResponsibility']?.split('[^^^]').join(`${Number(child) + 1}`),
        value: parentialResponsibility['statement'],
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY'], { childId: id }),
      },
      {
        key: keys['whoDoesLiveWith'].split('[^childName^]').join(` ${firstname + ' ' + lastname} `),
        value: '',
        valueHtml: HTML.UNORDER_LIST + sessionChildData[child]?.['liveWith']?.map(respectivechild => {
          const { firstName, lastName, partyType } = respectivechild;
          return HTML.LIST_ITEM + firstName + ' ' + lastName + ` - (${partyType}) ` + HTML.LIST_ITEM_END;
        }).toString().split(',').join('').toString() + HTML.UNORDER_LIST_END,
        changeUrl: applyParms(Urls['C100_CHILDERN_LIVE_WITH'], { childId: id }),
      },
    );
  }
  const SummaryData = newChildDataStorage;
  return {
    title: sectionTitles['ChildernDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const ChildernDetailsAdditional = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  let htmlForAdditionalText = userCase?.['cd_childrenKnownToSocialServices'];
  htmlForAdditionalText += HTML.BREAK;
  htmlForAdditionalText += userCase.hasOwnProperty('cd_childrenKnownToSocialServicesDetails')
    ? HTML.RULER +
      HTML.H4 +
      keys['details'] +
      HTML.H4_CLOSE +
      HTML.BREAK +
      userCase['cd_childrenKnownToSocialServicesDetails']
    : '';

  const SummaryData = [
    {
      key: keys['childrenKnownToSocialServicesLabel'],
      value: '',
      valueHtml: htmlForAdditionalText,
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
    {
      key: keys['childrenSubjectOfProtectionPlanLabel'],
      value: userCase['cd_childrenSubjectOfProtectionPlan'],
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
    {
      key: keys['childrenProtectionPlanHint'],
      value: '',
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
  ];
  return {
    title: sectionTitles['additionationDetailsAboutChildern'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const ApplicantDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const sessionApplicantData = userCase['appl_allApplicants'];
  const newApplicantData: { key: string; keyHtml?: string; value: string; valueHtml?: string; changeUrl: string }[] =
    [];
  for (const applicant in sessionApplicantData) {
    const fullname =
      sessionApplicantData[applicant]['applicantFirstName'] +
      ' ' +
      sessionApplicantData[applicant]['applicantLastName'];
    const applicantNo = Number(applicant) + 1;
    const parseStartAndStartAlternativeSubFields = (key, keyArray) => {
      let html = '';
      html += sessionApplicantData[applicant][key];
      if (sessionApplicantData[applicant][keyArray].length > 0) {
        html +=
          HTML.RULER +
          HTML.UNORDER_LIST +
          sessionApplicantData[applicant][keyArray]
            ?.map(item => HTML.LIST_ITEM + item + HTML.LIST_ITEM_END)
            .toString()
            .split(',')
            .join('');
      }
      return html;
    };
    newApplicantData.push(
      {
        key: '',
        keyHtml: HTML.H4_SECTION_TITLE + keys['applicantDetails'].split('[^^^]').join(applicantNo.toString()) + HTML.H4,
        value: '',
        changeUrl: '',
      },
      {
        key: keys['fullName'],
        value: fullname,
        changeUrl: Urls['C100_APPLICANT_ADD_APPLICANTS'],
      },
      {
        key: keys['anyOtherPeopleKnowDetails'],
        value: sessionApplicantData[applicant]['detailsKnown'],
        changeUrl:
         applyParms( Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW'], { applicantId: sessionApplicantData[applicant]['id'] }),
      },
      {
        key: keys['doYouWantToKeep'],
        value: '',
        valueHtml:
          sessionApplicantData[applicant]['detailsKnown'] === 'Yes'
            ? parseStartAndStartAlternativeSubFields('start', 'contactDetailsPrivate')
            : parseStartAndStartAlternativeSubFields('startAlternative', 'contactDetailsPrivateAlternative'),
        changeUrl:
          sessionApplicantData[applicant]['detailsKnown'] === 'Yes'
            ?  applyParms( Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START'], { applicantId: sessionApplicantData[applicant]['id'] })
            :  applyParms( Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE'], { applicantId: sessionApplicantData[applicant]['id'] }),
      },
      {
        key: keys['addressDetails'],
        value: '',
        valueHtml: applicantAddressParser(sessionApplicantData[applicant], keys),
        changeUrl: applyParms( Urls['C100_APPLICANT_ADDRESS_MANUAL'], { applicantId: sessionApplicantData[applicant]['id'] }),
      },
      {
        key: keys['contactDetailsOf'].split('[^applicantName^]').join(` ${fullname} `),
        value: '',
        valueHtml: applicantContactDetailsParser(sessionApplicantData[applicant].applicantContactDetail, keys),
        changeUrl: applyParms( Urls['C100_APPLICANT_CONTACT_DETAIL'], { applicantId: sessionApplicantData[applicant]['id'] }),
      },
      {
        key: keys['voiceMailLabel'],
        value: '',
        valueHtml: applicantCourtCanLeaveVoiceMail(sessionApplicantData[applicant].applicantContactDetail, keys),
        changeUrl: applyParms( Urls['C100_APPLICANT_CONTACT_DETAIL'], { applicantId: sessionApplicantData[applicant]['id'] }),
      }
    );

    //contactDetailsOf
  }
  return {
    title: sectionTitles['ApplicantDetails'],
    rows: getSectionSummaryList(newApplicantData, content),
  };
};

/* eslint-disable import/namespace */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamTitle = ({ sectionTitles, keys, Yes, No, ...content }): SummaryList | undefined => {
  return {
    title: sectionTitles['Miam'],
    rows: getSectionSummaryList([], content),
  };
};

/* eslint-disable import/namespace */
export const MiamAttendance = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['childInvolvementInSupervision'],
      value: userCase['miam_otherProceedings'],
      changeUrl: Urls['C100_MIAM_OTHER_PROCEEDINGS'],
    },
    {
      key: keys['attendedMiamMidiation'],
      value: userCase['miam_attendance'],
      changeUrl: Urls['C100_MIAM_ATTENDANCE'],
    },
    {
      key: keys['midatatorDocumentTitle'],
      value: userCase['miam_haveDocSigned'],
      changeUrl: Urls['C100_MIAM_MEDIATOR_DOCUMENT'],
    },
    {
      key: keys['mediatorConfirmation'],
      value: userCase['miam_mediatorDocument'],
      changeUrl: Urls['C100_MIAM_MEDIATOR_CONFIRMAION'],
    },
    {
      key: keys['reasonForNotAttendingMiam'],
      value: userCase['miam_validReason'],
      changeUrl: Urls['C100_MIAM_VALID_REASON'],
    },
  ];

  return {
    title: sectionTitles['MiamAttendance'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const MiamExemption = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const validReasonForNotAttendingMiam = MiamHelper.miamExemptionParser(userCase, keys);
  const SummaryData = [
    {
      key: keys['validResonsNotAttendingMiam'],
      valueHtml: validReasonForNotAttendingMiam['listOfReasons'],
      changeUrl: Urls['C100_MIAM_GENERAL_REASONS'],
    },
    ...MiamHelper.miamExemptionParserDynamicEnteries(userCase, keys, Urls),
  ];
  return {
    title: sectionTitles['MiamExemption'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const InternationalElement = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = InternationElementHelper(userCase, keys, Urls) as {
    key: string;
    value: string;
    valueHtml: string;
    changeUrl: string;
  }[];
  return {
    title: sectionTitles['InternationalElement'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes in a userCase object and returns a SummaryList object
 * @param {SummaryListContentWithBoolean}  - `sectionTitles` - the titles of the sections in the
 * summary list
 * @param userCase - Partial<CaseWithId>
 * @returns A summary list of the other proceedings section
 */
export const PastAndCurrentProceedings = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const courtOrderDetails =
    '<ul>' +
    userCase['op_courtProceedingsOrders']?.map(
      order => '<li class="govuk-!-padding-bottom-2">' + keys[`${order}Label`] + '</li>'
    ) +
    '</ul>';
  const SummaryData = [
    {
      key: keys['childrenInvolvedCourtCase'],
      value: userCase['op_childrenInvolvedCourtCase'],
      changeUrl: Urls['C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS'],
    },
    {
      key: keys['courtOrderProtection'],
      value: userCase['op_courtOrderProtection'],
      changeUrl: Urls['C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS'],
    },
    {
      key: keys['optitle'],
      valueHtml: userCase.hasOwnProperty('op_courtProceedingsOrders') ? courtOrderDetails?.split(',').join('') : '',
      changeUrl: Urls['C100_OTHER_PROCEEDINGS_DETAILS'],
    },
    ...OPotherProceedingsSessionParserUtil(userCase, keys, Urls, 'op_courtProceedingsOrders'),
  ];
  return {
    title: sectionTitles['otherProceedings'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes in a list of keys and values, and returns a list of objects with keys and values
 * @param {SummaryListContentWithBoolean}  - `sectionTitles` - the titles of the sections in the form
 * @param userCase - Partial<CaseWithId>
 * @returns An object with a title and rows property.
 */
export const SafetyConcerns = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const dataForConcerns = userCase.hasOwnProperty('c1A_safetyConernAbout')
    ? userCase['c1A_safetyConernAbout']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
    : '';
  const SummaryData = [
    {
      key: keys['doYouHaveSafetyConcerns'],
      value: userCase['c1A_haveSafetyConcerns'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY'],
    },
    {
      key: keys['whoAreConcernsAbout'],
      valueHtml: HTML.UNORDER_LIST + dataForConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT'],
    },
  ];
  return {
    title: sectionTitles['safetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes a list of safety concerns and returns a summary list of the concerns and their details
 * @param {SummaryListContentWithBoolean}  - `sectionTitles` - the titles of the sections in the
 * summary list
 * @param userCase - Partial<CaseWithId>
 * @returns An object with a title and rows property.
 */
export const SafetyConcerns_child = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const childSafetyConcerns = userCase.hasOwnProperty('c1A_concernAboutChild')
    ? userCase['c1A_concernAboutChild']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
    : '';
  let subFields = userCase['c1A_concernAboutChild'] as ANYTYPE;
  subFields = subFields
    ?.filter(
      (element: ANYTYPE) =>
        element !== C1AAbuseTypes.ABDUCTION &&
        element !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        element !== C1AAbuseTypes.SOMETHING_ELSE
    )
    ?.map(field => {
      return {
        key: keys['detailsOfChildConcern']
          .split('[***]')
          .join(` ${keys[field]} `)
          .split('[^^^]')
          .join(keys['againstChild']),
        valueHtml: SafetyConcernsHelper(
          userCase,
          keys,
          'c1A_concernAboutChild',
          field,
          C1ASafteyConcernsAbout.CHILDREN
        ),
        changeUrl: applyParms(Urls['C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE'], { abuseType: field }),
      };
    }) as ANYTYPE;

  const SummaryData = [
    {
      key: keys['childConcerns'],
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD'],
    },
  ];
  if (typeof subFields === 'object') {
    SummaryData.push(...subFields);
  }
  /**
   * @policeOrInvestigatorsOtherDetails session Values
   */
  let policeOrInvestigatorsOtherDetailsHTML = '';
  policeOrInvestigatorsOtherDetailsHTML += userCase['c1A_policeOrInvestigatorInvolved'];
  userCase.hasOwnProperty('c1A_policeOrInvestigatorOtherDetails')
    ? (policeOrInvestigatorsOtherDetailsHTML += HTML.RULER +  HTML.H4 +  keys['details'] + HTML.H4_CLOSE + userCase['c1A_policeOrInvestigatorOtherDetails'])
    : (policeOrInvestigatorsOtherDetailsHTML += '');
  /**
   * @c1A_childAbductedBefore session Values
   */
  let c1A_childAbductedBefore = '';
  c1A_childAbductedBefore += userCase?.['c1A_passportOffice'];
  if (userCase.hasOwnProperty('c1A_passportOffice') && userCase.c1A_passportOffice === 'Yes') {
    c1A_childAbductedBefore += HTML.RULER;
    c1A_childAbductedBefore += HTML.H4;
    c1A_childAbductedBefore += keys['childrenMoreThanOnePassport'];
    c1A_childAbductedBefore += HTML.H4_CLOSE;
    c1A_childAbductedBefore += userCase['c1A_childrenMoreThanOnePassport'];
    c1A_childAbductedBefore += HTML.RULER;
    c1A_childAbductedBefore += HTML.H4;
    c1A_childAbductedBefore += keys['possessionChildrenPassport'];
    c1A_childAbductedBefore += HTML.H4_CLOSE;
    c1A_childAbductedBefore += HTML.UNORDER_LIST;
    c1A_childAbductedBefore += userCase['c1A_possessionChildrenPassport']
      .filter(element => element !== 'Other')
      .map(relatives => HTML.LIST_ITEM + relatives + HTML.LIST_ITEM_END)
      .toString()
      .split(',')
      .join('');
    if(userCase['c1A_possessionChildrenPassport'].some(element => element === 'Other')){
      c1A_childAbductedBefore +=  HTML.LIST_ITEM + userCase['c1A_provideOtherDetails'] + HTML.LIST_ITEM_END;
    }  
    c1A_childAbductedBefore += HTML.UNORDER_LIST_END;
  }

  const abdutionScreenData = [
    {
      key: keys['childLocation'],
      valueHtml: userCase['c1A_abductionReasonOutsideUk'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'],
    },
    {
      key: keys['childsCurrentLocationText'],
      valueHtml: userCase['c1A_childsCurrentLocation'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'],
    },
    {
      key: keys['passportOffice'],
      valueHtml: c1A_childAbductedBefore,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE'],
    },
    {
      key: keys['haspassportOfficeNotified'],
      valueHtml: userCase['c1A_abductionPassportOfficeNotified'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION'],
    },
    {
      key: keys['abducionThreats'],
      valueHtml: userCase['c1A_childAbductedBefore'] as string,
      changeUrl: Urls['C100_C1A_CHILD_ABDUCTION_THREATS'],
    },
    
  ];
  if(userCase.hasOwnProperty('c1A_childAbductedBefore') && userCase['c1A_childAbductedBefore'] === 'Yes'){
    abdutionScreenData.push(
      {
        key: keys['previousAbduction'],
        valueHtml: userCase['c1A_previousAbductionsShortDesc'],
        changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS'],
      },
      {
        key: keys['c1A_policeOrInvestigatorInvolved'],
        valueHtml: policeOrInvestigatorsOtherDetailsHTML,
        changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS'],
      },
    );
  }
  /**
   * @StrictChecks whether abduction data is enabled
   */
  if (
    userCase.hasOwnProperty('c1A_concernAboutChild') &&
    userCase['c1A_concernAboutChild']?.some(Element => Element === C1AAbuseTypes.ABDUCTION)
  ) {
    SummaryData.push(...abdutionScreenData);
  }
  return {
    title: sectionTitles['childSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes a list of safety concerns and returns a summary list of the concerns and their details
 * @param {SummaryListContentWithBoolean}  - SummaryListContentWithBoolean - this is the content object
 * that is passed in from the summary list component.
 * @param userCase - Partial<CaseWithId>
 * @returns An object with a title and rows property.
 */
export const SafetyConcerns_yours = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const childSafetyConcerns = userCase.hasOwnProperty('c1A_concernAboutApplicant')
    ? userCase['c1A_concernAboutApplicant']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
    : '';
  let subFields = userCase?.['c1A_concernAboutApplicant'] as ANYTYPE;
  subFields = subFields
    ?.filter(
      (element: ANYTYPE) =>
        element !== C1AAbuseTypes.ABDUCTION &&
        element !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE
    )
    ?.map(field => {
      const keyForFields = field === C1AAbuseTypes.SOMETHING_ELSE  ? keys['detailsOfChildConcern'].split('[***]').join(` ${keys['concerns']} `).split('[^^^]').join(''): keys['detailsOfChildConcern'].split('[***]').join(` ${keys[field]} `).split('[^^^]').join('');
      return {
        key: keyForFields,
        valueHtml: SafetyConcernsHelper(
          userCase,
          keys,
          'c1A_concernAboutApplicant',
          field,
          C1ASafteyConcernsAbout.APPLICANT
        ),
        changeUrl: applyParms(Urls['C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE'], { abuseType: field }),
      };
    }) as ANYTYPE;

  const SummaryData = [
    {
      key: keys['childConcerns'],
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT'],
    },
  ];
  if (typeof subFields === 'object') {
    SummaryData.push(...subFields);
  }
  return {
    title: sectionTitles['yourSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes in a list of keys and a userCase object and returns a summary list object
 * @param {SummaryListContentWithBoolean}  - SummaryListContentWithBoolean - this is the content object
 * that is passed in from the JSON file.
 * @param userCase - Partial<CaseWithId>
 * @returns A summary list
 */
export const SafetyConcerns_others = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const fieldParser = (field, fieldDescription?) => {
    let html = '';
    if (field !== undefined) {
      html += field;
    }
    if (fieldDescription !== undefined) {
      html += HTML.RULER;
      html += HTML.H4;
      html += keys['details'];
      html += HTML.H4_CLOSE;
      html += HTML.BOTTOM_PADDING_3;
      html += fieldDescription;
      html += HTML.BOTTOM_PADDING_CLOSE;
    }
    return html;
  };

  const SummaryData = [
    {
      key: keys['childDrugAbuse'],
      valueHtml: fieldParser(userCase['c1A_otherConcernsDrugs'], userCase['c1A_otherConcernsDrugsDetails']),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS'],
    },
    {
      key: keys['otherWellBeingIssues'],
      valueHtml: fieldParser(userCase['c1A_childSafetyConcerns'], userCase['c1A_childSafetyConcernsDetails']),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_OTHER'],
    },
    {
      key: keys['doWantCourtToAction'],
      value: userCase['c1A_keepingSafeStatement'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION'],
    },
    {
      key: keys['selectSupervisionAgreementLabel'],
      value: userCase['c1A_supervisionAgreementDetails'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED'],
    },
    {
      key: keys['supervisionAgreementOtherWaysLabel'],
      value: userCase['c1A_agreementOtherWaysDetails'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED'],
    },
  ];
  return {
    title: sectionTitles['otherSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};


/* eslint-disable import/namespace */
export const OtherChildrenDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const sessionChildData = userCase['ocd_otherChildren'];
  const newChildDataStorage: { key: string; keyHtml?: string; value: string; valueHtml?: string; changeUrl: string }[] =
    [];
    newChildDataStorage.push(
      {
        key: keys['hasOtherChildren'],
        value: userCase['ocd_hasOtherChildren'] as string,
        changeUrl: Urls['C100_CHILDERN_DETAILS_OTHER_CHILDREN'],
      },
    );
  if(userCase['ocd_hasOtherChildren'] === 'Yes'){
    for (const child in sessionChildData) {
      const firstname = sessionChildData[child]['firstName'],
        lastname = sessionChildData[child]['lastName'],
        id = sessionChildData[child]['id'],
        personalDetails = sessionChildData[child]['personalDetails'];
        const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== ''; 
      const childNo = Number(child) + 1;
      newChildDataStorage.push(
        {
          key: '',
          keyHtml: '<h4 class="app-task-list__section">Child ' + childNo + '</h4>',
          value: '',
          changeUrl: '',
        },
        {
          key: keys['fullName'],
          value: firstname + ' ' + lastname,
          changeUrl: Urls['C100_CHILDERN_OTHER_CHILDREN_NAMES'],
        },
      );

      if(isDateOfBirthUnknown){
        newChildDataStorage.push(
          {
            key: keys['approxCheckboxLabel'],
            value: personalDetails['isDateOfBirthUnknown'],
            changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
          },
          {
            key: keys['approxDobLabel'],
            value: DATE_FORMATTOR(personalDetails['approxDateOfBirth']),
            changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
          },
        );
      }
      else{
        newChildDataStorage.push(
          {
            key: keys['dobLabel'],
            value: DATE_FORMATTOR(personalDetails['dateOfBirth']),
            changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
          },
        );
      }
      newChildDataStorage.push( {
        key: keys['childGenderLabel'],
        value: personalDetails?.['gender'],
        valueHtml: personalDetails?.['gender'] + ' ' + personalDetails.hasOwnProperty('otherGenderDetails') && personalDetails.otherGenderDetails !== '' ? HTML.BREAK + keys['otherGender'] +  HTML.RULER +  HTML.H4 +  keys['details'] + HTML.H4_CLOSE + personalDetails['otherGenderDetails']: '',
        changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
      });
    }
  }  

  const SummaryData = newChildDataStorage;
  return {
    title: sectionTitles['otherChildernDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};


/* eslint-disable import/namespace */
export const RespondentDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const sessionRespondentData = userCase['resp_Respondents'];
  const newRespondentStorage: { key: string; keyHtml?: string; value?: string; valueHtml?: string; changeUrl: string }[] =
    [];
    for (const respondent in sessionRespondentData) {
      const firstname = sessionRespondentData[respondent]['firstName'],
        lastname = sessionRespondentData[respondent]['lastName'],
        id = sessionRespondentData[respondent]['id'],
        personalDetails = sessionRespondentData[respondent]['personalDetails']; //personalDetails
        const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== ''; 
      const respondentNo = Number(respondent) + 1;
      const contactDetails = sessionRespondentData[respondent]['contactDetails'];
      
      /**
       * Name takes
       */
      let changeNameInformation = '';
      const hasNameChanged = personalDetails['hasNameChanged'];
      changeNameInformation += hasNameChanged;
      if(hasNameChanged === 'yes'){
        const changedName = personalDetails['previousFullName'];
        changeNameInformation += HTML.RULER;
        changeNameInformation += HTML.H4;
        changeNameInformation +=keys['details'];
        changeNameInformation += HTML.H4_CLOSE;
        changeNameInformation += HTML.BOTTOM_PADDING_3;
        changeNameInformation += changedName;
        changeNameInformation += HTML.BOTTOM_PADDING_CLOSE;
      }

      let childGender = '';
      childGender += personalDetails['gender'];
      if(personalDetails['otherGenderDetails'] !== ''){
        childGender += HTML.BREAK + HTML.RULER + keys['otherGender'] +  HTML.H4 +  keys['details'] + HTML.H4_CLOSE + HTML.BREAK + personalDetails['otherGenderDetails'];
      }

      newRespondentStorage.push(
        {
          key: '',
          keyHtml: '<h4 class="app-task-list__section">' + keys['respondents'] + ' ' + respondentNo + '</h4>',
          value: '',
          changeUrl: '',
        },
        {
          key: keys['fullName'],
          value: firstname + ' ' + lastname,
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }) ,
        },
        {
          key: keys['hasNameChanged'],
          valueHtml: changeNameInformation,
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        },
        {
          key: keys['childGenderLabel'],
          valueHtml: childGender,
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        },
      );

      if(isDateOfBirthUnknown){
        newRespondentStorage.push(
          {
            key: keys['approxCheckboxLabel'],
            value: personalDetails['isDateOfBirthUnknown'],
            changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
          },
          {
            key: keys['approxDobLabel'],
            value: DATE_FORMATTOR(personalDetails['approxDateOfBirth']),
            changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
          },
        );
      }
      else{
        newRespondentStorage.push(
          {
            key: keys['dobLabel'],
            value: DATE_FORMATTOR(personalDetails['dateOfBirth']),
            changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
          },
        );
      }
      newRespondentStorage.push( 
      {
        key: keys['respondentPlaceOfBirth'],
        value: personalDetails?.['respondentPlaceOfBirth'],
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });

      if(personalDetails['respondentPlaceOfBirthUnknown'] !== 'No'){
        newRespondentStorage.push( 
          {
            key: keys['respondentPlaceOfBirthUnknown'],
            value: personalDetails?.['respondentPlaceOfBirthUnknown'],
            changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
          });
      }

      const relationShipToChildren = sessionRespondentData[respondent]['relationshipDetails']?.['relationshipToChildren'];
      relationShipToChildren.forEach(element => {
        const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
        const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
        newRespondentStorage.push({
          key: keys['relationshipTo'] + ' ' + childFullName ,
          value: element['relationshipType'],
          valueHtml: element['relationshipType'] + ' ' + element['otherRelationshipTypeDetails'] !== '' ?  element['otherRelationshipTypeDetails'] : '' , //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD'], { respondentId: id, childId: element['childId'] }),
        });
      });
      
     if(!sessionRespondentData[respondent].hasOwnProperty('addressUnknown')){
      newRespondentStorage.push({
        key: keys['addressDetails'],
        value: '',
        valueHtml: applicantAddressParserForRespondents(sessionRespondentData[respondent].address, keys),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADDRESS_MANUAL'], { respondentId: id }),
      },
      );
     }
     if(sessionRespondentData[respondent].hasOwnProperty('addressUnknown') && sessionRespondentData[respondent]['addressUnknown'] === YesOrNo.YES){
      newRespondentStorage.push({
        key: keys['explainNoLabel'],
        value: sessionRespondentData[respondent]?.['addressUnknown'],
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADDRESS_MANUAL'], { respondentId: id }),
      },
      );
     }
      
      newRespondentStorage.push(
        {
          key: 'Email',
          value: contactDetails?.['emailAddress'],
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
        },
      );

      if(contactDetails.hasOwnProperty('donKnowEmailAddress') && contactDetails['donKnowEmailAddress'] === 'Yes'){
        newRespondentStorage.push(
          {
            key: 'I dont know their email address',
            value: contactDetails?.['donKnowEmailAddress'],
            changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
          },
        );
      }
      newRespondentStorage.push(
        {
          key: 'Telephone number',
          value: contactDetails?.['telephoneNumber'],
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
        }
      );
      if(contactDetails.hasOwnProperty('donKnowTelephoneNumber') && contactDetails['donKnowTelephoneNumber'] === 'Yes'){
        newRespondentStorage.push(
          {
            key: 'I dont know their telephone number',
            value: contactDetails?.['donKnowTelephoneNumber'],
            changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
          },
        );
      }
  
    }
   
  const SummaryData = newRespondentStorage;
  return {
    title: sectionTitles['detailsOfRespondent'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};


/* eslint-disable import/namespace */
export const OtherPeopleDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const sessionOtherPeopleData = userCase['oprs_otherPersons'];
  const newOtherPeopleStorage: { key: string; keyHtml?: string; value?: string; valueHtml?: string; changeUrl: string }[] =
    [];
    for (const respondent in sessionOtherPeopleData) {
      const firstname = sessionOtherPeopleData[respondent]['firstName'],
        lastname = sessionOtherPeopleData[respondent]['lastName'],
        id = sessionOtherPeopleData[respondent]['id'],
        personalDetails = sessionOtherPeopleData[respondent]['personalDetails']; //personalDetails
        const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== ''; 
      const OtherRespondentNo = Number(respondent) + 1;
      
      /**
       * Name takes
       */
      let changeNameInformation = '';
      const hasNameChanged = personalDetails['hasNameChanged'];
      if(hasNameChanged === 'dontKnow'){
        changeNameInformation += keys['dontKnow'];
      }else{
        changeNameInformation += hasNameChanged;
      }

      if(hasNameChanged === 'yes'){
        const changedName = personalDetails['previousFullName'];
        changeNameInformation += HTML.RULER;
        changeNameInformation += HTML.H4;
        changeNameInformation +=keys['details'];
        changeNameInformation += HTML.H4_CLOSE;
        changeNameInformation += HTML.BOTTOM_PADDING_3;
        changeNameInformation += changedName;
        changeNameInformation += HTML.BOTTOM_PADDING_CLOSE;
      }

      let childGender = '';
      childGender += personalDetails['gender'];
      if(personalDetails['otherGenderDetails'] !== ''){
        childGender += HTML.BREAK + HTML.RULER + keys['otherGender'] +  HTML.H4 +  keys['details'] + HTML.H4_CLOSE + HTML.BREAK + personalDetails['otherGenderDetails'];
      }

      newOtherPeopleStorage.push(
        {
          key: '',
          keyHtml: '<h4 class="app-task-list__section">' + keys['otherPerson'] + ' ' + OtherRespondentNo + '</h4>',
          value: '',
          changeUrl: '',
        },
        {
          key: keys['fullName'],
          value: firstname + ' ' + lastname,
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADD'], { otherPersonId: id }) ,
        },
        {
          key: keys['hasNameChanged'],
          valueHtml: changeNameInformation,
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        },
        {
          key: keys['childGenderLabel'],
          valueHtml: childGender,
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        },
      );

      if(isDateOfBirthUnknown){
        newOtherPeopleStorage.push(
          {
            key: keys['approxCheckboxLabel'],
            value: personalDetails['isDateOfBirthUnknown'],
            changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
          },
          {
            key: keys['approxDobLabel'],
            value: DATE_FORMATTOR(personalDetails['approxDateOfBirth']),
            changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
          },
        );
      }
      else{
        newOtherPeopleStorage.push(
          {
            key: keys['dobLabel'],
            value: DATE_FORMATTOR(personalDetails['dateOfBirth']),
            changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
          },
        );
      }

      const relationShipToChildren = sessionOtherPeopleData[respondent]['relationshipDetails']?.['relationshipToChildren'];
      relationShipToChildren?.forEach(element => {
        const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
        const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
        newOtherPeopleStorage.push({
          key: keys['relationshipTo'] + ' ' + childFullName ,
          value: element['relationshipType'],
          valueHtml: element['relationshipType'] + ' ' + element['otherRelationshipTypeDetails'] !== '' ?  element['otherRelationshipTypeDetails'] : '' , //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD'], { otherPersonId: id, childId: element['childId'] }),
        });
      });
      
     if(!sessionOtherPeopleData[respondent].hasOwnProperty('addressUnknown')){
      newOtherPeopleStorage.push({
        key: keys['addressDetails'],
        value: '',
        valueHtml: otherPeopleAddressParser(sessionOtherPeopleData[respondent].address),
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
      },
      );
     }
     if(sessionOtherPeopleData[respondent].hasOwnProperty('addressUnknown') && sessionOtherPeopleData[respondent]['addressUnknown'] === YesOrNo.YES){
      newOtherPeopleStorage.push({
        key: keys['explainNoLabel'],
        value: sessionOtherPeopleData[respondent]['addressUnknown'],
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
      },
      );
     }
    }
   
  const SummaryData = newOtherPeopleStorage;
  return {
    title: sectionTitles['detailofOtherPeople'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const HelpWithFee = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData: ANYTYPE = [
    {
      key: keys['doRequireHelpwithFee'],
      value: userCase['hwf_needHelpWithFees'],
      changeUrl: Urls['C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES'], 
    },
  ];

    SummaryData.push({
      key: keys['hwfApplication'],
      valueHtml: userCase['helpWithFeesReferenceNumber'],
      changeUrl: Urls['C100_HELP_WITH_FEES_HWF_GUIDANCE'], 
    });
  return {
    title: sectionTitles['helpWithFee'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};


export const whereDoChildLive = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData: ANYTYPE = [
    {
      key: keys['doRequireHelpwithFee'],
      value: userCase['hwf_needHelpWithFees'],
      changeUrl: Urls['C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES'], 
    },
  ];

    SummaryData.push({
      key: keys['hwfApplication'],
      valueHtml: userCase['helpWithFeesReferenceNumber'],
      changeUrl: Urls['C100_HELP_WITH_FEES_HWF_GUIDANCE'], 
    });
  return {
    title: sectionTitles['whereTheChildrenLive'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const reasonableAdjustment = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData: ANYTYPE = [
    {
      key: keys['attendingCourtHeading'],
      value: userCase['hwf_needHelpWithFees'],
      valueHtml: userCase.hasOwnProperty('ra_typeOfHearing') ? HTML.UNORDER_LIST + userCase['ra_typeOfHearing'].map(element => HTML.LIST_ITEM + keys[element] + HTML.LIST_ITEM_END).toString().split(',').join('') + HTML.UNORDER_LIST_END : '',
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_ATTENDING_COURT'], 
    },
    {
      key: keys['langaugeRequirementHeading'],
      valueHtml: HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_languageNeeds') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS'], 
    },
    {
      key: keys['disabilityRequirementHeading'], //ra_disabilityRequirements
      value: '',
      valueHtml:  userCase.hasOwnProperty('ra_disabilityRequirements') && userCase['ra_disabilityRequirements'] ? HTML.UNORDER_LIST + userCase['ra_disabilityRequirements'].map(element => HTML.LIST_ITEM + keys[element] + HTML.LIST_ITEM_END).toString().split(',').join('') + HTML.UNORDER_LIST_END : '',
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS'], 
    },
    {
      key: keys['specialArrangementsHeading'],
      valueHtml: HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_specialArrangements') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS'], 
    },
    {
      key: keys['documentInformationHeading'],
      value: '',
      valueHtml: HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_documentInformation') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION'], 
    },
    {
      key: keys['communicationHelpHeading'],
      value: '', 
      valueHtml: HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_communicationHelp') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP'], 
    },
    {
      key: keys['supportCourtHeading'],
      value: '', 
      valueHtml: HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_supportCourt') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT'], 
    },
    {
      key: keys['feelComfortableHeading'],
      value: '',
      valueHtml: HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_feelComportable') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE'], 
    },
    {
      key: keys['travellingCourtHeading'],
      value: '', 
      valueHtml: HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_travellingCourt') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT'], 
    },
  ];
  return {
    title: sectionTitles['reasonAbleAdjustment'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};
