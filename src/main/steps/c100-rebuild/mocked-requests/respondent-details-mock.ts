import { mockRequest } from '../../../../test/unit/utils/mockRequest';

export const respondentMockData = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
    respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
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
        },
      ],
    },
  },
});
