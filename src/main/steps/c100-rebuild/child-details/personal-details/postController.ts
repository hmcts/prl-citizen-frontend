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

  public personalDetailsMapper(req: AppRequest): any {
    const isDateOfBirthKnown = req.body['isDopKnown'].length === 2 ? YesOrNo.YES : YesOrNo.NO;
    console.log(req.body);
    const dob = `${req.body['day']}/${req.body['month']}/${req.body['year']}`;
    const adob = `${req.body['apDateOfBirth-day']}/${req.body['apDateOfBirth-month']}/${req.body['apDateOfBirth-year']}`;
    const DateoBirth = isDateOfBirthKnown === 'No' ? dob : '';
    const Sex = req.body['childSex'];
    const ApproximateDateOfBirth = isDateOfBirthKnown === 'Yes' ? adob : '';

    return { DateoBirth, ApproximateDateOfBirth, Sex, isDateOfBirthKnown };
  }
}
