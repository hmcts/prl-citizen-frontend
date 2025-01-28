import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { FieldPrefix } from '../../../app/case/case';
import { PaymentErrorContext, PaymentStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { isC100ApplicationValid } from '../../c100-rebuild/utils';
import { MandatoryFieldsConfig } from '../validation/definitions';
import { getAllMandatoryFieldsWithoutPeopleSection } from '../validation/util';
import { generateApplicantErrors, generateChildErrors, generateOtherChildrenError, generateOtherPersonErrors, generateRespondentErrors } from './mainUtil';
import { doesAnyChildLiveWithOtherPerson } from '../other-person-details/utils';

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
        returnUrl
      );

      //clear payment error
      setTimeout(() => {
        req.session.paymentError = { hasError: false, errorContext: null };
        req.session.save();
      }, 1000);

      const mandatoryFields: MandatoryFieldsConfig[] = getAllMandatoryFieldsWithoutPeopleSection(req.session.userCase);
      const mandetoryFieldname: string[] = [];
      mandatoryFields.forEach(field => mandetoryFieldname.push(field.fieldName));

      const missingObject = mandetoryFieldname.filter(value => _.isEmpty(req.session.userCase[value]));
      req.session.errors = [];
      const generalErrors: { propertyName: string; errorType: string; }[] = [];
      if (missingObject.length) {
        missingObject.forEach(property => {
          if (property) {
            generalErrors.push({
            generalErrors.push({
              propertyName: property,
              errorType: 'required',
            });
          }
        });

      }

      const applicantErrors: { propertyName: string; errorType: string; }[] = [];
      const respondentErrors: { propertyName: string; errorType: string; }[] = [];
      const childErrors: { propertyName: string; errorType: string; }[] = [];
      const otherChildErrors: { propertyName: string; errorType: string; }[] = [];
      const otherPersonErrors: { propertyName: string; errorType: string; }[] = [];

      // applicant
      req.session.userCase?.appl_allApplicants?.forEach((applicant, index) => {
        applicantErrors.push(...generateApplicantErrors(applicant, index));
      });
      // child
      req.session.userCase?.cd_children?.forEach((child, index) => {
        childErrors.push(...generateChildErrors(child, index));
      });
      // respondent
      req.session.userCase?.resp_Respondents?.forEach((respondent, index) => {
        respondentErrors.push(...generateRespondentErrors(respondent, index));
      });
      // otherchildren
      if(_.isEmpty(req.session.userCase?.ocd_hasOtherChildren)){
        generalErrors.push({
              propertyName: `ocd_hasOtherChildren`,
              errorType: 'required',
          });
      }
      
      if (req.session.userCase?.ocd_hasOtherChildren === "Yes") {
          req.session.userCase?.ocd_otherChildren?.forEach((otherchildren, index) => {
            otherChildErrors.concat(generateOtherChildrenError(otherchildren, index));
          })
      }
      //otherPerson
     if( _.isEmpty(req.session.userCase?.oprs_otherPersonCheck)){
      generalErrors.push({
              propertyName: `oprs_otherPersonCheck`,
              errorType: 'required',
          });
      }
      if (req.session.userCase?.oprs_otherPersonCheck === "Yes") {
      
          req.session.userCase?.oprs_otherPersons?.forEach((otherperson, index) => {
            const isAnyChildliveWithOtherPerson=doesAnyChildLiveWithOtherPerson(req.session.userCase, otherperson.id)
            otherPersonErrors.concat(generateOtherPersonErrors(otherperson, index,isAnyChildliveWithOtherPerson));
          })
      }

      // TODO Vivek, One error is fine or multiple error is fine--- readability purpose


      req.session.errors?.push(
        ...generalErrors,
        ...applicantErrors,
        ...respondentErrors,
        ...childErrors,
        ...otherChildErrors,
        ...otherPersonErrors
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

