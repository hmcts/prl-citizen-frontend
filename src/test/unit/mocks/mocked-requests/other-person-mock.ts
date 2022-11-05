import { mockRequest } from '../../utils/mockRequest';

export const otherPersonMockData = mockRequest({
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
