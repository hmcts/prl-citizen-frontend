import PCQGetController from '../../../../main/steps/common/equality/PcqNavigationController';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../app/form/Form';

import C100RebuildPostController from './PcqPostController';

jest.mock('axios');
let req, res;

describe('C100RebuildPostController test cases', () => {
  const pcqGetControllerMock = jest.spyOn(PCQGetController.prototype, 'get');
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
        },
      },
    });
    const controller = new C100RebuildPostController(mockFormContent.fields);
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
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
    const controller = new C100RebuildPostController(mockFormContent.fields);
    await controller.post(req, res);
    expect(pcqGetControllerMock).toHaveBeenCalled();
  });
});
