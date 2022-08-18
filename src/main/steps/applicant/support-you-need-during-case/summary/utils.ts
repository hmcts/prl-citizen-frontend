/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../app/case/case';
import { PageContent } from '../../../../app/controller/GetController';
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

export interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
};

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
      value: userCase[key],
      changeUrl: url,
    };

    summaryData.push(row);
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content),
  };
};
