import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

import {
  cleanOtherPeopleDetails,
  doesAnyChildLiveWithOtherPerson,
  getNextPersonLivingWithChild,
  getOtherPeopleLivingWithChildren,
} from './utils';

describe('c100 > other person details > utils', () => {
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

  describe('doesAnyChildLiveWithOtherPerson', () => {
    test('should return true if any child lives with the other person', () => {
      expect(
        doesAnyChildLiveWithOtherPerson(
          {
            cd_children: [{ id: '123', liveWith: [{ id: '1234' }] }],
          } as unknown as CaseWithId,
          '1234'
        )
      ).toBe(true);
    });

    test('should return false if no child lives with the other person', () => {
      expect(
        doesAnyChildLiveWithOtherPerson(
          {
            cd_children: [{ id: '123', liveWith: [{ id: '12345' }] }],
          } as unknown as CaseWithId,
          '1234'
        )
      ).toBe(false);
    });
  });

  describe('getOtherPeopleLivingWithChildren', () => {
    test('should return the ids of the other people living with children', () => {
      expect(
        getOtherPeopleLivingWithChildren({
          oprs_otherPersons: [{ id: '123' }, { id: '1234' }],
          cd_children: [{ id: '123', liveWith: [{ id: '123' }] }],
        } as unknown as CaseWithId)
      ).toEqual(['123']);
    });

    test('should return an empty list if no other people present', () => {
      expect(
        getOtherPeopleLivingWithChildren({
          cd_children: [{ id: '123', liveWith: [{ id: '123' }] }],
        } as unknown as CaseWithId)
      ).toEqual([]);
    });
  });

  describe('getNextPersonLivingWithChild', () => {
    test('should return the next person who lives with a child', () => {
      expect(getNextPersonLivingWithChild(['123', '1234'], '123')).toBe('1234');
    });
  });
});
