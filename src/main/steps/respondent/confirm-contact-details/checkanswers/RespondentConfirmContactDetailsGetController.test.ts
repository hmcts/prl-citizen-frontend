import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../../../common/common.content';
//import { AppRequest } from '../../../../app/controller/AppRequest';
//import { Response } from 'express';
import { generateContent } from './content';
//import { GetController } from '../../../../app/controller/GetController';
import RespondentConfirmContactDetailsGetController from '../checkanswers/RespondentConfirmContactDetailsGetController';
//const expectedValue = '<span class="govuk-error-message">Complete this section</span>';
describe('RespondentConfirmContactDetailsGetController', () => {
  const controller = new RespondentConfirmContactDetailsGetController();

  test('Should render the Respondent Confirm Contact Details page', async () => {
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
      expect(req.session.userCase.applicant1FullName).toBeNaN
    // expect(req.session.userCase.applicant1EmailAddress).toContain('Complete this section');
    // expect(req.session.userCase.applicant1PhoneNumber).toContain('Complete this section');
    // expect(req.session.userCase.applicant1PlaceOfBirthText).toContain('Complete this section');
  });
});


