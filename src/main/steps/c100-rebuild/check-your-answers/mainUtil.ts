import { CaseWithId } from '../../../app/case/case';
import * as Urls from '../../urls';

import { CourtOrderParserHelper } from './helpers/courtOrderHelper';
import { MiamHelper } from './helpers/miamHelper';
import { SummaryList, SummaryListContent, SummaryListContentWithBoolean, getSectionSummaryList } from './lib/lib';

/* eslint-disable import/namespace */
export const TypeOfOrder = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const html = CourtOrderParserHelper(
    keys,
    userCase['courtOrder'],
    userCase['stopOtherPeopleDoingSomethingSubField'],
    userCase['resolveSpecificIssueSubField']
  );
  const SummaryData = [
    {
      key: keys['whatAreYouAsking'],
      value: '',
      valueHtml: html,
      changeUrl: Urls['C100_TYPE_ORDER_SELECT_COURT_ORDER'],
    },
    {
      key: keys['wantingCourtToDo'],
      value: userCase['shortStatement'],
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
  let html = "<dl class='govuk-summary-list'>  ";

  html += "<div class='govuk-summary-list__row' id='language_interpreter'> <dd class='govuk-summary-list__value'> ";
  html += userCase['hearingPart1'];
  html +=
    "</dd></div><div class='govuk-summary-list__row' id='' style='border-bottom:1px solid #fff'><dt class='govuk-summary-list__key'>";
  html += keys['detailOfWhyWithoutNotice'];
  html += "</dt></div><div class='govuk-summary-list__row'><dd class='govuk-summary-list__value'>";
  html += userCase['reasonsForApplicationWithoutNotice'];

  html += "<div class='govuk-summary-list__row' id='language_interpreter'> <dd class='govuk-summary-list__value'> ";
  html +=
    "</dd></div><div class='govuk-summary-list__row' id='' style='border-bottom:1px solid #fff'><dt class='govuk-summary-list__key'>";
  html +=
    keys['areAskingwithoutNoticeHearing'] +
    '<br> <p class="no-bold">' +
    userCase['doYouNeedAWithoutNoticeHearing'] +
    '</p><br>' +
    keys['doYouNeedAWithoutNoticeHearingDetails'] +
    '<br> <p class="no-bold">';
  html += userCase['doYouNeedAWithoutNoticeHearingDetails'] + '</p><br><br>';
  html += '</dt></div>';
  html +=
    "<div class='govuk-summary-list__row' id='' style='border-bottom:1px solid #fff'><dt class='govuk-summary-list__key'>";
  html +=
    keys['areAskingDuetoNoTimeGrant'] +
    '<br><p class="no-bold">' +
    userCase['doYouRequireAHearingWithReducedNotice'] +
    '</p><br>' +
    keys['areAskingDuetoNoTimeGrantDetails'] +
    '<br><p class="no-bold">';
  html += userCase['doYouRequireAHearingWithReducedNoticeDetails'] + '</p>';
  html += '</div> </dl> ';

  const SummaryData = [
    //qualifyForUrgentHearing
    {
      key: keys['qualifyForUrgentHearing'],
      value: userCase['hearingPart1'],
      changeUrl: Urls['C100_HEARING_WITHOUT_NOTICE_PART1'],
    },
    {
      key: keys['askingNoHearing'],
      value: userCase['hearingPart1'],
      valueHtml: html,
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
  const sessionChildData = userCase['childernDetails'];

  const newChildDataStorage: { key: string; keyHtml?: string; value: string; changeUrl: string }[] = [];

  for (const child in sessionChildData) {
    const firstname = sessionChildData[child]['firstname'],
      lastname = sessionChildData[child]['lastname'],
      id = sessionChildData[child]['id'],
      personalDetails = sessionChildData[child]['personalDetails'],
      childMatter = sessionChildData[child]['childMatter'];

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
        value: personalDetails?.['DateoBirth'],
        changeUrl: Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'] + '?childId=' + id,
      },
      {
        key: keys['gender'],
        value: personalDetails?.['Sex'],
        changeUrl: Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'] + '?childId=' + id,
      },
      {
        key: keys['ordersAppliedFor'],
        value: '',
        changeUrl: Urls['C100_CHILDERN_DETAILS_CHILD_MATTERS'] + '?childId=' + id,
      },
      {
        key: keys['isDecisionTaken'],
        value: childMatter['isDecisionTaken'],
        changeUrl: Urls['C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY'] + '?childId=' + id,
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
  let childLiveOutSideUK = userCase['internationalStart'] === 'Yes' ? Yes : No;
  if (userCase['internationalStart'] === 'Yes') {
    childLiveOutSideUK += '<br><br>';
    childLiveOutSideUK += userCase['provideDetailsStart'];
  }

  let htmlbasedOutSideEnglandOrWales = userCase['internationalParents'] === 'Yes' ? Yes : No;
  if (userCase['internationalParents'] === 'Yes') {
    htmlbasedOutSideEnglandOrWales += '<br><br>';
    htmlbasedOutSideEnglandOrWales += userCase['provideDetailsParents'];
  }

  let htmlanotherPersonSameOrder = userCase['internationalJurisdiction'] === 'Yes' ? Yes : No;
  if (userCase['internationalJurisdiction'] === 'Yes') {
    htmlanotherPersonSameOrder += '<br><br>';
    htmlanotherPersonSameOrder += userCase['provideDetailsJurisdiction'];
  }

  let htmlotherCountryRequestInfo = userCase['internationalRequest'] === 'Yes' ? Yes : No;
  if (userCase['internationalRequest'] === 'Yes') {
    htmlotherCountryRequestInfo += '<br><br>';
    htmlotherCountryRequestInfo += userCase['provideDetailsRequest'];
  }

  const SummaryData = [
    {
      key: keys['liveOutSideUk'],
      value: '',
      valueHtml: childLiveOutSideUK,
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
    },
    {
      key: keys['basedOutSideEnglandOrWales'],
      value: '',
      valueHtml: htmlbasedOutSideEnglandOrWales,
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
    },
    {
      key: keys['anotherPersonSameOrder'],
      value: '',
      valueHtml: htmlanotherPersonSameOrder,
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
    },
    {
      key: keys['otherCountryRequestInfo'],
      value: '',
      valueHtml: htmlotherCountryRequestInfo,
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
    },
  ];

  /** Removes entry in @summarydata if user is not a named user */

  return {
    title: sectionTitles['InternationalElement'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};
