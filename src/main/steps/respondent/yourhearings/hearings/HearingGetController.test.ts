import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import HearingsGetController from './HearingsGetController';

const retrieveCaseHearingsByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('HearingsGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  const generateContent = content => languages[content.language];
  const controller = new HearingsGetController('page', generateContent);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    retrieveCaseHearingsByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveCaseHearingsByCaseIdMock.mockClear();
  });

  test('Should get the details of previous hearings', async () => {
    req.session.user.id = '1c18b130-3fcb-4ca8-a910-1f001bac09q1';
    req.session.userCase.caseTypeOfApplication = 'C100';
    await controller.get(req, res);
    expect(req.session.userCase.hearingCollection).not.toEqual(null);
  });
});
