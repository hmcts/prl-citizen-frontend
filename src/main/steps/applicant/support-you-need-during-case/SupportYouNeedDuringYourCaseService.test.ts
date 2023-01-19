import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { getSupportDetails, setSupportDetails } from './SupportYouNeedDuringYourCaseService';

describe('support you need during case service tests', () => {
  test('getSupportDetails', () => {
    const req = mockRequest({
      session: {
        userCase: {
          otherPersonFirstName: '',
          otherPersonLastName: '',
          respondents: [
            {
              id: '123',
              value: {
                response: {},
              },
            },
          ],
        },
      },
    });

    expect(getSupportDetails(req.session.userCase.respondents[0], req)).not.toBeUndefined;
  });

  test('setSupportDetails', () => {
    const req = mockRequest({
      session: {
        userCase: {
          otherPersonFirstName: '',
          otherPersonLastName: '',
          respondents: [
            {
              id: '123',
              value: {
                response: {},
              },
            },
          ],
        },
      },
    });

    expect(setSupportDetails(req.session.userCase.respondents[0].value.response, req)).not.toBeUndefined;
  });
});
