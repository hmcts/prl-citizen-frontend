import { mockRequest } from '../../utils/mockRequest';

export const otherChildrenMockData = mockRequest({
  params: {
    childId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
  },
  session: {
    userCase: {
      ocd_otherChildren: [
        {
          id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
          firstName: 'Alice',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: '',
          },
        },
      ],
    },
  },
});
