import { CaseWithId, FieldPrefix } from '../../../../app/case/case';
import { PageContent } from '../../../../app/controller/GetController';
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
  applyingWith: Record<string, string>;
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
export const applicantSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  prefix: FieldPrefix
): SummaryList | undefined => {

  let sectionTitle = sectionTitles.applicantDetails;
  return {
    title: sectionTitle,
    rows: getSectionSummaryList(
      [
        {
          key: 'Name',
          value: 'testValueName',
          changeUrl: 'editNameURL',
        },
        {
          key: 'Date of birth',
          value: 'testValueDOB',
          changeUrl: 'editDOBURL',
        },
      ],
      content
    ),
  };
};
