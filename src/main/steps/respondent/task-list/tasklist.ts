import {
    getKeepYourDetailsPrivateStatus, 
    getMiamStatus,
    getInternationalFactorsStatus
  } from './utils';
import * as URL from '../../urls';

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase) => [
    {
      title: sectionTitles.respondentYourDetails,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.DETAILS_KNOWN,
        },
      ],
    },
    {
      title: sectionTitles.applicationDetails,
      items: [
        {
          id: 'medation-miam',
          text: taskListItems.mediation_miam,
          status: getMiamStatus(userCase),
          href: URL.MIAM_START,
        },
      ],
    },
    {
      title: sectionTitles.respondentAdditionalInformation,
      items: [
        {
          id: 'international-factors',
          text: taskListItems.international_factors,
          status: getInternationalFactorsStatus(userCase),
          href: URL.INTERNATIONAL_FACTORS_START,
        },
      ],
    }
  ];