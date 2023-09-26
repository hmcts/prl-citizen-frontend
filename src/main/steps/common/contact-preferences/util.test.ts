import { CaseWithId } from '../../../app/case/case';
import { ContactPreference } from '../../../app/case/definition';

import { hasContactPreference } from './util';

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
  test('hasContactPreferences should return correct value when digital', () => {
    caseData.applicantsFL401!.contactPreferences = 'digital' as ContactPreference;
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
});
