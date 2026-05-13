import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import {
  C100_OTHER_PERSON_CHECK,
  C100_RESPONDENT_DETAILS_ADD,
  C100_RESPONDENT_DETAILS_ADDRESS_MANUAL,
  C100_RESPONDENT_DETAILS_ADDRESS_SELECT,
  C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK,
  C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK_NO,
  C100_RESPONDENT_DETAILS_CONFIDENTIALITY_START_ALTERNATIVE,
  C100_RESPONDENT_DETAILS_CONTACT_DETAILS,
  C100_RESPONDENT_DETAILS_PERSONAL_DETAILS,
  C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
} from '../../urls';

import RespondentsDetailsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
    respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
  },
  session: {
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'child1',
          lastName: 'child1',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
        {
          id: '7483640e-0817-4ddc-b709-6723f7925635',
          firstName: 'child2',
          lastName: 'child2',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: 'Female',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'child 2 responsibility',
          },
        },
      ],
      resp_Respondents: [
        {
          id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
          firstName: 'r1',
          lastName: 'r11',
          personalDetails: {
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            otherGenderDetails: '',
          },
          contactDetails: {
            donKnowEmailAddress: 'No',
            emailAddress: 'email@example.com',
            telephoneNumber: '00000000000',
            donKnowTelephoneNumber: 'No',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: 'Mother',
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: 'Father',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: 'Guardian',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          isRespondentEmailAddressConfidential: 'Yes',
        },
        {
          id: '2cd885a0-135e-45f1-85b7-aa46a1f78f46',
          firstName: 'r2',
          lastName: 'r22',
          personalDetails: {
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            otherGenderDetails: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: 'Special Guardian',
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: 'Other',
                otherRelationshipTypeDetails: 'test',
              },
            ],
          },
        },
      ],
    },
  },
});

const dummyRequestWithOneRespondent = mockRequest({
  params: {
    respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
  },
  session: {
    userCase: {
      resp_Respondents: [
        {
          id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
          firstName: 'r1',
          lastName: 'r11',
          personalDetails: {
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            otherGenderDetails: '',
          },
          contactDetails: {
            donKnowEmailAddress: 'No',
            emailAddress: 'email@example.com',
            telephoneNumber: '00000000000',
            donKnowTelephoneNumber: 'No',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: 'Mother',
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: 'Father',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: 'Guardian',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          isRespondentEmailAddressConfidential: 'Yes',
        },
      ],
    },
  },
});

describe('RespondentsDetailsNavigationController', () => {
  test('From Add Respondent screen -> navigate to Respondent details screen', async () => {
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_ADD,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/personal-details');
  });

  test('From Respondent Personal Details -> navigate to Respondent1 relationship to child 1 screen', async () => {
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_PERSONAL_DETAILS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
    );
  });

  test('From Respondent1 relationship to child 1 screen -> navigate to Respondent1 relationship to child 2 screen', async () => {
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925635'
    );
  });

  test('From Respondent1 relationship to child 2 screen -> navigate to Respondent address/lookup screen', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/lookup');
  });

  test('From Respondent address/lookup screen -> navigate to Respondent address/select screen', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_ADDRESS_SELECT,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/manual');
  });

  test('From Respondent address/select screen -> navigate to Respondent address/contact-details screen', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_ADDRESS_MANUAL,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/contact-details');
  });

  test('From Respondent contact details screen -> navigate to Other Person check screen when just one respondent exists', async () => {
    const dummyparams = mockRequest({
      params: {
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_CONTACT_DETAILS,
        dummyRequestWithOneRespondent.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/other-person-details/other-person-check');
  });

  test('From Respondent contact details screen -> navigate to Respondent confidentiality start screen when more than one respondent exists', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_CONTACT_DETAILS,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/confidentiality/start-alternative');
  });

  test('From Respondent confidentiality start screen -> navigate to Respondent confidentiality feedback screen', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_CONFIDENTIALITY_START_ALTERNATIVE,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/confidentiality/feedback');
  });

  test('From Respondent confidentiality start screen -> navigate to Respondent confidentiality feedback no screen', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2cd885a0-135e-45f1-85b7-aa46a1f78f46',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_CONFIDENTIALITY_START_ALTERNATIVE,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/respondent-details/2cd885a0-135e-45f1-85b7-aa46a1f78f46/confidentiality/feedback-no');
  });

  test('From Respondent confidentiality feedback screen -> navigate to next Respondent personal details screen when other respondents exist', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/respondent-details/2cd885a0-135e-45f1-85b7-aa46a1f78f46/personal-details');
  });

  test('From Respondent confidentiality feedback no screen -> navigate to other person check screen when no further respondents exist', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
        respondentId: '2cd885a0-135e-45f1-85b7-aa46a1f78f46',
      },
    });
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK_NO,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/other-person-details/other-person-check');
  });

  test('default', async () => {
    //let currentUrl='/c100-rebuild/respondent-details';
    expect(
      RespondentsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_CHECK,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/other-person-details/other-person-check');
  });
});
