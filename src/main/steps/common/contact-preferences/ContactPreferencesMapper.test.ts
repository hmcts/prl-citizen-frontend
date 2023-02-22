import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { getContactPreferences, setContactPreferences } from './ContactPreferencesMapper';

let applicants;

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
          response: '',
        },
      },
    ];
  });

  test('Should setContactPreferences without response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantPreferredContact = 'Digital';
    await setContactPreferences(applicants[0].value, req);
    expect(applicants[0].value.response.applicantPreferredContact).toEqual('Digital');
  });

  test('Should setContactPreferences with response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantPreferredContact = 'Digital';
    const response = {
      applicantPreferredContact: 'Digital',
    };
    applicants[0].value.response = response;
    await setContactPreferences(applicants[0].value, req);
    expect(applicants[0].value.response.applicantPreferredContact).toEqual('Digital');
  });

  test('Should setContactPreferences without applicantPreferredContact', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantPreferredContact = 'Digital';
    const response = {};
    applicants[0].value.response = response;
    await setContactPreferences(applicants[0].value, req);
    expect(applicants[0].value.response.applicantPreferredContact).toEqual('Digital');
  });

  test('Should getContactPreferences with applicant contact preference indicated as Post', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      applicantPreferredContact: 'Post',
    };
    applicants[0].value.response = response;
    await getContactPreferences(applicants[0].value, req);
    expect(req.session.userCase.applicantPreferredContact).toEqual('Post');
  });

  test('Should getContactPreferences with applicant contact preference indicated as Digital', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      applicantPreferredContact: 'Digital',
    };
    applicants[0].value.response = response;
    await getContactPreferences(applicants[0].value, req);
    expect(req.session.userCase.applicantPreferredContact).toEqual('Digital');
  });
});
