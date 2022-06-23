import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../../../common/common.content';
import ApplicantConfirmContactDetailsGetController from '../checkanswers/ApplicantConfirmContactDetailsGetController';

import { generateContent } from './content';

describe('ApplicantConfirmContactDetailsGetController', () => {
  const controller = new ApplicantConfirmContactDetailsGetController();

  test('Should render the Applicant Confirm Contact Details page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const language = 'en';

    expect(res.render).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userEmail: 'test@example.com',
          userCase: req.session.userCase,
        }),
        ...defaultViewArgs,
      })
    );
  });

  test('Should render the Applicant Confirm Contact Details page with confidential data case1', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.contactDetailsPrivate = ['address', 'email'];

    await controller.get(req, res);
    const language = 'en';

    expect(res.render).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userEmail: 'test@example.com',
          userCase: req.session.userCase,
        }),
        ...defaultViewArgs,
      })
    );
  });

  ///

  test('Should render the Applicant Confirm Contact Details page with confidential data case2', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'No';
    req.session.userCase.contactDetailsPrivate = [];

    await controller.get(req, res);
    const language = 'en';

    expect(res.render).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userEmail: 'test@example.com',
          userCase: req.session.userCase,
        }),
        ...defaultViewArgs,
      })
    );
  });

  //////

  test('Should render the Applicant Confirm Contact Details page with confidential data case3', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.session.userCase.detailsKnown = 'No';
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.contactDetailsPrivate = ['address', 'email'];

    await controller.get(req, res);
    const language = 'en';

    expect(res.render).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userEmail: 'test@example.com',
          userCase: req.session.userCase,
        }),
        ...defaultViewArgs,
      })
    );
  });
  ////

  test('Should render the Applicant Confirm Contact Details page with confidential data case4', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.session.userCase.detailsKnown = 'No';
    req.session.userCase.startAlternative = 'No';
    req.session.userCase.contactDetailsPrivate = [];

    await controller.get(req, res);
    const language = 'en';

    expect(res.render).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userEmail: 'test@example.com',
          userCase: req.session.userCase,
        }),
        ...defaultViewArgs,
      })
    );
  });
});
