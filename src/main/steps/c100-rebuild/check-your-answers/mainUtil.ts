import { CaseWithId } from '../../../app/case/case';
import { applyParms } from '../../common/url-parser';
import * as Urls from '../../urls';

import { DATE_FORMATTOR } from './common/dateformatter';
import { InternationElementHelper } from './helpers/InternationElementsHelper';
import { CourtOrderParserHelper } from './helpers/courtOrderHelper';
import { hearingDetailsHelper } from './helpers/hearingdetailHelper';
import { MiamHelper } from './helpers/miamHelper';
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

  /** Removes entry in @summarydata if user is not a named user */

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
    //qualifyForUrgentHearing
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

  /** Removes entry in @summarydata if user is not a named user */

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
  const newChildDataStorage: { key: string; keyHtml?: string; value: string; changeUrl: string }[] = [];
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
        key: keys['dateOfBirth'],
        value: DATE_FORMATTOR(personalDetails['dateOfBirth']),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['gender'],
        value: personalDetails?.['gender'],
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['ordersAppliedFor'],
        value: childMatters['needsResolution'],
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_CHILD_MATTERS'], { childId: id }),
      },
      {
        key: keys['isDecisionTaken'],
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
      key: keys['socialServiceLink'],
      value: '',
      valueHtml: htmlForAdditionalText,
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
    {
      key: keys['subjectToChildProtection'],
      value: userCase['childrenSubjectOfProtectionPlan'],
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
    {
      key: keys['haveOtherChildern'],
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
      value: userCase['miam_attendance'],
      changeUrl: Urls['C100_MIAM_ATTENDANCE'],
    },
    {
      key: keys['attendedMiamMidiation'],
      value: userCase['childrenSubjectOfProtectionPlan'],
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
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
