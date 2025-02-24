import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { FieldPrefix } from '../../../app/case/case';
import { PaymentErrorContext, PaymentStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { FormError } from '../../../app/form/Form';
import { doesCaseHaveId } from '../../../steps/common/task-list/utils';
import { isC100ApplicationValid } from '../../c100-rebuild/utils';
import { MandatoryFieldsConfig } from '../validation/definitions';
import { getAllMandatoryFields } from '../validation/util';

import {
  generateConcernAboutChildErrors,
  generateOtherProceedingDocErrors,
  generatePeopleErrors,
  prepareProp,
} from './mainUtil';

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
      if (doesCaseHaveId(req.session.userCase)) {
        await req.locals.C100Api.saveC100DraftApplication(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          req.session.userCase?.caseId as string,
          req.session.userCase,
          returnUrl,
          req.session.applicationSettings
        );
      }
      //clear payment error
      setTimeout(() => {
        req.session.paymentError = { hasError: false, errorContext: null };
        req.session.save();
      }, 1000);

      const mandatoryFields: MandatoryFieldsConfig[] = getAllMandatoryFields(req.session.userCase, false);
      const mandetoryFieldname: string[] = [];
      mandatoryFields.forEach(field => {
        if (field.fieldName === 'sq_permissionsWhy') {
          req.session.userCase.sq_permissionsWhy?.forEach(subField => {
            mandetoryFieldname.push(`sq_${subField}_subfield`);
          });
        } else if (field.fieldName === 'miam_domesticAbuse') {
          mandetoryFieldname.push(field.fieldName);
          req.session.userCase.miam_domesticAbuse?.forEach(subField => {
            if (_.isArray(req.session.userCase[`miam_domesticAbuse_${subField}_subfields`])) {
              mandetoryFieldname.push(`miam_domesticAbuse_${subField}_subfields`);
            }
          });
        } else {
          mandetoryFieldname.push(field.fieldName);
        }
      });

      const missingObject = mandetoryFieldname.filter(value => {
        if (value.includes('miam_domesticAbuse_')) {
          return !req.session.userCase[value].some(subSubField => !_.isEmpty(subSubField));
        } else if (value.includes('too_stopOtherPeopleDoingSomethingSubField')) {
          return !req.session.userCase.too_stopOtherPeopleDoingSomethingSubField?.some(
            subField => !_.isEmpty(subField)
          );
        }
        return _.isEmpty(req.session.userCase[value]);
      });
      req.session.errors = [];
      const generalErrors: FormError[] = [];
      if (missingObject.length) {
        missingObject.forEach(property => {
          if (property && !generalErrors.map(i => i.propertyName).includes(prepareProp(property))) {
            generalErrors.push({
              propertyName: prepareProp(property),
              errorType: 'required',
            });
          }
        });
      }

      req.session.errors?.push(
        ...generalErrors,
        ...generatePeopleErrors(req.session.userCase),
        ...generateOtherProceedingDocErrors(req.session.userCase.op_otherProceedings?.order),
        ...generateConcernAboutChildErrors(
          req.session.userCase.c1A_concernAboutChild,
          req.session.userCase.c1A_safteyConcerns
        )
      );

      req.session.save(() => {
        super.get(req, res);
      });
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
