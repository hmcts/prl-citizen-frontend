import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../app/form/Form';

import CaseWithdrawPostController from './postController';

jest.mock('axios');
let req, res;

describe('CaseWithdrawPostController', () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('when save and continue is true with out error', async () => {
    req = mockRequest({
      body: {
        saveAndContinue: 'true',
      },
      session: {
        userCase: {
          caseId: '1234',
        },
      },
    });

    const controller = new CaseWithdrawPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
