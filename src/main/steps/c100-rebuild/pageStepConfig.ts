export interface Page {
  id: string
  url: string;
}
export interface PageSteps extends Page {
  id: string;
  url: string;
  steps?: Page[];
}

import {
  C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
  C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
  C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
  C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
  C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
} from '../../../main/steps/urls';

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
];
