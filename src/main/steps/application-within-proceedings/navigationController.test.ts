import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../../app/case/definition';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
  APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
} from '../urls';

import ApplicationWithinProceedingsNavigationController from './navigationController';

describe('applicationWithinProceedingsNavigationController', () => {
  let req;
  let userCase;

  beforeEach(() => {
    req = mockRequest({
      params: {
        applicationType: AWPApplicationType.C2,
        applicationReason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
      },
      session: {
        applicationSettings: {
          awpSelectedApplicationDetails: {
            applicationFee: '£0',
          },
        },
      },
    });
    userCase = {};
  });

  test('should get correct url for upload application when no selected', () => {
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        { awp_completedForm: YesOrNo.NO },
        req
      )
    ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/download-form');
  });
  test('should get correct url for upload application when c2 and delay cancel hearing date', () => {
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/select-hearing');
  });
  test('should get correct url for upload application when c2 and not delay cancel hearing date', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/C2/request-more-time/agreement-for-request');
  });
  test('should get correct url for upload application for free application', () => {
    req.params.applicationType = AWPApplicationType.EX740;
    req.params.applicationReason = AWPApplicationReason.YOU_ACCUSED_SOMEONE;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/document-upload');
  });
  test('should get correct url for upload application for paid application', () => {
    req.params.applicationType = AWPApplicationType.FP25;
    req.params.applicationReason = AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS;
    req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/help-with-fees');
  });
  describe('getUploadApplicationNextStep', () => {
    test('should get correct url for upload application when no selected', () => {
      expect(
        ApplicationWithinProceedingsNavigationController.getNextUrl(
          APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
          { awp_completedForm: YesOrNo.NO },
          req
        )
      ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/download-form');
    });

    test('should get correct url for upload application when c2 and delay cancel hearing date', () => {
      expect(
        ApplicationWithinProceedingsNavigationController.getNextUrl(
          APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
          userCase,
          req
        )
      ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application');
    });

    test('should get correct url for upload application when c2 and not delay cancel hearing date', () => {
      req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
      expect(
        ApplicationWithinProceedingsNavigationController.getNextUrl(
          APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
          userCase,
          req
        )
      ).toBe('/application-within-proceedings/C2/request-more-time/agreement-for-request');
    });

    test('should get correct url for upload application for free application', () => {
      req.params.applicationType = AWPApplicationType.EX740;
      req.params.applicationReason = AWPApplicationReason.YOU_ACCUSED_SOMEONE;
      expect(
        ApplicationWithinProceedingsNavigationController.getNextUrl(
          APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
          userCase,
          req
        )
      ).toBe('/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/document-upload');
    });

    test('should get correct url for upload application for paid application', () => {
      req.params.applicationType = AWPApplicationType.FP25;
      req.params.applicationReason = AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS;
      req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
      expect(
        ApplicationWithinProceedingsNavigationController.getNextUrl(
          APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
          userCase,
          req
        )
      ).toBe('/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/help-with-fees');
    });
  });

  test('should get correct url for upload application when c2 and delay cancel hearing date1', () => {
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/select-hearing');
  });

  test('should get correct url for upload application when c2 and not delay cancel hearing date-1', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/C2/request-more-time/agreement-for-request');
  });

  test('should get correct url for upload application for free application1', () => {
    req.params.applicationType = AWPApplicationType.EX740;
    req.params.applicationReason = AWPApplicationReason.YOU_ACCUSED_SOMEONE;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/document-upload');
  });

  test('should get correct url for upload application for paid application1', () => {
    req.params.applicationType = AWPApplicationType.FP25;
    req.params.applicationReason = AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS;
    req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/help-with-fees');
  });
  test('should get correct url for agreement for request for free delay or cancel hearing application', () => {
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload');
  });

  test('should get correct url for agreement for request for paid delay or cancel hearing application', () => {
    req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
        userCase,
        req
      )
    ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees');
  });
  test('should get correct url for agreement for request for other C2 application when yes selected', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
        { awp_agreementForRequest: YesOrNo.YES },
        req
      )
    ).toBe('/application-within-proceedings/C2/request-more-time/help-with-fees');
  });
  test('should get correct url for agreement for request for other C2 application when no selected', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
        { awp_agreementForRequest: YesOrNo.NO },
        req
      )
    ).toBe('/application-within-proceedings/C2/request-more-time/inform-other-parties');
  });
  test('should get correct url for supporting documents for delay cancel hearing date when yes selected', () => {
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
        { awp_hasSupportingDocuments: YesOrNo.YES },
        req
      )
    ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/supporting-document-upload');
  });
  test('should get correct url for supporting documents for delay cancel hearing date when no selected', () => {
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
        { awp_hasSupportingDocuments: YesOrNo.NO },
        req
      )
    ).toBe('/application-within-proceedings/C2/delay-or-cancel-hearing-date/supporting-documents');
  });

  test('should get correct url for supporting documents for other application reason when yes selected', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
        { awp_hasSupportingDocuments: YesOrNo.YES },
        req
      )
    ).toBe('/application-within-proceedings/C2/request-more-time/supporting-document-upload');
  });

  test('should get correct url for supporting documents for other application reason when no selected', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
        { awp_hasSupportingDocuments: YesOrNo.NO },
        req
      )
    ).toBe('/application-within-proceedings/C2/request-more-time/urgent-request');
  });

  test('redirects to same page in other cases', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        '/application-within-proceedings/C2/request-more-time/help-with-fees',
        {},
        req
      )
    ).toBe('/application-within-proceedings/C2/request-more-time/help-with-fees');
  });
});
