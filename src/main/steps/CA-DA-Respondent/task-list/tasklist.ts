/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import { getKeepYourDetailsPrivateStatus, getSupportYourNeedsDetails } from './utils';

export const generateCADARespondentTaskList = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.aboutYou,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.RESPONDENT_DETAILS_KNOWN,
        },
        {
          id: 'support-you-need-during-your-case',
          text: taskListItems.support_you_need_during_your_case,
          status: getSupportYourNeedsDetails(userCase),
          href: URL.LANGUAGE_REQUIREMENTS,
        },
      ],
    },
  ];
};
