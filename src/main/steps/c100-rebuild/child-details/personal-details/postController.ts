/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_CHILDERN_DETAILS_CHILD_MATTERS, C100_CHILDERN_DETAILS_PERSONAL_DETAILS } from '../../../urls';

@autobind
export default class Personaldetails extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  /**
   * It takes the form data from the request body, validates it, and then saves it to the session
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - this is the response object that will be used to send the
   * response back to the user.
   */

  /***
   * 
   * 'child-dateOfBirth-day': '',
[0]   'child-dateOfBirth-month': '',
[0]   'child-dateOfBirth-year': '',
[0]   'child-approx-dateOfBirth-day': '',
[0]   'child-approx-dateOfBirth-month': '',
[0]   'child-approx-dateOfBirth-year': ''
   */

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    console.log(req.body);
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    const { childId } = req.query;
    if (!this.childSexValidation(req) || this.childDateValidations(req)) {
      if (!this.childSexValidation(req)) {
        req.session.errors.push({
          propertyName: 'childSex',
          errorType: 'required',
        });
      }
      if (this.childDateValidations(req)) {
        req.session.errors.push({
          propertyName: 'childDateOfBirth',
          errorType: 'required',
        });
      }
      const redirectUrl = C100_CHILDERN_DETAILS_PERSONAL_DETAILS + `?childId=${childId}`;
      super.redirect(req, res, redirectUrl);
    } else {
      this.proceedWithoutError(req, res);
    }
  }

  public proceedWithoutError(req: AppRequest, res: Response): any {
    const { childId } = req.query;
    if (req.query.hasOwnProperty('childId')) {
      const checkIfChildIdMatches = req.session.settings.ListOfChild.filter(child => child.id === childId).length > 0;
      if (checkIfChildIdMatches) {
        const matchChildIndex = req.session.settings.ListOfChild.findIndex(child => child.id === childId);
        req.session.settings.ListOfChild[matchChildIndex].personalDetails = this.personalDetailsMapper(req);
        const redirectUrl = C100_CHILDERN_DETAILS_CHILD_MATTERS + `?childId=${childId}`;
        super.redirect(req, res, redirectUrl);
      } else {
        res.render('error');
      }
    } else {
      // eslint-disable-next-line no-self-assign
      req.session.settings.ListOfChild = req.session.settings.ListOfChild;
      const redirectURI = `personal-details?childId=${req.session.settings.ListOfChild[0].id}`;
      super.redirect(req, res, redirectURI);
    }
  }

  public childSexValidation(req: AppRequest): boolean {
    if (req.body['Sex'] === undefined) {
      return false;
    } else {
      return true;
    }
  }

  public childDateValidations(req: AppRequest): boolean {
    if (
      req.body['child-dateOfBirth-day'] === '' ||
      req.body['child-dateOfBirth-month'] === '' ||
      req.body['child-dateOfBirth-year'] === ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * It takes a request object and returns an object with the same properties as the request object,
   * but with the values mapped to the correct property names
   * @param {AppRequest} req - AppRequest - this is the request object that is passed to the mapper
   * function.
   */
  public personalDetailsMapper(req: AppRequest): any {
    const DateoBirth = `${req.body['child-dateOfBirth-day']}/${req.body['child-dateOfBirth-month']}/${req.body['child-dateOfBirth-year']}`;
    const ApproximateDateOfBirth = `${req.body['child-approx-dateOfBirth-day']}/${req.body['child-approx-dateOfBirth-month']}/${req.body['child-approx-dateOfBirth-year']}`;
    const Sex = req.body['Sex'];
    const isDateOfBirthKnown = req.body['steps_children_personal_details'] !== undefined ? YesOrNo.YES : YesOrNo.NO;
    if (isDateOfBirthKnown === YesOrNo.NO) {
      return { DateoBirth, Sex, isDateOfBirthKnown, ApproximateDateOfBirth: undefined };
    } else {
      return { DateoBirth, ApproximateDateOfBirth, Sex, isDateOfBirthKnown };
    }
  }
}
