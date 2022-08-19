/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_CHILDERN_DETAILS_ADD } from '../../../urls';

@autobind
export default class AddChilderns extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    // /c100-rebuild/child-details/addChild
    if (req.query.hasOwnProperty('action')) {
      const { action } = req.query;
      switch (action) {
        case 'addChild':
          //  const { firstname, lastname } = req['body'];
          // eslint-disable-next-line no-case-declarations
          const nextChildId = req.session.settings['ListOfChild'].length + 1;
          if (req['body']['firstname-' + nextChildId] === '' || req['body']['lastname-' + nextChildId] === '') {
            if (req['body']['firstname-' + nextChildId] === '' && req['body']['lastname-' + nextChildId] === '') {
              console.log('Inside If');
              req.session.errors = [{ propertyName: 'firstname-1', errorType: 'required' }];
              req.session.errors.push({
                propertyName: 'lastname-1',
                errorType: 'required',
              });
              super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
            } else if (req['body']['firstname-' + nextChildId] === '') {
              req.session.errors = [{ propertyName: 'firstname-1', errorType: 'required' }];
              super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
            } else if (req['body']['lastname-' + nextChildId] === '') {
              req.session.errors = [{ propertyName: 'lastname-1', errorType: 'required' }];
              super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
            }
          } else {
            for (const [key, value] of Object.entries(req['body'])) {
              if ((key.includes('firstname') || key.includes('lastname')) && key.includes('_cid')) {
                this.addChildCommonLogic(req, key, value, 'update');
              } else {
                this.addChildCommonLogic(req, key, value, 'add');
              }
            }
            super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
          }
          break;

        case 'removeChild':
          // eslint-disable-next-line no-case-declarations
          const { childId } = req.query;
          req.session.settings.ListOfChild = req.session.settings.ListOfChild.filter(child => child.id !== childId);
          super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
          break;

        case 'continue':
          // eslint-disable-next-line no-case-declarations
          const nextChildIdInContinue = req.session.settings['ListOfChild'].length + 1;
          if (
            req['body']['firstname-' + nextChildIdInContinue] !== '' ||
            req['body']['lastname-' + nextChildIdInContinue] !== ''
          ) {
            if (
              req['body']['firstname-' + nextChildIdInContinue] === '' &&
              req['body']['lastname-' + nextChildIdInContinue] === ''
            ) {
              console.log('Inside If');
              req.session.errors = [{ propertyName: 'firstname-1', errorType: 'required' }];
              req.session.errors.push({
                propertyName: 'lastname-1',
                errorType: 'required',
              });
              super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
            } else if (req['body']['firstname-' + nextChildIdInContinue] === '') {
              req.session.errors = [{ propertyName: 'firstname-1', errorType: 'required' }];
              super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
            } else if (req['body']['lastname-' + nextChildIdInContinue] === '') {
              req.session.errors = [{ propertyName: 'lastname-1', errorType: 'required' }];
              super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
            } else {
              this.updateInformationUsingContinueButton(req, res);
            }
          } else {
            this.updateInformationUsingContinueButton(req, res);
          }

          break;

        default:
          res.render('error');
      }
    } else {
      // eslint-disable-next-line no-self-assign
      req.session.settings.ListOfChild = req.session.settings.ListOfChild;
      const redirectURI = `personal-details?childId=${req.session.settings.ListOfChild[0].id}`;
      super.redirect(req, res, redirectURI);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public updateInformationUsingContinueButton(req: AppRequest, res: Response) {
    for (const [key, value] of Object.entries(req['body'])) {
      if ((key.includes('firstname') || key.includes('lastname')) && key.includes('_cid')) {
        this.addChildCommonLogic(req, key, value, 'update');
      } else {
        const index = key.split('-')[1];
        if (req['body']['firstname-' + index] !== '' && req['body']['lastname-' + index] !== '') {
          this.addChildCommonLogic(req, key, value, 'add');
        }
      }
    }
    // eslint-disable-next-line no-self-assign
    req.session.settings.ListOfChild = req.session.settings.ListOfChild;
    // eslint-disable-next-line no-case-declarations
    const redirectURI = `personal-details?childId=${req.session.settings.ListOfChild[0].id}`;
    super.redirect(req, res, redirectURI);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public addChildCommonLogic(req, key, value, type): any {
    const [childKey, childIndex] = key.split('-'); // ['firstname','0'

    const newChild = {
      ...req.session.settings.ListOfChild[Number(childIndex) - 1],
      firstname: value,
      id: uuidv4().toString(),
    };
    const updateChild = {
      ...req.session.settings.ListOfChild[Number(childIndex) - 1],
      firstname: value,
    };

    if (childKey === 'firstname') {
      req.session.settings.ListOfChild[Number(childIndex) - 1] = type === 'add' ? newChild : updateChild;
    } else if (childKey === 'lastname') {
      req.session.settings.ListOfChild[Number(childIndex) - 1] = {
        ...req.session.settings.ListOfChild[Number(childIndex) - 1],
        lastname: value,
      };
    }
  }
}
