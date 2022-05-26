import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { PageContent } from '../../../app/controller/GetController';
//import * as Urls from '../../../../steps/urls';

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
};

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    let changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {})},
      value: { ...(item.value ? { text: item.value } : {})},
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl,
                  text: 'edit',
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
  prefix: FieldPrefix,
  urls: any
): SummaryList | undefined => {

  let sectionTitle = sectionTitles.applicantDetails;
  
  let summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const url = urls[key]
    const row = {
      key: keyLabel,
      value: 'testValueName',
      changeUrl: url,
    };

    summaryData.push(row);
}

  return {
    title: sectionTitle,
    rows: getSectionSummaryList(
      summaryData,
      content
    ),
  };
};
