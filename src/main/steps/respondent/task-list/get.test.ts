import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../../app/case/case';
import { Applicant, PartyDetails, Respondent } from '../../../app/case/definition';

import { RespondentTaskListGetController } from './get';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('RespondentTaskListGetController', () => {
  const controller = new RespondentTaskListGetController();
  let caseHearingData;
  let req;

  beforeEach(() => {
    req = mockRequest({
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
    caseHearingData = {
      hmctsServiceCode: 'MOCK_CODE',
      caseRef: 'MOCK_REF',
      caseHearings: [
        {
          hearingID: 1,
        },
      ],
    };
  });

  test('Should render the RespondentTaskList page for private law service', async () => {
    mockedAxios.post.mockReturnValueOnce({ data: caseHearingData } as unknown as Promise<CaseWithId>);
    const res = mockResponse();
    await controller.load(req, res);
    expect(req.session.userCase.hearingCollection).toStrictEqual(caseHearingData.caseHearings);
    expect(req.session.applicationSettings.navfromRespondToApplication).toBe(false);
    expect(req.session.save).toHaveBeenCalled();
  });

  test('Errors when retrieving hearings should be caught and thrown', async () => {
    mockedAxios.post.mockRejectedValueOnce;
    const res = mockResponse();
    let flag;

    try {
      await controller.load(req, res);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });
});
