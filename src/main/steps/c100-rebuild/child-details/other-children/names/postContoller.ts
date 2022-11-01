/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { OtherChildrenDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getDataShape } from '../../util';

import { getFormFields } from './content';

@autobind
export default class AddChildrenPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { addChild, removeChild, onlycontinue, saveAndComeLater, ...formFields } = req.body;

    if (removeChild) {
      req.session.userCase.cd_otherChildren = req.session.userCase.cd_otherChildren?.filter(
        child => child.id !== removeChild
      );
      return super.redirect(req, res, req.originalUrl);
    }

    const form = new Form(getFormFields().fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { childFirstName, childLastName, ...rest } = formData;

    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      childFirstName,
      childLastName,
    };

    if (addChild) {
      if (childFirstName && childLastName) {
        Object.assign(req.session.userCase, { childFirstName: '', childLastName: '' });
        req.session.userCase.cd_otherChildren = [
          ...(req.session.userCase?.cd_otherChildren ?? []),
          {
            ...getDataShape(),
            firstName: childFirstName as string,
            lastName: childLastName as string,
          },
        ];
      } else {
        req.session.errors = form
          .getErrors(formData)
          .filter(error => ['childFirstName', 'childLastName'].includes(error.propertyName));
      }

      return super.redirect(req, res, req.originalUrl);
    } else if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      const childrenDetailsErrors = req.session.errors.filter(
        error => !['childFirstName', 'childLastName'].includes(error.propertyName)
      );

      if (req.session.userCase?.cd_otherChildren?.length) {
        //if there are already children added
        if (childrenDetailsErrors.length) {
          //if there are errors present for added children, save the changes made on the input fields
          req.session.userCase.cd_otherChildren = this.transformData(rest, req.session.userCase.cd_otherChildren);
        } else {
          //if there are no errors present for added children, then save the details
          req.session.userCase.cd_otherChildren = this.transformData(rest, req.session.userCase.cd_otherChildren);
          if (childFirstName && childLastName) {
            // if first name & last name is fed for new child, add the new entry to the session
            req.session.userCase.cd_otherChildren.push({
              ...getDataShape(),
              firstName: childFirstName as string,
              lastName: childLastName as string,
            });
            Object.assign(req.session.userCase, { childFirstName: '', childLastName: '' });
          } else if (!childFirstName && !childLastName) {
            // if first name & last name is empty, remove errors from the session
            req.session.errors = [];
          }
        }
      } else {
        //if there are no children added
        if (childFirstName && childLastName) {
          req.session.userCase.cd_otherChildren = [
            {
              ...getDataShape(),
              firstName: childFirstName as string,
              lastName: childLastName as string,
            },
          ];
          Object.assign(req.session.userCase, { childFirstName: '', childLastName: '' });
        }
      }

      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      const dataToSave = { cd_otherChildren: [...this.transformData(rest, req.session.userCase.cd_otherChildren)] };

      if (childFirstName && childLastName) {
        dataToSave.cd_otherChildren.push({
          ...getDataShape(),
          firstName: childFirstName,
          lastName: childLastName,
        });
        Object.assign(req.session.userCase, { childFirstName: '', childLastName: '' });
      }

      super.saveAndComeLater(req, res, dataToSave);
    }
  }

  private transformData(formData, orginialData: OtherChildrenDetails[] = []): OtherChildrenDetails[] {
    return Object.entries(formData).reduce(
      (transformedData: OtherChildrenDetails[], [fieldName, value]) => {
        const [fieldId, fieldIndex] = fieldName.split('-');
        const index = Number(fieldIndex) - 1;

        if (!transformedData[index]) {
          transformedData[index] = getDataShape();
        }

        if (fieldId in transformedData[index]) {
          transformedData[index][fieldId] = value;
        }

        return transformedData;
      },
      [...orginialData]
    );
  }
}
