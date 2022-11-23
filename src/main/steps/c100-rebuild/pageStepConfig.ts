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
  C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
  C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
  C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
  C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
  C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
} from '../../../main/steps/urls';
import { MiamNonAttendReason } from '../../app/case/definition';

export const PageStepsConfig: PageSteps[] = [
  {
    id: C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
    url: C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
    steps: [
      {
        id: 'documentsHelp',
        url: C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
      },
      {
        id: 'communicationHelp',
        url: C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
      },
      {
        id: 'extraSupport',
        url: C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
      },
      {
        id: 'feelComfortableSupport',
        url: C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
      },
      {
        id: 'helpTravellingMovingBuildingSupport',
        url: C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
      },
    ],
  },
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
