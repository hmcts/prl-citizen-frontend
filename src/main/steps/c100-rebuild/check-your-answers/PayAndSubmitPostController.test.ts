import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Document } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { PCQProvider } from '../../../modules/pcq';
import { PcqController } from '../../../modules/pcq/controller';
import { C100_CHECK_YOUR_ANSWER, C100_CONFIRMATIONPAGE } from '../../urls';

import PayAndSubmitPostController from './PayAndSubmitPostController';

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
    jest.spyOn(PCQProvider, 'getPcqId').mockReturnValueOnce('1234567890123456');
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(true));
    const caseData = {
      ...finalDocument,
    };
    mockedAxios.post.mockResolvedValue({ data: caseData });
    req.locals.C100Api.updateCase.mockResolvedValue({
      ...caseData,
    });
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session.paymentError).toStrictEqual({ hasError: false, errorContext: null });
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
    jest.spyOn(PCQProvider, 'getPcqId').mockReturnValueOnce('1234567890123456');
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(true));
    mockedAxios.post.mockResolvedValueOnce({ finalDocument });
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith(C100_CONFIRMATIONPAGE);
    expect(req.session.paymentError).toStrictEqual({ hasError: false, errorContext: null });
  });

  test('Should navigate to check your answers in case of any errors', async () => {
    delete req.body;
    jest.spyOn(PCQProvider, 'getPcqId').mockReturnValueOnce('1234567890123456');
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(true));
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(C100_CHECK_YOUR_ANSWER);
    expect(req.session.paymentError).toStrictEqual({ hasError: false, errorContext: null });
    expect(req.session.save).toHaveBeenCalled();
  });

  test('Should navigate to payment handler since pcq already executed by user', async () => {
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
    jest.clearAllMocks();
    jest.spyOn(PCQProvider, 'getPcqId').mockReturnValueOnce(null);
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(true));
    const pcqGetControllerMock = jest.spyOn(PcqController.prototype, 'launch');
    mockedAxios.post.mockResolvedValueOnce({ finalDocument });
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);
    expect(pcqGetControllerMock).toHaveBeenCalled();
  });
});
