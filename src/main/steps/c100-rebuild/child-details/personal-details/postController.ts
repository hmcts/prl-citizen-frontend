/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_CHILDERN_DETAILS_CHILD_MATTERS } from '../../../urls';

@autobind
export default class Personaldetails extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    console.log(req.body);
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);

    if (req.query.hasOwnProperty('childId')) {
      const { childId } = req.query;
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

  /**
   * It takes a request object and returns an object with the same properties as the request object,
   * but with the values mapped to the correct property names
   * @param {AppRequest} req - AppRequest - this is the request object that is passed to the mapper
   * function.
   */
  public personalDetailsMapper(req: AppRequest): any {
    console.log(req.body);
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
