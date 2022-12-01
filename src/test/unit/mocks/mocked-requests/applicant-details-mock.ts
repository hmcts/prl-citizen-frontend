import { mockRequest } from '../../utils/mockRequest';

export const applicantMockRequest = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
    applicantId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
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
      appl_allApplicants: [
        {
          id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
          applicantFirstName: 'ap1',
          applicantLastName: 'ap11',
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
        {
          id: '2cd885a0-135e-45f1-85b7-aa46a1f78f46',
          applicantFirstName: 'ap2',
          applicantLastName: 'ap22',
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
