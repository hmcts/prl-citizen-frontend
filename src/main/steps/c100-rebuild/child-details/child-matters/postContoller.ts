import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY } from '../../../urls';

@autobind
export default class AddChildernMatter extends PostController<AnyObject> {
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
      const matchChildIndex = req.session.settings.ListOfChild.findIndex(child => child.id === childId);
      if (matchChildIndex > -1) {

        const isDecisionTaken = req.body.isDecisionTaken !== '' ? YesOrNo.YES : YesOrNo.NO;
        req.session.settings.ListOfChild[matchChildIndex].childMatter = {
          isDecisionTaken,
        };

        const redirectUrl = C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY + `?childId=${childId}`;
        super.redirect(req, res, redirectUrl);
      } else {
        res.render('error');
      }
    } else {
      // eslint-disable-next-line no-self-assign
      req.session.settings.ListOfChild = req.session.settings.ListOfChild;
      const redirectURI = `parental-responsibility?childId=${req.session.settings.ListOfChild[0].id}`;
      super.redirect(req, res, redirectURI);
    }
  }
}
