import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../app/case/definition';
import * as URL from '../../urls';

import { respondent_en as sectionTitles } from './section-titles';
import { generateRespondentTaskList, getRemainingTaskList } from './tasklist';
import { respondent_tasklist_items_en as taskListItems } from './tasklist-items';
import { getLegalRepresentationStatus } from './utils';

describe('generateRespondentTaskList', () => {
  test.each([
    {
      data: {
        userCase: { ...mockUserCase },
        userIdamId: undefined,
      },
      expected: [
        {
          title: sectionTitles.legalrepresentation,
          items: [
            {
              id: 'do_you_have_legal_representation',
              text: taskListItems.do_you_have_legal_representation,
              status: getLegalRepresentationStatus(mockUserCase),
              href: URL.LEGAL_REPRESENTATION_START,
            },
          ],
        },
      ],
    },
    {
      data: {
        userCase: { ...mockUserCase },
        userIdamId: undefined,
      },
      expected: [
        {
          title: sectionTitles.legalrepresentation,
          items: [
            {
              id: 'do_you_have_legal_representation',
              text: taskListItems.do_you_have_legal_representation,
              status: getLegalRepresentationStatus(mockUserCase),
              href: URL.LEGAL_REPRESENTATION_START,
            },
          ],
        },
      ],
    },
  ])('should return correct status %#', async ({ data, expected }) => {
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });
  test('should complete legal representation', () => {
    const data = {
      userCase: { ...mockUserCase, legalRepresentation: YesOrNo.NO },
      userIdamId: undefined,
    };
    const expected = [
      {
        title: sectionTitles.legalrepresentation,
        items: [
          {
            id: 'do_you_have_legal_representation',
            text: taskListItems.do_you_have_legal_representation,
            status: 'COMPLETED',
            href: URL.LEGAL_REPRESENTATION_START,
          },
        ],
      },
      ...getRemainingTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId),
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });
});

describe('getRemainingTaskList', () => {
  test('Consent to application', () => {
    const consent = {
      consentToTheApplication: YesOrNo.YES,
      applicationReceivedDate: '01-01-2022',
      permissionFromCourt: 'string',
    };

    const data = {
      userCase: {
        ...mockUserCase,
        legalRepresentation: YesOrNo.NO,
        respondents: [
          {
            id: '',
            value: {
              response: { consent },
            },
          },
        ],
      },
      userIdamId: '12345',
    };
    const expected = [
      {
        items: [
          {
            href: '/tasklistresponse/legalrepresentation/start',
            id: 'do_you_have_legal_representation',
            status: 'COMPLETED',
            text: 'Do you have a legal representative?',
          },
        ],
        title: 'Legal representation',
      },
      {
        items: [
          {
            href: '/tasklistresponse/consent-to-application/consent/1234',
            id: 'consent-to-the-application',
            status: 'TO_DO',
            text: 'Do you consent to the application?',
          },
        ],
        title: 'Consent to the application',
      },
      {
        items: [
          {
            href: '/respondent/keep-details-private/details_known/1234',
            id: 'keep-your-details-private',
            status: 'TO_DO',
            text: 'Keep your details private',
          },
          {
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            id: 'confirm-or-edit-your-contact-details',
            status: 'IN_PROGRESS',
            text: 'Confirm or edit your contact details',
          },
          {
            href: '/respondent/support-you-need-during-case/attending-the-court',
            id: 'support_you_need_during_your_case',
            status: 'TO_DO',
            text: 'Support you need during your case',
          },
        ],
        title: 'Your details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/miam/miam-start/1234',
            id: 'medation-miam',
            status: 'TO_DO',
            text: 'Mediation(MIAM)',
          },
          {
            href: '/tasklistresponse/proceedings/start',
            id: 'current-or-previous-proceedings',
            status: 'TO_DO',
            text: 'Current or previous proceedings',
          },
        ],
        title: 'Application details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page',
            id: 'allegations_of_harm_and_violence',
            status: 'NOT_AVAILABLE_YET',
            text: 'Allegations of harm and violence',
          },
        ],
        title: 'Safety concerns',
      },
      {
        items: [
          {
            href: '/tasklistresponse/safety_concerns/main_page',
            id: 'your-safety',
            status: 'TO_DO',
            text: 'Your safety',
          },
        ],
        title: 'Safety concerns',
      },
      {
        items: [
          {
            href: '/tasklistresponse/international-factors/start/1234',
            id: 'international-factors',
            status: 'TO_DO',
            text: 'International element',
          },
        ],
        title: 'Additional information',
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });

  test('Keep details private', () => {
    const keepDetailsPrivate = {
      otherPeopleKnowYourContactDetails: 'string',
      confidentiality: 'string',
    };

    const data = {
      userCase: {
        ...mockUserCase,
        legalRepresentation: YesOrNo.NO,
        respondents: [
          {
            id: '',
            value: {
              response: { keepDetailsPrivate },
            },
          },
        ],
      },
      userIdamId: '12345',
    };
    const expected = [
      {
        items: [
          {
            href: '/tasklistresponse/legalrepresentation/start',
            id: 'do_you_have_legal_representation',
            status: 'COMPLETED',
            text: 'Do you have a legal representative?',
          },
        ],
        title: 'Legal representation',
      },
      {
        items: [
          {
            href: '/tasklistresponse/consent-to-application/consent/1234',
            id: 'consent-to-the-application',
            status: 'TO_DO',
            text: 'Do you consent to the application?',
          },
        ],
        title: 'Consent to the application',
      },
      {
        items: [
          {
            href: '/respondent/keep-details-private/details_known/1234',
            id: 'keep-your-details-private',
            status: 'TO_DO',
            text: 'Keep your details private',
          },
          {
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            id: 'confirm-or-edit-your-contact-details',
            status: 'IN_PROGRESS',
            text: 'Confirm or edit your contact details',
          },
          {
            href: '/respondent/support-you-need-during-case/attending-the-court',
            id: 'support_you_need_during_your_case',
            status: 'TO_DO',
            text: 'Support you need during your case',
          },
        ],
        title: 'Your details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/miam/miam-start/1234',
            id: 'medation-miam',
            status: 'TO_DO',
            text: 'Mediation(MIAM)',
          },
          {
            href: '/tasklistresponse/proceedings/start',
            id: 'current-or-previous-proceedings',
            status: 'TO_DO',
            text: 'Current or previous proceedings',
          },
        ],
        title: 'Application details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page',
            id: 'allegations_of_harm_and_violence',
            status: 'NOT_AVAILABLE_YET',
            text: 'Allegations of harm and violence',
          },
        ],
        title: 'Safety concerns',
      },
      {
        items: [
          {
            href: '/tasklistresponse/safety_concerns/main_page',
            id: 'your-safety',
            status: 'TO_DO',
            text: 'Your safety',
          },
        ],
        title: 'Safety concerns',
      },
      {
        items: [
          {
            href: '/tasklistresponse/international-factors/start/1234',
            id: 'international-factors',
            status: 'TO_DO',
            text: 'International element',
          },
        ],
        title: 'Additional information',
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });

  test('Safety concerns', () => {
    const data = {
      userCase: {
        ...mockUserCase,
        legalRepresentation: YesOrNo.NO,
        safetyConcerns: YesOrNo.YES,
      },
      userIdamId: '12345',
    };
    const expected = [
      {
        items: [
          {
            href: '/tasklistresponse/legalrepresentation/start',
            id: 'do_you_have_legal_representation',
            status: 'COMPLETED',
            text: 'Do you have a legal representative?',
          },
        ],
        title: 'Legal representation',
      },
      {
        items: [
          {
            href: '/tasklistresponse/consent-to-application/consent/1234',
            id: 'consent-to-the-application',
            status: 'TO_DO',
            text: 'Do you consent to the application?',
          },
        ],
        title: 'Consent to the application',
      },
      {
        items: [
          {
            href: '/respondent/keep-details-private/details_known/1234',
            id: 'keep-your-details-private',
            status: 'TO_DO',
            text: 'Keep your details private',
          },
          {
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            id: 'confirm-or-edit-your-contact-details',
            status: 'IN_PROGRESS',
            text: 'Confirm or edit your contact details',
          },
          {
            href: '/respondent/support-you-need-during-case/attending-the-court',
            id: 'support_you_need_during_your_case',
            status: 'TO_DO',
            text: 'Support you need during your case',
          },
        ],
        title: 'Your details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/miam/miam-start/1234',
            id: 'medation-miam',
            status: 'TO_DO',
            text: 'Mediation(MIAM)',
          },
          {
            href: '/tasklistresponse/proceedings/start',
            id: 'current-or-previous-proceedings',
            status: 'TO_DO',
            text: 'Current or previous proceedings',
          },
        ],
        title: 'Application details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page',
            id: 'allegations_of_harm_and_violence',
            status: 'NOT_AVAILABLE_YET',
            text: 'Allegations of harm and violence',
          },
        ],
        title: 'Safety concerns',
      },
      {
        items: [
          {
            href: '/tasklistresponse/safety_concerns/main_page',
            id: 'your-safety',
            status: 'COMPLETED',
            text: 'Your safety',
          },
        ],
        title: 'Safety concerns',
      },
      {
        items: [
          {
            href: '/tasklistresponse/international-factors/start/1234',
            id: 'international-factors',
            status: 'TO_DO',
            text: 'International element',
          },
        ],
        title: 'Additional information',
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });
});
