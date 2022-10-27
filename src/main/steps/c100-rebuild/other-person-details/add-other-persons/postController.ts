/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getDataShape } from '../util';

import { getFormFields } from './content';

@autobind
export default class AddOtherPersonsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { addOtherPerson, removeOtherPerson, onlycontinue, saveAndComeLater, ...formFields } = req.body;

    if (removeOtherPerson) {
      req.session.userCase.oprs_otherPersons = req.session.userCase.oprs_otherPersons?.filter(
        otherPerson => otherPerson.id !== removeOtherPerson
      );
      return super.redirect(req, res, req.originalUrl);
    }

    const form = new Form(getFormFields().fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { otherPersonFirstName, otherPersonLastName, ...rest } = formData;

    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      otherPersonFirstName,
      otherPersonLastName,
    };

    if (addOtherPerson) {
      if (otherPersonFirstName && otherPersonLastName) {
        Object.assign(req.session.userCase, { otherPersonFirstName: '', otherPersonLastName: '' });
        req.session.userCase.oprs_otherPersons = [
          ...(req.session.userCase?.oprs_otherPersons ?? []),
          {
            ...getDataShape(),
            firstName: otherPersonFirstName as string,
            lastName: otherPersonLastName as string,
          },
        ];
      } else {
        req.session.errors = form
          .getErrors(formData)
          .filter(error => ['otherPersonFirstName', 'otherPersonLastName'].includes(error.propertyName));
      }

      return super.redirect(req, res, req.originalUrl);
    } else if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      const otherPersonsDetailsErrors = req.session.errors.filter(
        error => !['otherPersonFirstName', 'otherPersonLastName'].includes(error.propertyName)
      );

      if (req.session.userCase?.oprs_otherPersons?.length) {
        //if there are already other persons added
        if (otherPersonsDetailsErrors.length) {
          //if there are errors present for added other persons, save the changes made on the input fields
          req.session.userCase.oprs_otherPersons = this.transformData(rest, req.session.userCase.oprs_otherPersons);
        } else {
          //if there are no errors present for added other persons, then save the details
          req.session.userCase.oprs_otherPersons = this.transformData(rest, req.session.userCase.oprs_otherPersons);
          if (otherPersonFirstName && otherPersonLastName) {
            // if first name & last name is fed for new other person, add the new entry to the session
            req.session.userCase.oprs_otherPersons.push({
              ...getDataShape(),
              firstName: otherPersonFirstName as string,
              lastName: otherPersonLastName as string,
            });
            Object.assign(req.session.userCase, { otherPersonFirstName: '', otherPersonLastName: '' });
          } else if (!otherPersonFirstName && !otherPersonLastName) {
            // if first name & last name is empty, remove errors from the session
            req.session.errors = [];
          }
        }
      } else {
        //if there are no other persons added
        if (otherPersonFirstName && otherPersonLastName) {
          req.session.userCase.oprs_otherPersons = [
            {
              ...getDataShape(),
              firstName: otherPersonFirstName as string,
              lastName: otherPersonLastName as string,
            },
          ];
          Object.assign(req.session.userCase, { otherPersonFirstName: '', otherPersonLastName: '' });
        }
      }

      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      const dataToSave = { oprs_otherPersons: [...this.transformData(rest, req.session.userCase.oprs_otherPersons)] };

      if (otherPersonFirstName && otherPersonLastName) {
        dataToSave.oprs_otherPersons.push({
          ...getDataShape(),
          firstName: otherPersonFirstName,
          lastName: otherPersonLastName,
        });
        Object.assign(req.session.userCase, { otherPersonFirstName: '', otherPersonLastName: '' });
      }

      super.saveAndComeLater(req, res, dataToSave);
    }
  }

  private transformData(formData, orginialData: C100RebuildPartyDetails[] = []): C100RebuildPartyDetails[] {
    return Object.entries(formData).reduce(
      (transformedData: C100RebuildPartyDetails[], [fieldName, value]) => {
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
