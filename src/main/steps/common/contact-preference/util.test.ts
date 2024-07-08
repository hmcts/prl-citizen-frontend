import { CaseWithId } from '../../../app/case/case';
import { ContactPreference, PartyType } from '../../../app/case/definition';

import { getChangeLink, hasContactPreference } from './util';

describe('contact preferences utils', () => {
  const caseData = {
    caseTypeOfApplication: 'FL401',
    applicantsFL401: {
      email: 'MOCK_EMAIL',
      address: {
        AddressLine1: 'AddressLine1',
        AddressLine2: 'AddressLine2',
        AddressLine3: 'AddressLine3',
        PostTown: 'PostTown',
        County: 'County',
        PostCode: 'PostCode',
        Country: 'Country',
      },
    },
  } as unknown as CaseWithId;
  test('hasContactPreferences should return correct value when email', () => {
    caseData.applicantsFL401!.contactPreferences = 'email' as ContactPreference;
    expect(hasContactPreference(caseData, '1234')).toBe(true);
  });

  test('hasContactPreferences should return correct value when post', () => {
    caseData.applicantsFL401!.contactPreferences = 'post' as ContactPreference;
    expect(hasContactPreference(caseData, '1234')).toBe(true);
  });

  test('hasContactPreferences should return correct value when not present', () => {
    caseData.applicantsFL401!.contactPreferences = undefined;
    expect(hasContactPreference(caseData, '1234')).toBe(false);
  });

  describe('getChangeLink', () => {
    test('should return correct link for respondent when contact preference is email', () => {
      expect(getChangeLink('respondent' as PartyType, 'email' as ContactPreference)).toBe(
        '/respondent/confirm-contact-details/contactdetails'
      );
    });

    test('should return correct link for respondent when contact preference is post', () => {
      expect(getChangeLink('respondent' as PartyType, 'post' as ContactPreference)).toBe(
        '/respondent/confirm-contact-details/addressdetails'
      );
    });

    test('should return correct link for applicant when contact preference is email', () => {
      expect(getChangeLink('applicant' as PartyType, 'email' as ContactPreference)).toBe(
        '/applicant/confirm-contact-details/contactdetails'
      );
    });

    test('should return correct link for applicant when contact preference is post', () => {
      expect(getChangeLink('applicant' as PartyType, 'post' as ContactPreference)).toBe(
        '/applicant/confirm-contact-details/addressdetails'
      );
    });
  });
});
