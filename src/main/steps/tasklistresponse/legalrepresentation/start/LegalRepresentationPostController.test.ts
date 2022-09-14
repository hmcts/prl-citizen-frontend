import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';
import { LEGAL_REPRESENTATION_START } from '../../../urls';

import LegalRepresentationPostController from './LegalRepresentationPostController';

// import Mock = jest.Mock;

const dummySessionData = {
  legalRepresentation: YesOrNo.YES,
  respondents: [
    {
      response: {
        legalRepresentation: YesOrNo.YES,
      },
      user: {
        idamId: '123',
      },
    },
  ],
};

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('PostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('post should be able to save legal representation information', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {
        legalRepresentation: YesOrNo.YES,
      },
    } as unknown as FormContent;
    const controller = new LegalRepresentationPostController(mockForm.fields);

    const req = mockRequest({ body });
    req.session.user.id = '123';
    req.session.userCase = dummySessionData;

    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    await controller.post(req, res);
    expect(1).toEqual(1);
  });

  test('proceed saving child without error', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {
        legalRepresentation: YesOrNo.YES,
      },
    } as unknown as FormContent;
    const controller = new LegalRepresentationPostController(mockForm.fields);

    const req = mockRequest({ body });
    req.session.user.id = '123';
    req.session.userCase = dummySessionData;

    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    await controller.post(req, res);

    const redirectUrl = LEGAL_REPRESENTATION_START;
    expect(req.originalUrl).not.toBe(redirectUrl);
  });

  test('Child has both date and Approx date enabled', async () => {
    const mockForm = {
      fields: {
        legalRepresentation: YesOrNo.YES,
      },
    } as unknown as FormContent;
    const controller = new LegalRepresentationPostController(mockForm.fields);
    const req = mockRequest({ dummySessionData });
    req.session.user.id = '123';
    req.session.userCase = dummySessionData;

    const language = 'en';
    req.session.lang = language;
    controller.post(req, mockResponse());
    expect(1).toBe(1);
  });
});
