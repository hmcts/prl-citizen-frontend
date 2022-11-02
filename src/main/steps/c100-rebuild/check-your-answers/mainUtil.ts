/* eslint-disable prettier/prettier */
import { CaseWithId } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import * as Urls from '../../urls';

import { DATE_FORMATTOR } from './common/dateformatter';
import { HTML } from './common/htmlSelectors';
import { InternationElementHelper } from './helpers/InternationElementsHelper';
import { CourtOrderParserHelper } from './helpers/courtOrderHelper';
import { hearingDetailsHelper } from './helpers/hearingdetailHelper';
import { MiamHelper } from './helpers/miamHelper';
import { SafetyConcernsHelper } from './helpers/satetyConcernHelper';
import { SummaryList, SummaryListContent, SummaryListContentWithBoolean, getSectionSummaryList } from './lib/lib';
import { OPotherProceedingsSessionParserUtil } from './util/otherProceeding.util';

/* eslint-disable import/namespace */
export const TypeOfOrder = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whatAreYouAsking'],
      value: '',
      valueHtml: CourtOrderParserHelper(userCase, keys, 'too_courtOrder'),
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
            (field: any) => `${HTML.LIST_ITEM}${keys[field]}${HTML.LIST_ITEM_END}`
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
      }
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
          Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW'] +
          `?applicantId=${sessionApplicantData[applicant]['id']}`,
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
            ? Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START'] +
              `?applicantId=${sessionApplicantData[applicant]['id']}`
            : Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE'] +
              `?applicantId=${sessionApplicantData[applicant]['id']}`,
      },
      {
        key: 'Address details',
        value: '',
        valueHtml:
        sessionApplicantData[applicant].hasOwnProperty('applicantAddress1') ? sessionApplicantData[applicant]?.['applicantAddress1'] : '' +
          HTML.BREAK +
          sessionApplicantData[applicant].hasOwnProperty('applicantAddress2') ? sessionApplicantData[applicant]?.['applicantAddress2'] : '' +
          HTML.BREAK +
          sessionApplicantData[applicant].hasOwnProperty('applicantAddressTown') ? sessionApplicantData[applicant]?.['applicantAddressTown']: '' +
          HTML.BREAK +
          sessionApplicantData[applicant].hasOwnProperty('applicantAddressCounty') ? sessionApplicantData[applicant]?.['applicantAddressCounty'] : '' +
          HTML.BREAK +
          HTML.BREAK +
          sessionApplicantData[applicant].hasOwnProperty('applicantAddressPostcode') ? sessionApplicantData[applicant]?.['applicantAddressPostcode'] : ''+
          HTML.RULER +
          HTML.H4 +
          'have you lived at this address for more than 5 years ?' +
          HTML.H4_CLOSE +
          sessionApplicantData[applicant].hasOwnProperty('applicantAddressHistory')? sessionApplicantData[applicant]?.['applicantAddressHistory'] : '' +
          HTML.RULER +
          HTML.H4 +
          'Previous Addresses' +
          HTML.H4_CLOSE +
          sessionApplicantData[applicant].hasOwnProperty('applicantProvideDetailsOfPreviousAddresses')? sessionApplicantData[applicant]?.['applicantProvideDetailsOfPreviousAddresses'] : '',
        changeUrl:
          Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW'] +
          `?applicantId=${sessionApplicantData[applicant]['id']}`,
      }
    );
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
      value: userCase['childrenSubjectOfProtectionPlan'],
      changeUrl: Urls['C100_MIAM_PREVIOUS_ATTENDANCE'],
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
  let subFields = userCase['c1A_concernAboutChild'] as any;
  subFields = subFields
    ?.filter(
      (element: any) =>
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
    }) as any;

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
  policeOrInvestigatorsOtherDetailsHTML += HTML.RULER;
  policeOrInvestigatorsOtherDetailsHTML += HTML.H4;
  policeOrInvestigatorsOtherDetailsHTML += keys['details'];
  policeOrInvestigatorsOtherDetailsHTML += HTML.H3_CLOSE;
  userCase.hasOwnProperty('c1A_policeOrInvestigatorOtherDetails')
    ? (policeOrInvestigatorsOtherDetailsHTML += userCase['c1A_policeOrInvestigatorOtherDetails'])
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
      .map(relatives => HTML.LIST_ITEM + relatives + HTML.LIST_ITEM_END)
      .toString()
      .split(',')
      .join('');
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
  ];
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
  let subFields = userCase?.['c1A_concernAboutApplicant'] as any;
  subFields = subFields
    ?.filter(
      (element: any) =>
        element !== C1AAbuseTypes.ABDUCTION &&
        element !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        element !== C1AAbuseTypes.SOMETHING_ELSE
    )
    ?.map(field => {
      return {
        key: keys['detailsOfChildConcern'].split('[***]').join(` ${keys[field]} `).split('[^^^]').join(''),
        valueHtml: SafetyConcernsHelper(
          userCase,
          keys,
          'c1A_concernAboutApplicant',
          field,
          C1ASafteyConcernsAbout.APPLICANT
        ),
        changeUrl: applyParms(Urls['C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE'], { abuseType: field }),
      };
    }) as any;

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
