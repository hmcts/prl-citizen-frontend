/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import { getConfirmOrEditYourContactDetails,
 getKeepYourDetailsPrivateStatus,
 getMiamStatus,
 getCurrentOrOtherProceedingsStatus} from './utils';

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
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.CHECK_ANSWERS,
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
        {
          id: 'current-or-previous-proceedings',
          text: taskListItems.current_or_previous_proceedings,
          status: getCurrentOrOtherProceedingsStatus(userCase),
          href: URL.PROCEEDINGS_START
        }
      ],
    },
  ];
};
