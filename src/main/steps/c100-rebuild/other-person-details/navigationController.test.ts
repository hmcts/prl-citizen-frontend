import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { RelationshipType } from '../../../app/case/definition';
import {
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
  C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
} from '../../urls';

import OtherPersonsDetailsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  params: {
    otherPersonId: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
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
      oprs_otherPersons: [
        {
          id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
          firstName: 'John',
          lastName: 'Doe',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1999',
              month: '09',
              day: '09',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'dontKnow',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: RelationshipType.MOTHER,
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: RelationshipType.FATHER,
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: RelationshipType.GUARDIAN,
                otherRelationshipTypeDetails: '',
              },
            ],
          },
        },
      ],
    },
  },
});

describe('OtherPersonsDetailsNavigationController', () => {
  test('From Add other person screen -> navigates to the same screen (before linking pages)', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADD, dummyRequest.session.userCase)
    ).toBe('/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/personal-details');
  });

  test('From other person personal details  -> navigate to other person relationship for child 1', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe(
      '/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
    );
  });
  /* new  */

  test('From OtherPerson1 relationship to child 1 screen -> navigate to OtherPerson1 relationship to child 2 screen', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe(
      '/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925635'
    );
  });

  test('From OtherPerson1 relationship screen -> navigate to other person address lookup', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/lookup');
  });

  test('From OtherPerson1 address lookup screen -> navigate to other person address select', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/select');
  });

  test('From OtherPerson1 select screen -> navigate to other person address manual', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/manual');
  });

  test('From OtherPerson1 manual screen -> navigate to other proceedings', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
        dummyRequest.session.userCase,
        dummyparams.params
      )
    ).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');
  });
});
