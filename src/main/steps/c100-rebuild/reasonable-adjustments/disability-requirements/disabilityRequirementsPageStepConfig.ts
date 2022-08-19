import {
  C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
  C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
  C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
  C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
  C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
} from '../../../urls';

export default {
  disabilityRequirement: {
    pageUrl: C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
    pages: [
      {
        documentsHelp: {
          pageUrl: C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
        },
        communicationHelp: {
          pageUrl: C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
        },
        extraSupport: {
          pageUrl: C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
        },
        feelComfortableSupport: {
          pageUrl: C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
        },
        helpTravellingMovingBuildingSupport: {
          pageUrl: C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
        },
      },
    ],
  },
};
