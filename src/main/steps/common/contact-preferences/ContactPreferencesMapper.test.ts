import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { getContactPreferences, setContactPreferences } from './ContactPreferencesMapper';

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
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantPreferredContact = 'Digital';
    req.body.applicantPreferredContact = 'Digital';
    const response = {
      applicantPreferredContact: 'Digital',
    };
    applicants[0].value.response = response;
    await setContactPreferences(partyDetails, req);
    const result = setContactPreferences(partyDetails, req);
    expect(applicants[0].value.response.applicantPreferredContact).toEqual('Digital');
    expect(result).toEqual(partyDetails);
  });

  test('Should setContactPreferences with response as Post', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    partyDetails.response = 'Digital';
    partyDetails.contactPreferences = 'Digital';
    req.body.applicantPreferredContact = 'Post';
    await setContactPreferences(partyDetails, req);
    expect(partyDetails.contactPreferences).toEqual('Post');
  });

  test('Should getContactPreferences with applicant contact preference indicated as Post', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    applicants[0].value.contactPreferences = 'post';
    await getContactPreferences(applicants[0].value, req);

    expect(req.session.userCase.applicantPreferredContact).toEqual('post');
  });

  test('Should getContactPreferences with applicant contact preference indicated as Digital', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    applicants[0].value.contactPreferences = 'digital';
    await getContactPreferences(applicants[0].value, req);

    expect(req.session.userCase.applicantPreferredContact).toEqual('digital');
  });
});
