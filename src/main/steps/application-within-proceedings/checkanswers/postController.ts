/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PaymentAPI, PaymentResponse } from '../../../modules/payments/paymentController';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../steps/tasklistresponse/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER } from '../../../steps/urls';
import { saveAWPApplication } from '../utils';

@autobind
export default class AWPCheckAnswersPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(appRequest: AppRequest<AnyObject>, appResponse: Response): Promise<void> {
    const userDetails = appRequest.session.user;
    const caseData = appRequest.session.userCase;
    const applicationType = appRequest.params.applicationType as AWPApplicationType;
    const applicationReason = appRequest.params.applicationReason as AWPApplicationReason;
    const {
      awp_need_hwf: needHWF,
      awp_have_hwfReference: hasHWFRefrence,
      awp_hwf_referenceNumber: hwfRefNumber,
    } = caseData;

    try {
      appRequest.session.paymentError = false;

      if (needHWF === YesOrNo.YES && hasHWFRefrence === YesOrNo.YES && hwfRefNumber) {
        const { id: caseId, awpFeeDetails } = caseData;
        const partyName = getPartyDetails(caseData, userDetails.id);
        const paymentAPI = await PaymentAPI(userDetails.accessToken, appRequest.locals.logger);

        return paymentAPI
          .initiatePayment({
            caseId,
            returnUrl: `${appRequest.protocol}://${appRequest.headers.host}/payment-callback/awp/${applicationType}/${applicationReason}`,
            applicantCaseName: `${partyName!}-${applicationType}`,
            hwfRefNumber,
            feeType: awpFeeDetails!.feeType,
            awpType: applicationType,
            partyType: getCasePartyType(caseData, userDetails.id),
          })
          .then(
            ({ response, redirectUrl }) => {
              appRequest.session.userCase.paymentData = response as PaymentResponse;
              appRequest.session.save(() => {
                if (redirectUrl) {
                  appResponse.redirect(redirectUrl);
                } else {
                  saveAWPApplication(appRequest, appResponse);
                }
              });
            },
            () => {
              appRequest.session.paymentError = true;
              appRequest.session.save(() => {
                appResponse.redirect(
                  applyParms(APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER, { applicationType, applicationReason })
                );
              });
            }
          );
      }

      appRequest.session.save(() => {
        super.redirect(appRequest, appResponse);
      });
    } catch (error) {
      appResponse.redirect(
        applyParms(APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER, { applicationType, applicationReason })
      );
    }
  }
}
