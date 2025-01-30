import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { C1AAbuseTypes, RootContext } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import SafteyConcernsApplicantAbusePostController from './postController';

describe('SafteyConcernsApplicantAbusePostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/dummy',
        params: {
          abuseType: 'physicalAbuse',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigagte to the next page without any errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new SafteyConcernsApplicantAbusePostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      },
      body: {
        onlycontinue: true,
      },
      session: {
        lang: language,
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should delete seek help details when seek help from agency is no', async () => {
    const mockFormContent = {
      fields: {
        seekHelpDetails: 'test',
      },
    } as unknown as FormContent;
    const controller = new SafteyConcernsApplicantAbusePostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      },
      body: {
        onlycontinue: true,
        seekHelpFromPersonOrAgency: 'No',
      },
      session: {
        lang: language,
        userCase: {
          c1A_safteyConcerns: {
            applicant: {
              physicalAbuse: {
                seekHelpFromPersonOrAgency: 'Yes',
                seekHelpDetails: 'test',
              },
            },
          },
        },
      },
    });
    req.originalUrl = '/c100-rebuild/safety-concerns/yourself/report-abuse/physicalAbuse';
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual({
      c1A_safteyConcerns: {
        applicant: {
          physicalAbuse: {
            seekHelpFromPersonOrAgency: 'No',
          },
        },
      },
    });
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new SafteyConcernsApplicantAbusePostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      },
      body: {
        saveAndComeLater: true,
      },
      session: {
        lang: language,
      },
    });
    const res = mockResponse();
    (req.originalUrl = '/c100-rebuild/dummy'), generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
