import { CaseWithId } from '../../../app/case/case';
import { Gender, YesNoEmpty, YesOrNo } from '../../../app/case/definition';

import {
  areApplicantsValid,
  isAddressSectionValid,
  isContactDetailsSectionValid,
  isContactPreferencesSectionValid,
  isNameSectionValid,
  isPersonalDetailsSectionValid,
  isRefugeAndConfidentialitySectionValid,
  isRelationshipToChildrenSectionValid,
} from './applicantValidation';

describe('Applicant Validation Functions', () => {
  describe('isNameSectionValid', () => {
    it('should return true when first and last names are present', () => {
      expect(isNameSectionValid({ applicantFirstName: 'John', applicantLastName: 'Doe' } as never)).toBe(true);
    });

    it('should return false when first name is missing', () => {
      expect(isNameSectionValid({ applicantLastName: 'Doe' } as never)).toBe(false);
    });

    it('should return false when last name is missing', () => {
      expect(isNameSectionValid({ applicantFirstName: 'John' } as never)).toBe(false);
    });
  });

  describe('isRefugeAndConfidentialitySectionValid', () => {
    it('should return true when living in refuge and confidentiality form is provided', () => {
      expect(
        isRefugeAndConfidentialitySectionValid({
          liveInRefuge: YesOrNo.YES,
          refugeConfidentialityC8Form: 'Uploaded.pdf',
        } as never)
      ).toBe(true);
    });

    it('should return false when living in refuge is not set', () => {
      expect(
        isRefugeAndConfidentialitySectionValid({
          liveInRefuge: null,
        } as never)
      ).toBe(false);
    });

    it('should return false when start or start alternative is not set', () => {
      expect(
        isRefugeAndConfidentialitySectionValid({
          liveInRefuge: YesOrNo.NO,
          start: null,
          startAlternative: null,
        } as never)
      ).toBe(false);
    });

    it('should return false when living in refuge but no confidentiality form', () => {
      expect(
        isRefugeAndConfidentialitySectionValid({
          liveInRefuge: YesOrNo.YES,
        } as never)
      ).toBe(false);
    });

    it('should return true when NOT living in refuge and private details are filled', () => {
      expect(
        isRefugeAndConfidentialitySectionValid({
          liveInRefuge: YesOrNo.NO,
          detailsKnown: YesOrNo.YES,
          startAlternative: YesOrNo.YES,
          contactDetailsPrivateAlternative: 'Address is confidential',
        } as never)
      ).toBe(true);
    });

    it('should return false when missing detailsKnown', () => {
      expect(
        isRefugeAndConfidentialitySectionValid({
          liveInRefuge: YesOrNo.NO,
        } as never)
      ).toBe(false);
    });
  });

  describe('isPersonalDetailsSectionValid', () => {
    it('should return true when all personal details are filled', () => {
      expect(
        isPersonalDetailsSectionValid({
          personalDetails: {
            haveYouChangeName: YesNoEmpty.NO,
            gender: 'Male',
            dateOfBirth: '2000-01-01',
            applicantPlaceOfBirth: 'London',
          },
        } as never)
      ).toBe(true);
    });

    it('should return false when personalDetails missing', () => {
      expect(isPersonalDetailsSectionValid({} as never)).toBe(false);
    });

    it('should return false when previous name is missing but name change is YES', () => {
      expect(
        isPersonalDetailsSectionValid({
          personalDetails: {
            haveYouChangeName: YesNoEmpty.YES,
          },
        } as never)
      ).toBe(false);
    });
  });

  describe('isRelationshipToChildrenSectionValid', () => {
    it('should return true when relationship length matches children length', () => {
      const applicant = { relationshipDetails: { relationshipToChildren: [{}, {}] } };
      const children = [{}, {}];
      expect(isRelationshipToChildrenSectionValid(applicant as never, children as never)).toBe(true);
    });

    it('should return false when relationship length does not match children', () => {
      const applicant = { relationshipDetails: { relationshipToChildren: [{}] } };
      const children = [{}, {}];
      expect(isRelationshipToChildrenSectionValid(applicant as never, children as never)).toBe(false);
    });
  });

  describe('isAddressSectionValid', () => {
    it('should return true when address fields are populated', () => {
      expect(
        isAddressSectionValid({
          applicantAddress1: '123 Street',
          applicantAddressTown: 'Townsville',
          country: 'UK',
          applicantAddressHistory: YesOrNo.NO,
        } as never)
      ).toBe(true);
    });

    it('should return false when required address field missing', () => {
      expect(
        isAddressSectionValid({
          applicantAddress1: '',
          applicantAddressTown: 'Townsville',
          country: 'UK',
          applicantAddressHistory: YesOrNo.NO,
        } as never)
      ).toBe(false);
    });

    it('should return false if address history is YES but no previous addresses', () => {
      expect(
        isAddressSectionValid({
          applicantAddress1: '123 Street',
          applicantAddressTown: 'Townsville',
          country: 'UK',
          applicantAddressHistory: YesOrNo.YES,
        } as never)
      ).toBe(false);
    });
  });

  describe('isContactDetailsSectionValid', () => {
    it('should return true when valid email and phone are provided', () => {
      expect(
        isContactDetailsSectionValid({
          applicantContactDetail: {
            canProvideEmail: YesOrNo.YES,
            emailAddress: 'test@email.com',
            canProvideTelephoneNumber: YesOrNo.YES,
            telephoneNumber: '01234567890',
          },
        } as never)
      ).toBe(true);
    });

    it('should return false when email is invalid', () => {
      expect(
        isContactDetailsSectionValid({
          applicantContactDetail: {
            canProvideEmail: YesOrNo.YES,
            emailAddress: 'bad-email',
            canProvideTelephoneNumber: YesOrNo.NO,
            canNotProvideTelephoneNumberReason: 'No phone',
          },
        } as never)
      ).toBe(false);
    });
  });

  describe('isContactPreferencesSectionValid', () => {
    it('should return true when voicemail and preferences are set', () => {
      expect(
        isContactPreferencesSectionValid({
          applicantContactDetail: {
            canLeaveVoiceMail: YesOrNo.YES,
            applicantContactPreferences: ['Email'],
          },
        } as never)
      ).toBe(true);
    });

    it('should return false when missing voicemail', () => {
      expect(
        isContactPreferencesSectionValid({
          applicantContactDetail: {
            applicantContactPreferences: ['Email'],
          },
        } as never)
      ).toBe(false);
    });
  });

  describe('areApplicantsValid', () => {
    test('should return true if applicants are valid', () => {
      expect(
        areApplicantsValid({
          appl_allApplicants: [
            {
              applicantFirstName: 'test',
              applicantLastName: 'test',
              liveInRefuge: 'No',
              detailsKnown: 'Yes',
              startAlternative: 'Yes',
              contactDetailsPrivateAlternative: ['phone'],
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
});
