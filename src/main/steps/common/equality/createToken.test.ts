import { v4 as uuid } from 'uuid';

import { C100_CHECK_YOUR_ANSWER } from '../../urls';

import { createToken } from './createToken';

describe('createToken', () => {
  const params = {
    serviceId: 'prl_ca',
    actor: 'APPLICANT',
    pcqId: uuid(),
    partyId: 'test@email.com',
    returnUrl: C100_CHECK_YOUR_ANSWER,
    language: 'en',
    token: '',
  };

  test('Should create token if tokenKey exists', async () => {
    const result = await createToken(params, 'PCQ_TOKEN');
    expect(result).toHaveLength(380);
  });
});
