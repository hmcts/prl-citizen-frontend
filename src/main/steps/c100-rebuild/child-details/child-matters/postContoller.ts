import autobind from 'autobind-decorator';
import { Response } from 'express';
import { isArray } from 'lodash';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_children_DETAILS_CHILD_MATTERS, C100_children_DETAILS_PARENTIAL_RESPONSIBILITY } from '../../../urls';

@autobind
export default class AddchildrenMatter extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const saveAndComeLater = req.body.saveAndComeLater !== undefined && req.body.saveAndComeLater === 'true';
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    if (req.query.hasOwnProperty('childId') && req.session.userCase.children) {
      const { childId } = req.query;
      const matchChildIndex = req.session.userCase.children.findIndex(child => child.id === childId);
      if (matchChildIndex > -1) {
        if (req.body['isDecisionTaken'] === undefined) {
          req.session.errors.push({
            propertyName: 'isDecisionTaken',
            errorType: 'required',
          });
          req.session.userCase.children[matchChildIndex].childMatter = {
            isDecisionTaken: YesOrNo.NO,
          };
          if (saveAndComeLater) {
            return super.saveAndComeLater(req, res, req.session.userCase);
          }
          const redirectUrl = C100_children_DETAILS_CHILD_MATTERS + `?childId=${childId}`;
          return super.redirect(req, res, redirectUrl);
        } else {
          const isDecisionTaken = isArray(req.body.isDecisionTaken)
            ? req.body.isDecisionTaken.some(val => val === YesOrNo.YES)
              ? YesOrNo.YES
              : ''
            : '';
          req.session.userCase.children[matchChildIndex].childMatter = {
            isDecisionTaken,
          };
          if (saveAndComeLater) {
            return super.saveAndComeLater(req, res, req.session.userCase);
          }
          const redirectUrl = C100_children_DETAILS_PARENTIAL_RESPONSIBILITY + `?childId=${childId}`;
          return super.redirect(req, res, redirectUrl);
        }
      } else {
        res.render('error');
      }
    } else {
      if (req.session.userCase.children) {
        const redirectURI = `parental-responsibility?childId=${req.session.userCase.children[0].id}`;
        return super.redirect(req, res, redirectURI);
      }
    }
  }
}
