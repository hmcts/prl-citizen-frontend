/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../app/case/case';
import { SupportYouNeedAllEnum } from '../../../../app/case/definition';
import { PageContent } from '../../../../app/controller/GetController';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
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
  sectionTitle?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const url = urls[key];
    const row = {
      key: keyLabel,
      value: getValue(key, userCase),
      changeUrl: url,
    };

    summaryData.push(row);
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content),
  };
};

const getValue = (key: string, userCase: Partial<CaseWithId>) => {
  const value = userCase[key];
  if (typeof value === 'string') {
    return SupportYouNeedAllEnum[value] as string;
  }
  let temp = '';
  for (const k of value) {
    const keyLabel = k as string;
    temp += SupportYouNeedAllEnum[keyLabel];
    if (value.indexOf(k) !== value.length - 1) {
      temp += ', ';
    }
  }
  return temp as string;
};
