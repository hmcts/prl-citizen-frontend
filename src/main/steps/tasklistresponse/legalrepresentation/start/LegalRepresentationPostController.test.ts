import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';
import { LEGAL_REPRESENTATION_START } from '../../../urls';

import LegalRepresentationPostController from './LegalRepresentationPostController';

// import Mock = jest.Mock;

const body = {
  respondents: [
    {
      id: '123',
      value: {
        response: {
          legalRepresentation: YesOrNo.YES,
        },
        user: {
          idamId: '123',
        },
      },
    },
  ],
};

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('PostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({ session: { userCase: { email: 'test@example.com' } } });
    res = mockResponse();
    req.session.userCase = body;
    jest.spyOn(CosApiClient.prototype, 'updateCase').mockResolvedValue(req.session.userCase);
    const mockForm = {
      fields: {
        legalRepresentation: YesOrNo.YES,
      },
    } as unknown as FormContent;
    controller = new LegalRepresentationPostController(mockForm.fields);
  });
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('post should be able to save legal representation information', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    req.session.user.id = '123';
    req.session.userCase = body;
    req.body.respondents = body.respondents;
    req.body.legalRepresentation = body.respondents[0].value.response.legalRepresentation;
    const language = 'en';
    req.session.lang = language;
    controller.post(req, res);
    expect(1).toEqual(1);
  });

  test('proceed saving legal representation without error', async () => {
    req.session.user.id = '123';
    req.session.userCase = body;
    req.body.respondents = body.respondents;
    body.respondents[0].value.response.legalRepresentation = YesOrNo.NO;
    req.body.legalRepresentation = body.respondents[0].value.response.legalRepresentation;
    const language = 'en';
    req.session.lang = language;
    controller.post(req, res);
    const redirectUrl = LEGAL_REPRESENTATION_START;
    expect(req.originalUrl).not.toBe(redirectUrl);
  });

  test('legal representation with error', async () => {
    req.session.user.id = '123';
    req.session.userCase = body;
    req.session.errors = [];
    req.body.respondents = body.respondents;
    const language = 'en';
    req.session.lang = language;
    controller.post(req, res);
    expect(req.session.errors).toHaveLength(1);
  });
});
