import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CaseWithdrawPostController from './postController';

jest.mock('axios');
let req, res;

describe('CaseWithdrawPostController', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

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
        withdrawApplication: 'Yes',
        withdrawApplicationReason: 'withdraw test',
      },
      session: {
        userCase: {
          caseId: '1234',
        },
      },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
        ...req,
        withdrawApplication: 'Yes',
        withdrawApplicationReason: 'withdraw test',
        state: State.CASE_WITHDRAWN,
      },
    });

    const controller = new CaseWithdrawPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
