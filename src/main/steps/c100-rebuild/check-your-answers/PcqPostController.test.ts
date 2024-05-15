import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Document } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { C100_CONFIRMATIONPAGE } from '../../urls';

import C100RebuildPostController from './PcqPostController';

jest.mock('axios');
let req, res;

const finalDocument: Document = {
  document_url: '/document/dummy/download',
  document_filename: 'dummy file',
  document_binary_url: 'http://dummy.document.download',
};

describe('C100RebuildPostController test cases', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should submit case when help with fees reference number is present and navigate to confirmation page', async () => {
    req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        userCase: {
          caseId: '1234567890123456',
          helpWithFeesReferenceNumber: 'HWF-1234',
        },
      },
    });
    const caseData = {
      ...finalDocument,
    };
    mockedAxios.post.mockResolvedValue({ data: caseData });
    req.locals.C100Api.updateCase.mockResolvedValue({
      ...caseData,
    });
    const controller = new C100RebuildPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.paymentError).toBeUndefined;
  });

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
    const controller = new C100RebuildPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith(C100_CONFIRMATIONPAGE);
    expect(req.session.paymentError).toBeUndefined;
  });
});
