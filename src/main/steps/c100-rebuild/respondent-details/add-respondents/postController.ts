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
export default class AddRespondentsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { addRespondent, removeRespondent, onlycontinue, saveAndComeLater, ...formFields } = req.body;

    if (removeRespondent) {
      req.session.userCase.resp_Respondents = req.session.userCase.resp_Respondents?.filter(
        respondent => respondent.id !== removeRespondent
      );
      return super.redirect(req, res, req.originalUrl);
    }

    const form = new Form(getFormFields().fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { c100TempFirstName, c100TempLastName, ...rest } = formData;

    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      c100TempFirstName,
      c100TempLastName,
    };

    if (addRespondent) {
      if (c100TempFirstName && c100TempLastName) {
        Object.assign(req.session.userCase, { c100TempFirstName: '', c100TempLastName: '' });
        req.session.userCase.resp_Respondents = [
          ...(req.session.userCase?.resp_Respondents ?? []),
          {
            ...getDataShape(),
            firstName: c100TempFirstName as string,
            lastName: c100TempLastName as string,
          },
        ];
      } else {
        req.session.errors = form
          .getErrors(formData)
          .filter(error => ['c100TempFirstName', 'c100TempLastName'].includes(error.propertyName));
      }

      return super.redirect(req, res, req.originalUrl);
    } else if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      const respondentDetailsErrors = req.session.errors.filter(
        error => !['c100TempFirstName', 'c100TempLastName'].includes(error.propertyName)
      );

      if (req.session.userCase?.resp_Respondents?.length) {
        //if there are already respondents added
        if (respondentDetailsErrors.length) {
          //if there are errors present for added respondents, save the changes made on the input fields
          req.session.userCase.resp_Respondents = this.transformData(rest, req.session.userCase.resp_Respondents);
        } else {
          //if there are no errors present for added respondents, then save the details
          req.session.userCase.resp_Respondents = this.transformData(rest, req.session.userCase.resp_Respondents);
          if (c100TempFirstName && c100TempLastName) {
            // if first name & last name is fed for new other respondent, add the new entry to the session
            req.session.userCase.resp_Respondents.push({
              ...getDataShape(),
              firstName: c100TempFirstName as string,
              lastName: c100TempLastName as string,
            });
            Object.assign(req.session.userCase, { c100TempFirstName: '', c100TempLastName: '' });
          } else if (!c100TempFirstName && !c100TempLastName) {
            // if first name & last name is empty, remove errors from the session
            req.session.errors = [];
          }
        }
      } else {
        //if there are no other respondents added
        if (c100TempFirstName && c100TempLastName) {
          req.session.userCase.resp_Respondents = [
            {
              ...getDataShape(),
              firstName: c100TempFirstName as string,
              lastName: c100TempLastName as string,
            },
          ];
          Object.assign(req.session.userCase, { c100TempFirstName: '', c100TempLastName: '' });
        }
      }

      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      const dataToSave = { resp_Respondents: [...this.transformData(rest, req.session.userCase.resp_Respondents)] };

      if (c100TempFirstName && c100TempLastName) {
        dataToSave.resp_Respondents.push({
          ...getDataShape(),
          firstName: c100TempFirstName,
          lastName: c100TempLastName,
        });
        Object.assign(req.session.userCase, { c100TempFirstName: '', c100TempLastName: '' });
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
