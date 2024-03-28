import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { mapContactPreference, prepareContactPreferenceRequest } from './ContactPreferencesMapper';

let applicants;
let partyDetails;

describe('ContactPreferencesMapper', () => {
  const req = mockRequest();
  beforeEach(() => {
    applicants = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Sonali',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: {
            contactPreferences: 'Digital',
          },
          contactPreferences: 'Digital',
        },
      },
    ];
    partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Sonali',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: {
            contactPreferences: 'Digital',
          },
          contactPreferences: 'Digital',
        },
      },
    ];
  });

  test('Should setContactPreferences with response as Digital', async () => {
    const result = prepareContactPreferenceRequest({ ...partyDetails, preferredModeOfContact: 'Digital' });
    expect(result.contactPreferences).toEqual('Digital');
  });

  test('Should setContactPreferences with response as Post', async () => {
    const result = prepareContactPreferenceRequest({ ...partyDetails, preferredModeOfContact: 'Post' });
    expect(result.contactPreferences).toEqual('Post');
  });

  test('Should getContactPreferences with applicant contact preference indicated as Post', () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    applicants[0].value.contactPreferences = 'post';
    Object.assign(req.session.userCase, mapContactPreference(applicants[0].value));
    expect(req.session.userCase.preferredModeOfContact).toEqual('post');
  });

  test('Should getContactPreferences with applicant contact preference indicated as Digital', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    applicants[0].value.contactPreferences = 'digital';
    Object.assign(req.session.userCase, mapContactPreference(applicants[0].value));
    expect(req.session.userCase.preferredModeOfContact).toEqual('digital');
  });
});
