/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';

// eslint-disable-next-line import/namespace
import { Case } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import {
  C100_children_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_children_DETAILS_PERSONAL_DETAILS,
  C100_children_FURTHER_INFORMATION,
} from '../../../urls';

@autobind
export default class ParentResponsibility extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    this.errorsAndRedirect(req, res, formData, form);

    if (req.query.hasOwnProperty('childId') && req.session.userCase.children) {
      const { childId } = req.query;
      const currentChild = req.session.userCase.children.findIndex(childWithId => childWithId.id === childId);
      if (currentChild > -1) {
        req.session.userCase.children[currentChild].parentialResponsibility = {
          statement: req.body.parentalResponsibility,
        };
        if (currentChild + 1 >= req.session.userCase.children.length) {
          super.redirect(req, res, C100_children_FURTHER_INFORMATION);
        } else {
          const nextChildId = req.session.userCase['children'][currentChild + 1];
          const redirectUrl = C100_children_DETAILS_PERSONAL_DETAILS + `?childId=${nextChildId.id}`;
          super.redirect(req, res, redirectUrl);
        }
      } else {
        res.render('error');
      }
    } else {
      res.render('error');
    }
  }
  public errorsAndRedirect(req: AppRequest<AnyObject>, res: Response, formData: Partial<Case>, form: Form) {
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length) {
      const { childId } = req.query;
      const currentChild = req.session.userCase.children
        ? req.session.userCase.children.findIndex(childWithId => childWithId.id === childId)
        : 0;
      if (req.session.userCase.children) {
        req.session.userCase.children[currentChild].parentialResponsibility = {
          statement: '',
        };
      }
      const redirectUri = C100_children_DETAILS_PARENTIAL_RESPONSIBILITY + `?childId=${childId}`;
      return super.redirect(req, res, redirectUri);
    }
  }
}
