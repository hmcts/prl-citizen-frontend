import { OtherName } from '../../../app/case/definition';
import { SummaryListContent } from '../models/summaryListContent';

export const mapSummaryListContent = (
  values: (string | OtherName)[],
  actionItems: string[],
  path: string
): SummaryListContent => ({
  rows: values.map(v => {
    const text = typeof v === 'string' ? v : `${v.firstNames} ${v.lastNames}`;
    const id = typeof v === 'string' ? v : `${v.id}`;
    return {
      key: {
        text,
      },
      actions: {
        items: actionItems.map(actionItem => ({
          href: `${path}?remove=${id}`,
          text: actionItem,
          visuallyHiddenText: text,
        })),
      },
    };
  }),
});
