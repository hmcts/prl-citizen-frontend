/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../app/case/case';
import { PageContent } from '../../../../app/controller/GetController';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';
import {
  SupportYouNeedAllEnum,
  cyContent,
  enContent,
} from '../../../../steps/respondent/support-you-need-during-case/summary/content';

console.info('** FOR SONAR **');

const getSectionSummaryList = (
  rows: SummaryListRow[],
  content: PageContent,
  language: string
): GovUkNunjucksSummary[] => {
  console.log(content);
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}) },
      value: { ...(item.value ? { text: item.value } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl,
                  text: language === 'en' ? enContent.edit : cyContent.edit,
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
  language: string,
  sectionTitle?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const url = urls[key];
    const row = {
      key: keyLabel,
      value: getValue(key, userCase, language),
      changeUrl: url,
    };

    if (row.value) {
      summaryData.push(row);
    }
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content, language),
  };
};

const getValue = (key: string, userCase: Partial<CaseWithId>, language = 'en') => {
  let output;
  const value = userCase[key];
  if (typeof value === 'string') {
    output = SupportYouNeedAllEnum[language][value] as string;
    if (!output) {
      output = value;
    }
    return output;
  }
  let temp = '';

  if (value) {
    for (const k of value) {
      const keyLabel = k as string;
      temp += SupportYouNeedAllEnum[language][keyLabel];
      if (value.indexOf(k) !== value.length - 1) {
        temp += ', ';
      }
    }
  }
  return temp;
};
