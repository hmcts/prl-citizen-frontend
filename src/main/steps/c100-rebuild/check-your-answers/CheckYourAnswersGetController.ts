import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { FieldPrefix } from '../../../app/case/case';
import { PaymentErrorContext, PaymentStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { doesAnyChildLiveWithOtherPerson } from '../../c100-rebuild/other-person-details/utils';
import { isC100ApplicationValid } from '../../c100-rebuild/utils';

import { isMandatoryFieldsFilled } from './mainUtil';

@autobind
export default class CheckYourAnswersGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    //Clear hwfRefNumber if not opted
    let returnUrl = req.originalUrl;
    if (req.session.userCase.hwf_needHelpWithFees === YesOrNo.NO) {
      req.session.userCase.helpWithFeesReferenceNumber = undefined;
      req.session.save();
    }
    if (isC100ApplicationValid(req.session.userCase, req)) {
      returnUrl = returnUrl.includes('?lng')
        ? `${returnUrl}&validApplication=true`
        : `${returnUrl}?validApplication=true`;
      req.session.applicationSettings = {
        ...req.session.applicationSettings,
        hasC100ApplicationBeenCompleted: true,
      };
    }
    try {
      await req.locals.C100Api.saveC100DraftApplication(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        req.session.userCase?.caseId as string,
        req.session.userCase,
        returnUrl,
        req.session.applicationSettings
      );

      //clear payment error
      setTimeout(() => {
        req.session.paymentError = { hasError: false, errorContext: null };
        req.session.save();
      }, 1000);
      if (!isMandatoryFieldsFilled(req.session.userCase)) {
        req.session.errors = [];
        req.session.userCase?.appl_allApplicants?.forEach(applicant => {
          if (applicant.liveInRefuge === YesOrNo.YES && _.isEmpty(applicant.refugeConfidentialityC8Form)) {
            req.session.errors?.push({
              propertyName: `c8RefugeDocument-applicant-${req.session.userCase?.appl_allApplicants?.indexOf(
                applicant
              )}`,
              errorType: 'required',
            });
          }
        });

        req.session.userCase?.oprs_otherPersons?.forEach(otherPerson => {
          if (otherPerson.liveInRefuge === YesOrNo.YES && _.isEmpty(otherPerson.refugeConfidentialityC8Form)) {
            req.session.errors?.push({
              propertyName: `c8RefugeDocument-otherPerson-${req.session.userCase?.oprs_otherPersons?.indexOf(
                otherPerson
              )}`,
              errorType: 'required',
            });
          }
        });

        req.session.userCase?.oprs_otherPersons?.forEach(otherPerson => {
          if (
            doesAnyChildLiveWithOtherPerson(req.session.userCase, otherPerson.id) &&
            _.isEmpty(otherPerson.isOtherPersonAddressConfidential)
          ) {
            req.session.errors?.push({
              propertyName: `otherPersonConfidentiality-otherPerson-${req.session.userCase?.oprs_otherPersons?.indexOf(
                otherPerson
              )}`,
              errorType: 'required',
            });
          }
        });

        req.session.save(() => {
          super.get(req, res);
        });
      } else {
        super.get(req, res);
      }
    } catch (error) {
      req.locals.logger.error('error in update case', error);

      if (req.session.paymentError.hasError === false) {
        req.session.paymentError =
          req.session.userCase.paymentSuccessDetails?.status === PaymentStatus.SUCCESS
            ? { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED }
            : { hasError: true, errorContext: PaymentErrorContext.DEFAULT_PAYMENT_ERROR };
        req.session.save(() => {
          super.get(req, res);
        });
      } else {
        super.get(req, res);
      }
    }
  }
}
