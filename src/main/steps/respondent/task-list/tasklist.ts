import {
    getKeepYourDetailsPrivateStatus,
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
      title: sectionTitles.respondentSafetyConcerns,
      items: [
        {
          id: 'your-safety',
          text: taskListItems.your_safety,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.SAFETY_MAIN_PAGE,
        },
      ],
    }
  ];