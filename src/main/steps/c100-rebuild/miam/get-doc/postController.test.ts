import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import { C100_MIAM_MEDIATOR_DOCUMENT, DASHBOARD_URL } from '../../../urls';

import DeleteCaseController from './postController';

jest.mock('axios');
let req, res;

describe('DeleteCaseController', () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should delete case when deleteCase API gives success response and navigate to dashboard', async () => {
    req = mockRequest({
      body: {
        submit: true,
      },
      session: {
        userCase: {
          caseId: '1234567890123456',
        },
      },
    });

    const controller = new DeleteCaseController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });

  test('Should fail in deleting a case when deleteCase API fails or gives error response', async () => {
    req = mockRequest({
      body: {
        submit: true,
      },
      session: {
        userCase: {},
      },
    });

    const controller = new DeleteCaseController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.session.userCase).not.toHaveProperty('caseId');
    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });

  test('Should navigate to previous page on go back', async () => {
    req = mockRequest({
      body: {
        goBack: true,
      },
    });

    const controller = new DeleteCaseController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(C100_MIAM_MEDIATOR_DOCUMENT);
  });
});
