import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import HearingsApplicantGetController from './HearingsApplicantGetController';

const retrieveCaseHearingsByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('HearingsApplicantGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  const generateContent = content => languages[content.language];
  const controller = new HearingsApplicantGetController('page', generateContent);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    retrieveCaseHearingsByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveCaseHearingsByCaseIdMock.mockClear();
  });

  test('Should get the details of previous hearings', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'C100';
    await controller.get(req, res);
    expect(req.session.userCase.hearingCollection).not.toEqual(null);
  });
});
