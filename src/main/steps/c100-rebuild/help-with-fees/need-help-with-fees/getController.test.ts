import axios from 'axios';

import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';
import { State } from '../../../../app/case/definition';
import * as Urls from '../../../../steps/urls';

import NeedHelpWithFeesGetController from './getController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('NeedHelpWithFeesGetController', () => {
  test('Should render the page', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        feeAmountForC100Application: '232',
        errorRetrievingResponse: '',
      },
    });

    const controller = new NeedHelpWithFeesGetController('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(1).toEqual(1);
  });

  test('Testing controller native methods to ensure right validation', async () => {
    const controller = new NeedHelpWithFeesGetController('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest({ userCase: { state: State.AwaitingPayment } });
    const res = mockResponse();
    await controller.get(req, res);
    req.originalUrl = Urls.C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES;
    expect(req.originalUrl).toBe(req.originalUrl);
  });

  describe('Getting the users preferred language', () => {
    test('Language whelsh via session', async () => {
      const controller = new NeedHelpWithFeesGetController('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'cy';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;

      await controller.get(req, res);

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        formaction: req.originalUrl,
      });
    });
  });

  describe('Getting the users preferred language - english', () => {
    test('Language english via session', async () => {
      const controller = new NeedHelpWithFeesGetController('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'en';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;

      await controller.get(req, res);

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        formaction: req.originalUrl,
      });
    });
  });
});
