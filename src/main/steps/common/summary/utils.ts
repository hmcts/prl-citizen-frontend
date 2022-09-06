/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { CaseDate, CaseWithId } from '../../../app/case/case';
import { PageContent } from '../../../app/controller/GetController';
import { isDateInputInvalid } from '../../../app/form/validation';
import { APPLICANT_TASK_LIST_URL, CA_DA_RESPONDENT_TASK_LIST_URL } from '../../../steps/urls';
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
  caseLink?: string;
}

export interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
};

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  console.log(content.title);
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
                  text: 'Edit',
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
export const summaryList = (
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
      value: fieldTypes[key] === 'Date' ? getFormattedDate(userCase[key], language) : userCase[key],
      changeUrl: url,
    };

    summaryData.push(row);
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content),
  };
};

export const summaryCaseList = (
  userCaseList: Partial<CaseWithId>[],
  sectionTitle?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  summaryData.push({ key: 'Case Name', value: '<h4>Case Status</h4>' });
  for (const userCase of userCaseList) {
    const id = userCase.id;
    const name = userCase.applicantCaseName;
    const state = userCase.state;
    let caseUrl = '#';
    if (userCase.caseTypeOfApplication === 'C100') {
      caseUrl = APPLICANT_TASK_LIST_URL + '/' + id;
    } else if (userCase.caseTypeOfApplication === 'FL401') {
      caseUrl = CA_DA_RESPONDENT_TASK_LIST_URL;
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
