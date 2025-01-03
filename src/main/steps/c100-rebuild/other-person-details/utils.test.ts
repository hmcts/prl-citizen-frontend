import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

import { cleanOtherPeopleDetails } from './utils';

describe.skip('c100 > other person details > utils', () => {
  describe('cleanOtherPeopleDetails', () => {
    test('should clean data when other person check is no', () => {
      const caseData = {
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
          {
            id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
            firstName: 'John',
            lastName: 'Doe2',
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
              isDateOfBirthUnknown: 'Yes',
              approxDateOfBirth: {
                year: '1987',
                month: '12',
                day: '12',
              },
              gender: 'Male',
              otherGenderDetails: '',
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: 'test',
            },
            liveWith: [
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
                firstName: 'John',
                lastName: 'Doe',
                partyType: 'other person',
              },
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
                firstName: 'John',
                lastName: 'Doe2',
                partyType: 'other person',
              },
            ],
            mainlyLiveWith: {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
              firstName: 'John',
              lastName: 'Doe',
              partyType: 'other person',
            },
          },
          {
            id: '7483640e-0817-4ddc-b709-6723f7925324',
            firstName: 'Sam',
            lastName: 'Daniel',
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
              gender: 'Male',
              otherGenderDetails: '',
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: '',
            },
            liveWith: [
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
                firstName: 'John',
                lastName: 'Doe',
                partyType: 'other person',
              },
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
                firstName: 'John',
                lastName: 'Doe2',
                partyType: 'other person',
              },
            ],
            mainlyLiveWith: {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
              firstName: 'John',
              lastName: 'Doe2',
              partyType: 'other person',
            },
          },
        ],
      } as unknown as CaseWithId;
      expect(cleanOtherPeopleDetails(caseData, YesOrNo.NO)).toStrictEqual({
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
              isDateOfBirthUnknown: 'Yes',
              approxDateOfBirth: {
                year: '1987',
                month: '12',
                day: '12',
              },
              gender: 'Male',
              otherGenderDetails: '',
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: 'test',
            },
            liveWith: [],
          },
          {
            id: '7483640e-0817-4ddc-b709-6723f7925324',
            firstName: 'Sam',
            lastName: 'Daniel',
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
              gender: 'Male',
              otherGenderDetails: '',
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
        oprs_otherPersons: [],
      });
    });

    test('should not clean data when other person check is yes', () => {
      const caseData = {
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
          {
            id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
            firstName: 'John',
            lastName: 'Doe2',
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
              isDateOfBirthUnknown: 'Yes',
              approxDateOfBirth: {
                year: '1987',
                month: '12',
                day: '12',
              },
              gender: 'Male',
              otherGenderDetails: '',
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: 'test',
            },
            liveWith: [
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
                firstName: 'John',
                lastName: 'Doe',
                partyType: 'other person',
              },
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
                firstName: 'John',
                lastName: 'Doe2',
                partyType: 'other person',
              },
            ],
            mainlyLiveWith: {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
              firstName: 'John',
              lastName: 'Doe',
              partyType: 'other person',
            },
          },
          {
            id: '7483640e-0817-4ddc-b709-6723f7925324',
            firstName: 'Sam',
            lastName: 'Daniel',
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
              gender: 'Male',
              otherGenderDetails: '',
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: '',
            },
            liveWith: [
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
                firstName: 'John',
                lastName: 'Doe',
                partyType: 'other person',
              },
              {
                id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
                firstName: 'John',
                lastName: 'Doe2',
                partyType: 'other person',
              },
            ],
            mainlyLiveWith: {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
              firstName: 'John',
              lastName: 'Doe2',
              partyType: 'other person',
            },
          },
        ],
      } as unknown as CaseWithId;
      expect(cleanOtherPeopleDetails(caseData, YesOrNo.YES)).toStrictEqual(caseData);
    });
  });
});
