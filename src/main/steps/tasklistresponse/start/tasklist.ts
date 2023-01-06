import { Respondent, SectionStatus, YesOrNo } from '../../../app/case/definition';
import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getConsentToApplicationStatus,
  getCurrentOrOtherProceedingsStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getLegalRepresentationStatus,
  getMiamStatus,
} from './utils';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase, userIdamId) => {
  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (respondent?.value?.user?.idamId === userIdamId) {
      if (respondent.value.response.legalRepresentation || userCase.legalRepresentation) {
        if (!userCase.legalRepresentation) {
          userCase.legalRepresentation = respondent.value.response.legalRepresentation;
        }
      }
    }
  });
  return [
    {
      title: sectionTitles.legalrepresentation,
      items: [
        {
          id: 'do_you_have_legal_representation',
          text: taskListItems.do_you_have_legal_representation,
          status: getLegalRepresentationStatus(userCase),
          href: URL.LEGAL_REPRESENTATION_START,
        },
      ],
    },
    ...getRemainingTaskList(sectionTitles, taskListItems, userCase, userIdamId),
  ];
};

export const getRemainingTaskList = (sectionTitles, taskListItems, userCase, userIdamId) => {
  if (userCase?.legalRepresentation === YesOrNo.NO) {
    return [
      {
        title: sectionTitles.consentToTheApplication,
        items: [
          {
            id: 'consent-to-the-application',
            text: taskListItems.do_you_consent_to_the_application,
            status: getConsentToApplicationStatus(userCase, userIdamId),
            href: URL.CONSENT_TO_APPLICATION + '/' + userCase.id,
          },
        ],
      },
      {
        title: sectionTitles.yourDetails,
        items: [
          {
            id: 'keep-your-details-private',
            text: taskListItems.keep_your_details_private,
            status: getKeepYourDetailsPrivateStatus(userCase, userIdamId),
            href: URL.RESPONDENT_DETAILS_KNOWN + '/' + userCase.id,
          },
          {
            id: 'confirm-or-edit-your-contact-details',
            text: taskListItems.confirm_or_edit_your_contact_details,
            status: getConfirmOrEditYourContactDetails(userCase, userIdamId),
            href: URL.RESPONDENT_CHECK_ANSWERS + '/' + userCase.id,
          },
          {
            id: 'support_you_need_during_your_case',
            text: taskListItems.support_you_need_during_your_case,
            status: SectionStatus.NOT_AVAILABLE_YET,
            href: '#',
          },
        ],
      },
      {
        title: sectionTitles.applicationDetails,
        items: [
          {
            id: 'medation-miam',
            text: taskListItems.mediation_miam,
            status: getMiamStatus(userCase, userIdamId),
            href: URL.MIAM_START + '/' + userCase.id,
          },
          {
            id: 'current-or-previous-proceedings',
            text: taskListItems.current_or_previous_proceedings,
            status: getCurrentOrOtherProceedingsStatus(userCase),
            href: URL.PROCEEDINGS_START + '/' + userCase.id,
          },
        ],
      },
      {
        title: sectionTitles.safetyConcerns,
        items: [
          {
            id: 'your-safety',
            text: taskListItems.your_safety,
            status: SectionStatus.NOT_AVAILABLE_YET,
            href: '#',
          },
        ],
      },
      {
        title: sectionTitles.additionalInformation,
        items: [
          {
            id: 'international-factors',
            text: taskListItems.international_factors,
            status: getInternationalFactorsStatus(userCase, userIdamId),
            href: URL.INTERNATIONAL_FACTORS_START + '/' + userCase.id,
          },
        ],
      },
    ];
  }
  return [];
};
