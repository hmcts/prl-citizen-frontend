import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';
import { C100OrderTypes } from '../../../../app/case/definition';

import DocumentSummary from './getController';

describe('Document Summary Get Controller', () => {
  test('Should render the page', async () => {
    const controller = new DocumentSummary('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'cy';
    const req = mockRequest({
      query: {
        orderType: C100OrderTypes.CARE_ORDER,
      },
    });
    const res = mockResponse();
    req.session.lang = language;
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith('error');
  });

  test('Should not render the page', async () => {
    const controller = new DocumentSummary('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'cy';
    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = language;

    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('error');
  });
});
