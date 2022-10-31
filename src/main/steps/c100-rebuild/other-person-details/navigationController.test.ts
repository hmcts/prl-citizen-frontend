import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C100_OTHER_PERSON_DETAILS_ADD } from '../../urls';

import OtherPersonsDetailsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  params: {
    otherPersonId: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
  },
  session: {
    userCase: {
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
            isNameChanged: 'dontKnow',
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

  test('From a screen where the next step is not computed using OtherPersonsDetailsNavigationController.getNextUrl -> navigate to the same screen when navigation controller is invoked from any other screen', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl('/c100-rebuild/dummyPage', dummyRequest.session.userCase)
    ).toBe('/c100-rebuild/dummyPage');
  });
});
