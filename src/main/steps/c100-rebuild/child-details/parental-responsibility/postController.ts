import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_CHILDERN_DETAILS_PERSONAL_DETAILS, C100_CHILDERN_FURTHER_INFORMATION } from '../../../urls';

@autobind
export default class ParentResponsibility extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);

    if (req.query.hasOwnProperty('childId')) {
      const { childId } = req.query;
      const currentChild = req.session.settings.ListOfChild.findIndex(childWithId => childWithId.id === childId);

      if (currentChild > -1) {
        req.session.settings.ListOfChild[currentChild].parentialResponsibility = {
          statement: req.body.parentalResponsibility,
        };
        if (currentChild + 1 >= req.session.settings.ListOfChild.length) {
          super.redirect(req, res, C100_CHILDERN_FURTHER_INFORMATION);
        } else {
          const nextChildId = req.session.settings['ListOfChild'][currentChild + 1];
          const redirectUrl = C100_CHILDERN_DETAILS_PERSONAL_DETAILS + `?childId=${nextChildId.id}`;
          super.redirect(req, res, redirectUrl);
        }
      } else {
        res.render('error');
      }
    } else {
      res.render('error');
    }
  }
}
