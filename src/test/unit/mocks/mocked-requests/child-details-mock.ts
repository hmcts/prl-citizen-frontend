import { mockRequest } from '../../utils/mockRequest';

export const childrenMockData = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
  },
  session: {
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
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
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: '',
          },
          liveWith: [],
        },
      ],
    },
  },
});
