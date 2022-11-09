import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../app/case/case';
import { DASHBOARD_URL } from '../../urls';

import GetCaseController from './getController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Get Case Controller', () => {
  test('should render the page', async () => {
    const controller = new GetCaseController('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    const res = mockResponse();
    req.session.lang = language;
    await controller.get(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith('error');
  });

  test('should retrieve draft case', async () => {
    const controller = new GetCaseController('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    const res = mockResponse();
    req.session.lang = language;

    req.locals.C100Api.retrieveCase.mockResolvedValue([]);
    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });

  test('Retrieve draft case without return URL', async () => {
    const controller = new GetCaseController('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    const res = mockResponse();
    req.session.lang = language;

    req.locals.C100Api.retrieveCase.mockResolvedValue([
      {
        id: 1665662226514454,
        state: 'AWAITING_SUBMISSION_TO_HMCTS',
        c100RebuildInternationalElements: '{"ie_internationalRequest":"Yes","ie_provideDetailsRequest":"test IE"}',
        c100RebuildReasonableAdjustments:
          '{"ra_typeOfHearing":["phoneHearing"],"ra_noVideoAndPhoneHearingExplanation":"","ra_languageNeeds":["speakInWelsh"],"ra_needInterpreterInCertainLanguageDetails":"","ra_specialArrangements":["separateExitEntrance"],"ra_specialArrangementsOtherSubField":"","ra_disabilityRequirements":["documentsHelp"]}',
        c100RebuildReturnUrl: '/c100-rebuild/reasonable-adjustments/disability-requirements',
      },
    ]);
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });
});
