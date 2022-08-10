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
      console.log("action invoked: ", action);
      switch (action) {
        case 'addChild':
          // console.log('inside addchild', req);
          // // eslint-disable-next-line no-case-declarations
          // const { firstname, lastname } = req['body'];
          // // eslint-disable-next-line no-case-declarations
          // if (firstname === '' || lastname === '') {
          //   req.session.errors?.push({
          //     propertyName: 'string',
          //     errorType: 'string',
          //   });
          //   super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
          // } else {
          //   const childInformation = { id: uuidv4().toString(), firstname, lastname };
          //   req.session.settings.ListOfChild.push(childInformation);
          //   super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
          // }
          for (const [key, value] of Object.entries(req['body'])) {
            if ((key.includes('firstname') || key.includes('lastname')) && key.includes('_cid')) {
              let [childKey, childIndex] = key.split('-'); // ['firstname','0']

              if (childKey === 'firstname') {
                req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                  ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                  firstname: value,
                };
              } else if (childKey === 'lastname') {
                req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                  ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                  lastname: value,
                };
              }
            } else {
              let [childKey, childIndex] = key.split('-'); // ['firstname','0'

                if (childKey === 'firstname') {
                  req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                    ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                    firstname: value,
                    id:uuidv4().toString()
                  };
                } else {
                  req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                    ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                    lastname: value,
                  };
                }
            }
          }
          super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);

        case 'removeChild':
          // eslint-disable-next-line no-case-declarations
          const { childId } = req.query;
          console.log(childId,req.session.settings.ListOfChild)
          req.session.settings.ListOfChild = req.session.settings.ListOfChild.filter(child => child.id !== childId);
          super.redirect(req, res, C100_CHILDERN_DETAILS_ADD);
          break;

        case 'continue':
          for (const [key, value] of Object.entries(req['body'])) {
            if ((key.includes('firstname') || key.includes('lastname')) && key.includes('_cid')) {
              let [childKey, childIndex] = key.split('-'); // ['firstname','0']

              if (childKey === 'firstname') {
                req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                  ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                  firstname: value,
                };
              } else if (childKey === 'lastname') {
                req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                  ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                  lastname: value,
                };
              }
            } else {
              let [childKey, childIndex] = key.split('-'); // ['firstname','0'

                if (childKey === 'firstname') {
                  req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                    ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                    firstname: value,
                    id:uuidv4().toString()
                  };
                } else {
                  req.session.settings.ListOfChild[Number(childIndex) - 1] = {
                    ...req.session.settings.ListOfChild[Number(childIndex) - 1],
                    lastname: value,
                  };
                }
            }
          }

          req.session.settings.ListOfChild = req.session.settings.ListOfChild;
          console.log(req.session.settings.ListOfChild)
          const redirectURI = `personal-details?childId=${req.session.settings.ListOfChild[0].id}`;
          super.redirect(req, res, redirectURI);

        default:
          res.render('error');
      }
    } else {
      // eslint-disable-next-line no-self-assign
      console.log('inside else');
      req.session.settings.ListOfChild = req.session.settings.ListOfChild;
      const redirectURI = `personal-details?childId=${req.session.settings.ListOfChild[0].id}`;
      super.redirect(req, res, redirectURI);
    }
  }
}
