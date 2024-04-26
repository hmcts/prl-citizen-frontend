import { v4 as uuid } from 'uuid';

import { CHECK_ANSWERS } from '../../urls';

import { createToken } from './createToken';

describe('createToken', () => {
  const params = {
    serviceId: 'ADOPTION',
    actor: 'APPLICANT',
    pcqId: uuid(),
    partyId: 'test@email.com',
    returnUrl: CHECK_ANSWERS,
    language: 'en',
    token: '',
  };

  test('Should create token if tokenKey exists', async () => {
    const result = await createToken(params, 'PCQ_TOKEN');

    expect(result).toHaveLength(394);
  });
});
