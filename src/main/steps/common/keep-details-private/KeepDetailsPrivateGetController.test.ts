import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { KeepDetailsPrivateGetController } from './KeepDetailsPrivateGetController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;

describe('KeepDetailsPrivateGetController', () => {
  // const languages = {
  //   en: {
  //     text: 'english',
  //   },
  //   cy: {
  //     text: 'welsh',
  //   },
  // };
  //const generateContent = content => languages[content.language];
  const controller = new KeepDetailsPrivateGetController();
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Sonali',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: '',
        },
      },
    ];
    req.session.userCase.startAlternative = '';
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });

  test('Should not get KeepDetailsPrivate if user id not matches with respondent idamId for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).not.toEqual('Yes');
  });

  test('Should not get KeepDetailsPrivate if user id matches with respondent but there is no response for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).not.toEqual('Yes');
  });

  test('Should not get KeepDetailsPrivate if user id matches with respondent but there is no consent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    const response = {
      legalRepresentation: 'No',
    };
    partyDetails[0].value.response = response;
    req.session.userCase.respondents = partyDetails;
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).not.toEqual('Yes');
  });

  test('Should not get KeepDetailsPrivate if user id matches with respondent but there is no consentToTheApplication for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: '',
    };
    partyDetails[0].value.response = response;
    req.session.userCase.respondents = partyDetails;
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).not.toEqual('Yes');
  });

  test('Should get KeepDetailsPrivate if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        confidentiality: 'Yes',
      },
    };
    partyDetails[0].value.response = response;
    req.session.userCase.respondents = partyDetails;
    req.url = 'respondent';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('Yes');
  });

  test('Should not get KeepDetailsPrivate if user id not matches with respondent idamId for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.url = 'respondent';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should not get KeepDetailsPrivate if user id matches with respondent but there is no response for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should not get KeepDetailsPrivate if user id matches with respondent but there is no consent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    const response = {
      legalRepresentation: 'No',
    };
    partyDetails[0].value.response = response;
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should not get KeepDetailsPrivate if user id matches with respondent but there is no consentToTheApplication for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: '',
    };
    partyDetails[0].value.response = response;
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should get KeepDetailsPrivate if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        confidentiality: 'Yes',
      },
    };
    partyDetails[0].value.response = response;
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.url = 'respondent';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('Yes');
  });

  test('Should not get KeepDetailsPrivate if user id not matches with applicant idamId for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = partyDetails;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).not.toEqual('Yes');
  });

  test('Should not get KeepDetailsPrivate if user id matches with applicant but there is no response for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = partyDetails;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).not.toEqual('Yes');
  });
});

describe('KeepDetailsPrivateGetController test', () => {
  // const languages = {
  //   en: {
  //     text: 'english',
  //   },
  //   cy: {
  //     text: 'welsh',
  //   },
  // };
  //const generateContent = content => languages[content.language];
  const controller = new KeepDetailsPrivateGetController();
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Sonali',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: '',
        },
      },
    ];
    req.session.userCase.startAlternative = '';
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });

  test('Should get KeepDetailsPrivate if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        confidentiality: 'Yes',
      },
    };
    partyDetails[0].value.response = response;
    req.session.userCase.applicants = partyDetails;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('Yes');
  });

  test('Should not get KeepDetailsPrivate if user id not matches with applicant idamId for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should not get KeepDetailsPrivate if user id matches with applicant but there is no response for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should not get KeepDetailsPrivate if user id matches with applicant but there is no consent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    const response = {
      legalRepresentation: 'No',
    };
    partyDetails[0].value.response = response;
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should not get KeepDetailsPrivate if user id matches with applicant but there is no consentToTheApplication for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: '',
    };
    partyDetails[0].value.response = response;
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('');
  });

  test('Should get KeepDetailsPrivate if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        confidentiality: 'Yes',
      },
    };
    partyDetails[0].value.response = response;
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.startAlternative).toEqual('Yes');
  });
});
