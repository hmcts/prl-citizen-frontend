import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

const dummyData = {
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
    },
  ],
};

describe('Add otherPerson RouteGuard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      params: {
        otherPersonId: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
      },
      session: {
        userCase: {
          ...dummyData,
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails', async () => {
    const req = mockRequest({
      params: {
        otherPersonId: 'junk-id',
      },
      session: {
        userCase: {
          ...dummyData,
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });
});
