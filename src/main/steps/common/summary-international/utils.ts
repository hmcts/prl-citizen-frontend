/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { CaseDate, CaseWithId } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { isDateInputInvalid } from '../../../app/form/validation';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { APPLICANT_TASK_LIST_URL, C100_RETRIVE_CASE, RESPONDENT_TASK_LIST_URL } from '../../urls';
import { getSectionSummaryList } from '../summary/utils';
import { applyParms } from '../url-parser';

/* eslint-disable import/namespace */
export const summaryListIntElement = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  urls: any,
  sectionTitle?: string,
  fieldTypes?: any,
  language?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const url = urls[key];
    const row = {
      key: keyLabel,
      value: fieldTypes[key] === 'Date' ? getFormattedDate(userCase[key], language) : notDate(key, userCase),
      changeUrl: url,
    };
    if (key !== 'citizenUserSafeToCall') {
      summaryData.push(row);
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
    const caseUrl = findUrl(userCase, isRespondent, state, id);
    const row = {
      key: name,
      value: state,
      changeUrl: id,
      caseLink: caseUrl,
    };

    summaryData.push(row);
  }

  return {
    title: sectionTitle || '',
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
    console.log(contact_private_list[key]);
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
function findUrl(
  userCase: Partial<CaseWithId>,
  isRespondent: boolean | undefined,
  state: string | undefined,
  id: string
) {
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
    if (!isRespondent) {
      caseUrl = APPLICANT_TASK_LIST_URL + '/' + id;
    } else {
      caseUrl = RESPONDENT_TASK_LIST_URL + '/' + id;
    }
  }
  return caseUrl;
}

function notDate(key: string, userCase: Partial<CaseWithId>) {
  return key === 'startAlternative' && userCase[key] !== 'undefined'
    ? userCase[key] + getSelectedPrivateDetails(userCase)
    : userCase[key];
}
