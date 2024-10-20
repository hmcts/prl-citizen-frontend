import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { PartyType, Respondent, RootContext, SectionStatus, YesOrNo } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';
import { applyParms } from '../../../steps/common/url-parser';
import { hasContactPreference } from '../../common/contact-preference/util';
import {
  C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  CHOOSE_CONTACT_PREFERENCE,
  CONSENT_TO_APPLICATION,
  DETAILS_KNOWN,
  INTERNATIONAL_FACTORS_START,
  LEGAL_REPRESENTATION_START,
  MIAM_START,
  PROCEEDINGS_START,
  PageLink,
  REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  RESPONDENT_CHECK_ANSWERS,
  RESPOND_TO_AOH,
} from '../../urls';

import {
  getAllegationOfHarmStatus,
  getConfirmOrEditYourContactDetails,
  getConsentToApplicationStatus,
  getCurrentOrOtherProceedingsStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getLegalRepresentationStatus,
  getMiamStatus,
  getResponseToAllegationOfHarmStatus,
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
          href: LEGAL_REPRESENTATION_START,
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
            href: CONSENT_TO_APPLICATION + '/' + userCase.id,
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
            href: applyParms(DETAILS_KNOWN, { partyType: PartyType.RESPONDENT }) + '/' + userCase.id,
          },
          {
            id: 'contact-preference',
            text: taskListItems.contact_preference,
            status: !hasContactPreference(userCase, userIdamId) ? SectionStatus.TO_DO : SectionStatus.COMPLETED,
            href: applyParms(CHOOSE_CONTACT_PREFERENCE, { partyType: PartyType.RESPONDENT }),
          },
          {
            id: 'confirm-or-edit-your-contact-details',
            text: taskListItems.confirm_or_edit_your_contact_details,
            status: getConfirmOrEditYourContactDetails(userCase, userIdamId),
            href: RESPONDENT_CHECK_ANSWERS + '/' + userCase.id,
          },
          {
            id: 'support_you_need_during_your_case',
            text: taskListItems.support_you_need_during_your_case,
            status: SectionStatus.OPTIONAL,
            href: applyParms(REASONABLE_ADJUSTMENTS_ATTENDING_COURT, {
              root: PartyType.RESPONDENT,
            }),
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
            href: MIAM_START + '/' + userCase.id,
          },
          {
            id: 'current-or-previous-proceedings',
            text: taskListItems.current_or_previous_proceedings,
            status: getCurrentOrOtherProceedingsStatus(userCase),
            href: PROCEEDINGS_START + '/' + userCase.id,
          },
        ],
      },
      {
        title: sectionTitles.safetyConcerns,
        items: getSafetyConcernsTasks(userCase, userIdamId, taskListItems),
      },
      {
        title: sectionTitles.additionalInformation,
        items: [
          {
            id: 'international-factors',
            text: taskListItems.international_factors,
            status: getInternationalFactorsStatus(userCase, userIdamId),
            href: INTERNATIONAL_FACTORS_START + '/' + userCase.id,
          },
        ],
      },
    ];
  }

  return [];
};
const getSafetyConcernsTasks = (
  caseData: CaseWithId,
  userIdamId: UserDetails['id'],
  taskContents: Record<string, string>
): {
  id: string;
  text: string;
  status: SectionStatus;
  href: string;
}[] => {
  const tasks = [
    {
      id: 'allegations_of_harm_and_violence',
      text: taskContents.allegations_of_harm_and_violence,
      status: getAllegationOfHarmStatus(caseData),
      href: applyParms(C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, {
        root: RootContext.RESPONDENT,
      }) as PageLink,
    },
  ];

  if (_.get(caseData, 'c1ADocument.document_binary_url')) {
    tasks.push({
      id: 'respond_to_allegations_of_harm_and_violence',
      text: taskContents.respond_to_allegations_of_harm_and_violence,
      status: getResponseToAllegationOfHarmStatus(caseData, userIdamId),
      href: applyParms(RESPOND_TO_AOH, { partyType: PartyType.RESPONDENT }) as PageLink,
    });
  }

  return tasks;
};
