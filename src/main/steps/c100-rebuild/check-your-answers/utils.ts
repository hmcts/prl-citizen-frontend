import { CaseWithId } from '../../../app/case/case';
import { PageContent } from '../../../app/controller/GetController';
import * as Urls from '../../../steps/urls';

interface GovUkNunjucksSummary {
  key: {
    text?: string;
    html?: string;
    classes?: string;
  };
  value: {
    text?: string;
    html?: string;
  };
  actions?: {
    items?: [
      {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }
    ];
  };
  classes?: string;
}

interface SummaryListRow {
  key?: string;
  keyHtml?: string;
  value?: string;
  valueHtml?: string;
  changeUrl?: string;
  classes?: string;
}

interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
};

type SummaryListContentWithBoolean = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
  Yes: string;
  No: string;
};

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}), ...(item.keyHtml ? { html: item.keyHtml } : {}) },
      value: { ...(item.value ? { text: item.value } : {}), ...(item.valueHtml ? { html: item.valueHtml } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl, //
                  text: content.change as string,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

/* eslint-disable import/namespace */
export const TypeOfOrder = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whatAreYouAsking'],
      value: userCase['namedApplicant'],
      changeUrl: Urls['C100_TYPE_ORDER_CAORDER'],
    },
    {
      key: keys['wantingCourtToDo'],
      value: userCase['namedApplicant'],
      changeUrl: Urls['C100_TYPE_ORDER_CAORDER'],
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
      value: userCase['xyz'],
      changeUrl: Urls['zy'],
    },
    {
      key: keys['askingNoHearing'],
      value: userCase['hearingPart1'],
      changeUrl: Urls['C100_HEARING_WITHOUT_NOTICE_PART1'],
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
