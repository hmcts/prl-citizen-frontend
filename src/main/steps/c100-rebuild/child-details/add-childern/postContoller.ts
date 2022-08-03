import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_CHILDERN_DETAILS_ADD } from '../../../urls';

@autobind
export default class SameAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.query.hasOwnProperty('action')) {
      const { action } = req.query;
      switch (action) {
        case 'addChild':
          // eslint-disable-next-line no-case-declarations
          const { firstname, lastname } = req['body'];
          // eslint-disable-next-line no-case-declarations
          const childInformation = { id: uuidv4().toString(), firstname, lastname };
          req.session.settings.ListOfChild.push(childInformation);
          super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
          break;

        case 'removeChild':
          // eslint-disable-next-line no-case-declarations
          const { childId } = req.query;
          req.session.settings.ListOfChild = req.session.settings.ListOfChild.filter(child => child.id !== childId);
          super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
          break;

        default:
          res.render('error');
      }
    } else {
      // eslint-disable-next-line no-self-assign
      req.session.settings.ListOfChild = req.session.settings.ListOfChild;
      super.redirect(req, res);
    }
  }
}
