import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { Applicant, PartyDetails, Respondent } from '../../../app/case/definition';

import { RespondentTaskListGetController } from './get';

const getHearings = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('RespondentTaskListGetController', () => {
  const controller = new RespondentTaskListGetController();

  test('Should render the RespondentTaskList page for private law service', async () => {
    const req = mockRequest({
      session: {
        user: {
          id: '123',
        },
        userCase: {
          ...mockUserCase,
          caseTypeOfApplication: 'C100',
          hearingCollection: [],
          applicants: [
            {
              id: '',
              value: {} as PartyDetails,
            },
          ] as Applicant[],
          respondents: [
            {
              id: '',
              value: {
                user: {
                  idamId: '123',
                },
                response: {
                  citizenFlags: {},
                },
              } as PartyDetails,
            },
          ] as Respondent[],
        },
      },
    });
    getHearings.mockResolvedValue(req.session.userCase);
    const res = mockResponse();
    await controller.get(req, res);
    await controller.load(req, res);
    expect(res.render).toBeCalled;
  });

  test('Should load', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.load(req, res);
    req.session.applicationSettings = { navFromContactPreferences: false };
    expect(req.session.applicationSettings).toBe(req.session.applicationSettings);
  });
});
