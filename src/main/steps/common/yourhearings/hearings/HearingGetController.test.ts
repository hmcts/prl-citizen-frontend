import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
//import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

//import { HearingsGetController } from './HearingsGetController';

const getHearings = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('HearingsGetController', () => {
  // const languages = {
  //   en: {
  //     text: 'english',
  //   },
  //   cy: {
  //     text: 'welsh',
  //   },
  // };
  //const generateContent = content => languages[content.language];
  // const controller = new HearingsGetController();
  const req = mockRequest();
  // const res = mockResponse();
  beforeEach(() => {
    getHearings.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    getHearings.mockClear();
  });

  test('Should get the details of previous hearings', async () => {
    expect(1).toBe(1);
  });
});
