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
  test('legal representation', () => {
    const data = {
      userCase: { ...mockUserCase },
      userIdamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
    };
    data.userCase.respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Smart',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: {
            citizenFlags: {
              isAllegationOfHarmViewed: 'Yes',
            },
            legalRepresentation: YesOrNo.NO,
          },
          gender: '',
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
          },
          dxNumber: '',
          landline: '',
          dateOfBirth: '',
          otherGender: '',
          phoneNumber: '',
          placeOfBirth: '',
          previousName: '',
          solicitorOrg: {
            OrganisationID: '',
            OrganisationName: '',
          },
          sendSignUpLink: '',
          solicitorEmail: '',
          isAddressUnknown: '',
          solicitorAddress: {
            County: '',
            Country: '',
            PostCode: '',
            PostTown: '',
            AddressLine1: '',
            AddressLine2: '',
            AddressLine3: '',
          },
          isDateOfBirthKnown: '',
          solicitorReference: '',
          solicitorTelephone: '',
          isPlaceOfBirthKnown: '',
          isDateOfBirthUnknown: '',
          isAddressConfidential: '',
          isCurrentAddressKnown: '',
          relationshipToChildren: '',
          representativeLastName: '',
          representativeFirstName: '',
          canYouProvidePhoneNumber: '',
          canYouProvideEmailAddress: '',
          isAtAddressLessThan5Years: '',
          isPhoneNumberConfidential: '',
          isEmailAddressConfidential: '',
          respondentLivedWithApplicant: '',
          doTheyHaveLegalRepresentation: '',
          addressLivedLessThan5YearsDetails: '',
          otherPersonRelationshipToChildren: [],
          isAtAddressLessThan5YearsWithDontKnow: '',
        },
      },
    ];
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
        title: '1. Legal representation',
      },
      {
        items: [
          {
            href: '/tasklistresponse/consent-to-application/consent/1234',
            id: 'consent-to-the-application',
            status: 'TO_DO',
            text: 'Do you agree to the application?',
          },
        ],
        title: '2. Consent to the application',
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
            href: '/respondent/reasonable-adjustments/attending-court',
            id: 'support_you_need_during_your_case',
            status: 'OPTIONAL',
            text: 'Support you need during your case',
          },
        ],
        title: '3. Your details',
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
            href: '/tasklistresponse/proceedings/start/1234',
            id: 'current-or-previous-proceedings',
            status: 'TO_DO',
            text: 'Current or previous proceedings',
          },
        ],
        title: '4. Application details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page/1234',
            id: 'allegations_of_harm_and_violence',
            status: 'TO_DO',
            text: 'Allegations of harm and violence',
          },
        ],
        title: '5. Safety concerns',
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
        title: '6. Additional information',
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toStrictEqual(
      expected
    );
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
        title: '1. Legal representation',
      },
      {
        items: [
          {
            href: '/tasklistresponse/consent-to-application/consent/1234',
            id: 'consent-to-the-application',
            status: 'TO_DO',
            text: 'Do you agree to the application?',
          },
        ],
        title: '2. Consent to the application',
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
            href: '/respondent/reasonable-adjustments/attending-court',
            id: 'support_you_need_during_your_case',
            status: 'OPTIONAL',
            text: 'Support you need during your case',
          },
        ],
        title: '3. Your details',
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
            href: '/tasklistresponse/proceedings/start/1234',
            id: 'current-or-previous-proceedings',
            status: 'TO_DO',
            text: 'Current or previous proceedings',
          },
        ],
        title: '4. Application details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page/1234',
            id: 'allegations_of_harm_and_violence',
            status: 'TO_DO',
            text: 'Allegations of harm and violence',
          },
        ],
        title: '5. Safety concerns',
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
        title: '6. Additional information',
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
        title: '1. Legal representation',
      },
      {
        items: [
          {
            href: '/tasklistresponse/consent-to-application/consent/1234',
            id: 'consent-to-the-application',
            status: 'TO_DO',
            text: 'Do you agree to the application?',
          },
        ],
        title: '2. Consent to the application',
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
            href: '/respondent/reasonable-adjustments/attending-court',
            id: 'support_you_need_during_your_case',
            status: 'OPTIONAL',
            text: 'Support you need during your case',
          },
        ],
        title: '3. Your details',
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
            href: '/tasklistresponse/proceedings/start/1234',
            id: 'current-or-previous-proceedings',
            status: 'TO_DO',
            text: 'Current or previous proceedings',
          },
        ],
        title: '4. Application details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page/1234',
            id: 'allegations_of_harm_and_violence',
            status: 'TO_DO',
            text: 'Allegations of harm and violence',
          },
        ],
        title: '5. Safety concerns',
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
        title: '6. Additional information',
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
        title: '1. Legal representation',
      },
      {
        items: [
          {
            href: '/tasklistresponse/consent-to-application/consent/1234',
            id: 'consent-to-the-application',
            status: 'TO_DO',
            text: 'Do you agree to the application?',
          },
        ],
        title: '2. Consent to the application',
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
            href: '/respondent/reasonable-adjustments/attending-court',
            id: 'support_you_need_during_your_case',
            status: 'OPTIONAL',
            text: 'Support you need during your case',
          },
        ],
        title: '3. Your details',
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
            href: '/tasklistresponse/proceedings/start/1234',
            id: 'current-or-previous-proceedings',
            status: 'TO_DO',
            text: 'Current or previous proceedings',
          },
        ],
        title: '4. Application details',
      },
      {
        items: [
          {
            href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page/1234',
            id: 'allegations_of_harm_and_violence',
            status: 'TO_DO',
            text: 'Allegations of harm and violence',
          },
        ],
        title: '5. Safety concerns',
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
        title: '6. Additional information',
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });
});
