import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../app/case/CosApiClient';
import { HearingData } from '../../app/case/case';
import { PartyType } from '../../app/case/definition';
import { DASHBOARD_URL, PARTY_TASKLIST } from '../urls';

import CaseDataController from './CaseDataController';
import { applyParms } from './url-parser';

const retrieveCaseAndHearingsMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseAndHearings');
//const retrieveCaseByIdMock = jest.spyOn(C100Api.prototype, 'retrieveCaseById');

describe('common > CaseDataController', () => {
  test('fetchAndSaveData should get case hearings and map in session', async () => {
    const controller = new CaseDataController();
    const req = mockRequest();
    retrieveCaseAndHearingsMock.mockResolvedValue({
      caseData: req.session.userCase,
      hearingData: { caseHearings: ['MOCK_HEARING'] } as unknown as HearingData,
    });

    await controller.fetchAndSaveData(req);
    await new Promise(process.nextTick);
    expect(req.session.userCase.hearingCollection).toStrictEqual(['MOCK_HEARING']);
  });

  test('fetchAndSaveData should map existing hearing data in session', async () => {
    const controller = new CaseDataController([]);
    const req = mockRequest({
      session: {
        userCase: {
          id: '1234',
          hearingCollection: ['MOCK_HEARING'],
        },
        user: {
          id: '1234',
        },
      },
    });
    retrieveCaseAndHearingsMock.mockResolvedValue(req.session.userCase);

    await controller.fetchAndSaveData(req);
    expect(req.session.userCase.hearingCollection).toStrictEqual(['MOCK_HEARING']);
  });

  test('should throw error if userdetails and caseId not present', async () => {
    const req = mockRequest({ params: {}, session: { user: {}, userCase: {} } });
    const controller = new CaseDataController([]);
    await expect(controller.fetchAndSaveData(req)).rejects.toThrow(
      new Error('FetchCaseDataController: caseId or userDetails not present.')
    );
  });

  test('should catch and throw errors when retrieving case data', async () => {
    const req = mockRequest();
    retrieveCaseAndHearingsMock.mockRejectedValue({ status: '500' });
    const controller = new CaseDataController([]);

    await expect(controller.fetchAndSaveData(req)).rejects.toThrow(
      new Error('FetchCaseDataController: Data could not be retrieved.')
    );
  });

  test('getC100ApplicantCase', async () => {
    const controller = new CaseDataController([]);
    const req = mockRequest({
      session: {
        userCase: {
          id: '1234',
          hearingCollection: ['MOCK_HEARING'],
        },
        user: {
          id: '1234',
        },
      },
    });
    const res = mockResponse();
    retrieveCaseAndHearingsMock.mockResolvedValue(req.session.userCase);
    req.locals.C100Api.retrieveCaseById = jest.fn().mockResolvedValueOnce({
      caseTypeOfApplication: '123',
      c100RebuildChildPostCode: '',
      helpWithFeesReferenceNumber: '123',
      c100RebuildReturnUrl: 'abc',
    });

    await controller.getC100ApplicantCase(req, res);
    expect(res.redirect).toHaveBeenCalledWith(applyParms(PARTY_TASKLIST, { partyType: PartyType.APPLICANT }));
  });
  test('getC100ApplicantCase throw error', async () => {
    const controller = new CaseDataController([]);
    const req = mockRequest({
      session: {
        userCase: {
          id: '1234',
          hearingCollection: ['MOCK_HEARING'],
        },
        user: {
          id: '1234',
        },
      },
    });
    const res = mockResponse();
    retrieveCaseAndHearingsMock.mockResolvedValue(req.session.userCase);
    req.locals.C100Api.retrieveCaseById = jest.fn().mockRejectedValueOnce;

    await expect(controller.getC100ApplicantCase(req, res)).rejects.toThrow(
      'Error in retriving the case - getC100ApplicantCase'
    );
    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });
});
