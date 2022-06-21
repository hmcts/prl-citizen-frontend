import { CaseWithId } from '../../../app/case/case';
import { SectionStatus } from '../../../app/case/definition';
import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
} from './utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateRespondentTaskList = (
  sectionTitles: Record<string, string>,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  taskListItems: Record<string, string>,
  userCase: Partial<CaseWithId> | undefined
): { title: any; items: { id: string; text: any; status: SectionStatus; href: `/${string}` }[] }[] => {
  return [
    {
      title: sectionTitles.respondentYourDetails,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.RESPONDENT_DETAILS_KNOWN,
        },
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.RESPONDENT_CHECK_ANSWERS,
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
    },
  ];
};
