import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Document } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { C100_CONFIRMATIONPAGE } from '../../urls';

import PayAndSubmitPostController from './PostControllerAfterPcq';

jest.mock('axios');
let req, res;

const finalDocument: Document = {
  document_url: '/document/dummy/download',
  document_filename: 'dummy file',
  document_binary_url: 'http://dummy.document.download',
};

describe('PayAndSubmitPostController test cases', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should create service & payment request when help with fees reference number is not present and navigate to gov.uk payment page', async () => {
    req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        userCase: {
          caseId: '1234567890123456',
        },
      },
    });
    mockedAxios.post.mockResolvedValueOnce({ finalDocument });
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith(C100_CONFIRMATIONPAGE);
  });

  test('Should navigate to check your answers in case of any errors', async () => {
    delete req.body;
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);
    expect(req.session.save).not.toHaveBeenCalled();
  });
});
