export interface Page {
  id: string;
  url: string;
}
export interface PageSteps extends Page {
  id: string;
  url: string;
  steps?: Page[];
}

import {
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_GENERAL_REASONS,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_NO_NEED_WITH_REASONS,
  C100_MIAM_OTHER,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_URGENCY,
} from '../../../main/steps/urls';
import { MiamNonAttendReason } from '../../app/case/definition';

export const PageStepsConfig: PageSteps[] = [
  {
    id: C100_MIAM_GENERAL_REASONS,
    url: C100_MIAM_GENERAL_REASONS,
    steps: [
      {
        id: MiamNonAttendReason.DOMESTIC,
        url: C100_MIAM_MIAM_DOMESTIC_ABUSE,
      },
      {
        id: MiamNonAttendReason.CHILD_PROTECTION,
        url: C100_MIAM_CHILD_PROTECTION,
      },
      {
        id: MiamNonAttendReason.URGENT,
        url: C100_MIAM_URGENCY,
      },
      {
        id: MiamNonAttendReason.PREV_MIAM,
        url: C100_MIAM_PREVIOUS_ATTENDANCE,
      },
      {
        id: MiamNonAttendReason.EXEMPT,
        url: C100_MIAM_OTHER,
      },
      {
        id: MiamNonAttendReason.NONE,
        url: C100_MIAM_NO_NEED_WITH_REASONS,
      },
    ],
  },
];
