/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { CaseDate, CaseWithId } from '../../../app/case/case';
import { State, YesOrNo } from '../../../app/case/definition';
import { PageContent } from '../../../app/controller/GetController';
import { isDateInputInvalid } from '../../../app/form/validation';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { APPLICANT_TASK_LIST_URL, C100_RETRIVE_CASE, RESPONDENT_TASK_LIST_URL } from '../../../steps/urls';
import { cy, en } from '../common.content';
import { applyParms } from '../url-parser';

export const getSectionSummaryList = (
  rows: SummaryListRow[],
  content: PageContent,
  language?: string
): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}) },
      value: { ...(item.value ? { html: item.value } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl,
                  text: language === 'en' ? en.edit : cy.edit,
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

const setkey = (userCase: Partial<CaseWithId>, key: string) => {
  const userkey = userCase[key];

  if (key === 'startAlternative' && !userCase[key]) {
    return userCase[key] + getSelectedPrivateDetails(userCase);
  }
  if (key === 'courtProceedingsOrders' && !userCase[key]) {
    return getOrdersDetail(userCase);
  }
  if (key === 'citizenUserAddressHistory' && userCase['isAtAddressLessThan5Years'] === YesOrNo.YES) {
    return userCase['citizenUserAddressText'];
  }

  return userkey;
};

/* eslint-disable import/namespace */
export const summaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  urls: any,
  sectionTitle?: string,
  language?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const row = {
      key: keyLabel,
      value:
        userCase[key]?.hasOwnProperty('day') &&
        userCase[key].hasOwnProperty('month') &&
        userCase[key]?.hasOwnProperty('year')
          ? getFormattedDate(userCase[key], language)
          : setkey(userCase, key)!,
      changeUrl: urls[key],
    };
    if (row.value || key === 'citizenUserAddressHistory') {
      if (key !== 'citizenUserSafeToCall') {
        summaryData.push(row);
      }
    }
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content, language),
  };
};

export const summaryCaseList = (
  userCaseList: Partial<CaseWithId>[],
  sectionTitle?: string,
  isRespondent?: boolean
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  summaryData.push({ key: 'Case Name', value: '<h4>Case Status</h4>' });
  for (const userCase of userCaseList) {
    const id = userCase.id as string;
    const name = userCase.applicantCaseName;
    const state = userCase.caseStatus?.state;
    let caseUrl = '#';
    if (userCase.caseTypeOfApplication === 'C100') {
      if (!isRespondent) {
        if (state === State.Draft) {
          caseUrl = applyParms(`${C100_RETRIVE_CASE}`, { caseId: id });
        }
      } else {
        caseUrl = RESPONDENT_TASK_LIST_URL + '/' + id;
      }
    } else if (userCase.caseTypeOfApplication === 'FL401') {
      const App_ID = APPLICANT_TASK_LIST_URL + '/' + id;
      const Res_ID = RESPONDENT_TASK_LIST_URL + '/' + id;
      caseUrl = !isRespondent ? App_ID : Res_ID;
    }
    const row = {
      key: name,
      value: state,
      changeUrl: id,
      caseLink: caseUrl,
    };

    summaryData.push(row);
  }

  return {
    title: sectionTitle!,
    rows: getSectionCaseList(summaryData),
  };
};

const getSectionCaseList = (rows: SummaryListRow[]): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}) },
      value: { ...(item.value ? { html: item.value } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: `${item.caseLink}`,
                  text: `${item.changeUrl}`,
                  visuallyHiddenText: `${item.changeUrl}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

export const getFormattedDate = (date: CaseDate | undefined, locale = 'en'): string =>
  date && !isDateInputInvalid(date)
    ? dayjs(`${date.day}-${date.month}-${date.year}`, 'D-M-YYYY').locale(locale).format('D MMMM YYYY')
    : '';

export const getSelectedPrivateDetails = (userCase: Partial<CaseWithId>): string => {
  let tempDetails = '<br/><br/><ul class="govuk-list govuk-list--bullet">';
  const contact_private_list = userCase['contactDetailsPrivate'];
  for (const key in contact_private_list) {
    tempDetails =
      tempDetails +
      '<li>' +
      contact_private_list[key].charAt(0).toUpperCase() +
      contact_private_list[key].slice(1) +
      '</li>';
  }
  tempDetails = tempDetails + '</ul>';
  return tempDetails;
};

export const getOrdersDetail = (userCase: Partial<CaseWithId>): string => {
  let temp = '';
  const value = userCase['courtProceedingsOrders'];
  if (value) {
    for (const k of value) {
      const keyLabel = k as string;
      temp += keyLabel;
      if (value.indexOf(k) !== value.length - 1) {
        temp += ', ';
      }
    }
  }
  return temp;
};
