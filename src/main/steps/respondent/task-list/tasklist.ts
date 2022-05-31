/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import { getKeepYourDetailsPrivateStatus, getMiamStatus, getYourSafetyStatus } from './utils';

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase) => {
  return [
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
      title: sectionTitles.respondentSafetyConcerns,
      items: [
        {
          id: 'your-safety',
          text: taskListItems.your_safety,
          status: getYourSafetyStatus(userCase),
          href: URL.SAFETY_MAIN_PAGE,
        },
      ]
    }
  ]
};
