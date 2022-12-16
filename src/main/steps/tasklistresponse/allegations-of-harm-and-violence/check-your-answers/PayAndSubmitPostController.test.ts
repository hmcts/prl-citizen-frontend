import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import { C100_CHECK_YOUR_ANSWER, C100_CONFIRMATIONPAGE, DASHBOARD_URL } from '../../../urls';

import PayAndSubmitPostController from './PayAndSubmitPostController';

jest.mock('axios');
let req, res;

describe('PayAndSubmitPostController test cases', () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should invoke save and come back later and navigate to dashboard', async () => {
    req = mockRequest({
      body: {
        saveAndComeLater: true,
      },
      session: {
        userCase: {
          caseId: '1234567890123456',
        },
      },
    });
    req.path = '/c100-rebuild/dummyUrl';

    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });

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
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(C100_CONFIRMATIONPAGE);
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
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith(C100_CONFIRMATIONPAGE);
  });

  test('Should navigate to check your answers in case of any errors', async () => {
    delete req.body;
    const controller = new PayAndSubmitPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(C100_CHECK_YOUR_ANSWER);
  });
});
