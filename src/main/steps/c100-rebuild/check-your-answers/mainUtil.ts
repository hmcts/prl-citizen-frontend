import { CaseWithId } from '../../../app/case/case';
import { C1AAbuseTypes } from '../../../app/case/definition';
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
        key: keys['ordersAppliedFor'],
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
        key: keys['isDecisionTaken']?.split('**').join(`${Number(child) + 1}`),
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
  let htmlForAdditionalText = userCase['childrenKnownToSocialServices'] === 'Yes' ? Yes : No;
  htmlForAdditionalText += '<br/>';
  htmlForAdditionalText += userCase['childrenKnownToSocialServicesDetails'];

  const SummaryData = [
    {
      key: keys['childrenKnownToSocialServicesHint'],
      value: '',
      valueHtml: htmlForAdditionalText,
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
    {
      key: keys['childrenSubjectOfProtectionPlanLabel'],
      value: userCase['childrenSubjectOfProtectionPlan'],
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
      key: keys['caseDetails'],
      valueHtml: courtOrderDetails?.split(',').join(''),
      changeUrl: Urls['C100_OTHER_PROCEEDINGS_DETAILS'],
    },
    ...OPotherProceedingsSessionParserUtil(userCase, keys, Urls, 'op_courtProceedingsOrders'),
  ];
  return {
    title: sectionTitles['otherProceedings'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

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
      valueHtml: dataForConcerns?.toString().split(',').join(''),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT'],
    },
  ];
  return {
    title: sectionTitles['safetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

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
        key: keys['detailsOfChildConcern'].split('[***]').join(` ${keys[field]} `),
        valueHtml: SafetyConcernsHelper(userCase, keys, 'c1A_concernAboutChild', field),
        changeUrl: applyParms(Urls['C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE'], { abuseType: field }),
      };
    }) as any;

  const SummaryData = [
    {
      key: keys['childConcerns'],
      valueHtml: childSafetyConcerns?.toString().split(',').join(''),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD'],
    },
    ...subFields,
  ];
  return {
    title: sectionTitles['childSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const SafetyConcerns_yours = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['childrenInvolvedCourtCase'],
      value: userCase['op_childrenInvolvedCourtCase'],
      changeUrl: Urls['C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS'],
    },
  ];
  return {
    title: sectionTitles['yourSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const SafetyConcerns_others = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['childrenInvolvedCourtCase'],
      value: userCase['op_childrenInvolvedCourtCase'],
      changeUrl: Urls['C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS'],
    },
  ];
  return {
    title: sectionTitles['otherSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};
