import { CaseWithId } from '../../../app/case/case';
import { Gender } from '../../../app/case/definition';

import { areApplicantsValid } from './applicantValidation';

describe('areApplicantsValid', () => {
  test('should return true if applicants are valid', () => {
    expect(
      areApplicantsValid({
        appl_allApplicants: [
          {
            applicantFirstName: 'test',
            applicantLastName: 'test',
            detailsKnown: 'Yes',
            start: 'Yes',
            contactDetailsPrivate: ['phone'],
            personalDetails: {
              haveYouChangeName: 'No',
              dateOfBirth: {
                year: '2020',
                month: '1',
                day: '1',
              },
              gender: Gender.FEMALE,
              applicantPlaceOfBirth: 'test',
            },
            liveInRefuge: 'No',
            applicantAddress1: 'test',
            applicantAddressTown: 'test',
            country: 'test',
            applicantAddressHistory: 'No',
            applicantContactDetail: {
              canProvideEmail: 'Yes',
              emailAddress: 'test@test.com',
              canProvideTelephoneNumber: 'Yes',
              telephoneNumber: '01234567891',
              canLeaveVoiceMail: 'Yes',
              applicantContactPreferences: 'email',
            },
            relationshipDetails: {
              relationshipToChildren: ['test'],
            },
            id: '123',
          },
        ],
        cd_children: [{ id: '123' }],
      } as unknown as CaseWithId)
    ).toBe(true);
  });

  test('should return false if applicants are not valid', () => {
    expect(
      areApplicantsValid({
        appl_allApplicants: [
          {
            applicantFirstName: 'test',
            applicantLastName: 'test',
            detailsKnown: 'Yes',
            start: 'Yes',
            contactDetailsPrivate: ['phone'],
            personalDetails: {
              haveYouChangeName: 'Yes',
              dateOfBirth: {
                year: '2020',
                month: '1',
                day: '1',
              },
              gender: Gender.FEMALE,
              applicantPlaceOfBirth: 'test',
            },
            liveInRefuge: 'Yes',
            applicantAddress1: 'test',
            applicantAddressTown: 'test',
            country: 'test',
            applicantAddressHistory: 'Yes',
            applicantContactDetail: {
              canProvideEmail: 'Yes',
              emailAddress: 'test@test.com',
              canProvideTelephoneNumber: 'Yes',
              telephoneNumber: '0123456789',
              canLeaveVoiceMail: 'Yes',
              applicantContactPreferences: 'email',
            },
            relationshipDetails: {
              relationshipToChildren: [],
            },
            id: '123',
          },
        ],
        cd_children: [{ id: '123' }],
      } as unknown as CaseWithId)
    ).toBe(false);
  });
});
