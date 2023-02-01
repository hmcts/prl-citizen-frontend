import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { ProceedingGetController } from './ProceedingGetController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let respondents;

describe('ProceedingGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };

  const generateContent = content => languages[content.language];
  const proceedingGetController = new ProceedingGetController('page', generateContent);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Test1234',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: '',
        },
      },
    ];
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });

  test('Should not get Proceeding details if user id not matches with respondent idamId', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';

    req.session.userCase.respondents = respondents;
    await proceedingGetController.get(req, res);
    expect(req.session.userCase.currentOrPreviousProceedings).not.toEqual('Yes');
  });

  test('Should not get Proceeding if user id matches with respondent but there is no consent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      legalRepresentation: 'Yes',
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await proceedingGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should not get proceeding if user id matches with respondent but there is no proceeding response details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      currentOrPreviousProceedings: {},
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await proceedingGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should get proceeding if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await proceedingGetController.get(req, res);
    expect(req.session.userCase.proceedingsStart).toEqual('No');
    expect(req.session.userCase.proceedingsStartOrder).toEqual('Yes');
  });

  test('Should get proceeding if user id matches with respondent1', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await proceedingGetController.get(req, res);
    expect(req.session.userCase.proceedingsStart).toEqual('No');
    expect(req.session.userCase.proceedingsStartOrder).toEqual('Yes');
  });

  test('Should get proceeding if user id matches with respondent2', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await proceedingGetController.get(req, res);
    expect(req.session.userCase.proceedingsStart).toEqual('No');
    expect(req.session.userCase.proceedingsStartOrder).toEqual('Yes');
  });
});
