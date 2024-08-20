/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AWPApplicationReason, AWPApplicationType, PaymentErrorContext } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { handleErrorAndRedirect, paymentAPIInstance } from '../checkanswers/postController';

@autobind
export default class AWPPayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(appRequest: AppRequest<AnyObject>, appResponse: Response): Promise<void> {
    const userDetails = appRequest.session.user;
    const caseData = appRequest.session.userCase;
    const applicationType = appRequest.params.applicationType as AWPApplicationType;
    const applicationReason = appRequest.params.applicationReason as AWPApplicationReason;

    try {
      appRequest.session.paymentError = { hasError: false, errorContext: null };
      return await paymentAPIInstance(
        userDetails,
        appRequest,
        applicationType,
        applicationReason,
        caseData,
        appResponse
      );
    } catch (error) {
      appRequest.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.DEFAULT_PAYMENT_ERROR };
      handleErrorAndRedirect(applicationType, applicationReason, appRequest, appResponse);
    }
  }
}
