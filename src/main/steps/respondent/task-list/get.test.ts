import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { Applicant, PartyDetails, Respondent } from '../../../app/case/definition';

import { RespondentTaskListGetController } from './get';

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
              } as PartyDetails,
            },
          ] as Respondent[],
        },
      },
    });
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalled;
  });
});
