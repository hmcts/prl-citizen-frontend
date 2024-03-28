import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { CosApiClient } from '../../app/case/CosApiClient';

import CaseDataController from './CaseDataController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
const retrieveCaseHearingsByCaseIddMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('common > CaseDataController', () => {
  test('fetchAndSaveData should get case hearings and map in session', async () => {
    const controller = new CaseDataController();
    const req = mockRequest();
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    retrieveCaseHearingsByCaseIddMock.mockResolvedValue({ caseHearings: ['MOCK_HEARING'] });

    await controller.fetchAndSaveData(req);
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
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);

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
    retrieveByCaseIdMock.mockRejectedValue({ status: '500' });
    const controller = new CaseDataController([]);
    await expect(controller.fetchAndSaveData(req)).rejects.toThrow(
      new Error('FetchCaseDataController: Data could not be retrieved.')
    );
  });
});
