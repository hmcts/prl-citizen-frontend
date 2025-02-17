import { PageContent } from '../../../../app/controller/GetController';

export interface GovUkNunjucksSummary {
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
        attributes?: {
          id?: string;
        };
      }
    ];
  };
  classes?: string;
}

export interface SummaryListRow {
  key?: string;
  anchorReference?: string;
  keyHtml?: string;
  visuallyHiddenText?: string;
  value?: string;
  valueHtml?: string;
  changeUrl?: string;
  classes?: string;
  caseLink?: string;
}

export interface SummaryList {
  title: string;
  subTitle?: string;
  rows: GovUkNunjucksSummary[];
}

export type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
};

export type SummaryListContentWithBoolean = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
  Yes: string;
  No: string;
};

export const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    const visuallyHiddenText = item.visuallyHiddenText;
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
                  visuallyHiddenText: visuallyHiddenText ?? `${item.key}`,
                  attributes: item.anchorReference
                    ? {
                        id: item.anchorReference,
                      }
                    : {},
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};
