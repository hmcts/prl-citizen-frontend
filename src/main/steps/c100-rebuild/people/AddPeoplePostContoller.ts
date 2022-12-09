/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import {
  C100RebuildPartyDetails,
  ChildrenDetails,
  OtherChildrenDetails,
  PartyType,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getFormFields as getAddChildrenFormFields } from '../child-details/add-children/content';
import { getFormFields as getAddOtherChildrenFormFields } from '../child-details/other-children/names/content';
import { getFormFields as getAddOtherPersonFormFields } from '../other-person-details/add-other-persons/content';
import { getFormFields as getAddRespondentsFormFields } from '../respondent-details/add-respondents/content';

import { CaseWithId } from './../../../app/case/case';
import { getDataShape, transformAddPeople } from './util';

type ContextReference = {
  dataReference: string;
  context: PartyType;
  formRef: (caseData: Partial<CaseWithId>) => FormContent;
};
type FeatureContext = { [key: string]: ContextReference };

@autobind
export default class AddPersonPostController {
  private parent;
  private request: AppRequest<AnyObject>;
  private featureContext: FeatureContext;
  private contextReference: ContextReference;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
    this.request = {} as AppRequest<AnyObject>;
    this.featureContext = {
      cd: {
        dataReference: 'cd_children',
        context: PartyType.CHILDREN,
        formRef: getAddChildrenFormFields,
      },
      oc: {
        dataReference: 'ocd_otherChildren',
        context: PartyType.OTHER_CHILDREN,
        formRef: getAddOtherChildrenFormFields,
      },
      resp: {
        dataReference: 'resp_Respondents',
        context: PartyType.RESPONDENT,
        formRef: getAddRespondentsFormFields,
      },
      op: {
        dataReference: 'oprs_otherPersons',
        context: PartyType.OTHER_PERSON,
        formRef: getAddOtherPersonFormFields,
      },
    };
    this.contextReference = {} as ContextReference;
  }

  private addPerson(firstName, lastName) {
    Object.assign(this.request.session.userCase, { c100TempFirstName: '', c100TempLastName: '' });
    this.request.session.userCase[this.contextReference.dataReference] = [
      ...(this.request.session.userCase[this.contextReference.dataReference] ?? []),
      {
        ...(getDataShape(this.contextReference.context) as
          | ChildrenDetails
          | OtherChildrenDetails
          | C100RebuildPartyDetails),
        firstName,
        lastName,
      },
    ];
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { _ctx, add, remove: removePersonId, onlycontinue, saveAndComeLater, ...formFields } = req.body;

    this.request = req;
    this.contextReference = this.featureContext[_ctx as string];

    const { dataReference, context, formRef } = this.contextReference;

    req.session.errors = [];
    if (removePersonId) {
      req.session.userCase[dataReference] = req.session.userCase[dataReference]?.filter(
        person => person.id !== removePersonId
      );
      return this.parent.redirect(req, res, req.originalUrl);
    }

    const form = new Form(formRef(req.session.userCase).fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { c100TempFirstName, c100TempLastName, ...rest } = formData;

    req.session.userCase = {
      ...req.session.userCase,
      c100TempFirstName,
      c100TempLastName,
    };

    const fullName = c100TempFirstName && c100TempLastName;

    if (add) {
      if (fullName) {
        this.addPerson(c100TempFirstName, c100TempLastName);
      } else {
        req.session.errors = form
          .getErrors(formData)
          .filter(error => ['c100TempFirstName', 'c100TempLastName'].includes(error.propertyName));
      }

      return this.parent.redirect(req, res, req.originalUrl);
    } else if (onlycontinue) {
      req.session.userCase[dataReference] = transformAddPeople(context, rest, req.session.userCase[dataReference]);
      req.session.errors = form.getErrors(formData);

      if (!req.session.errors.length) {
        this.addPerson(c100TempFirstName, c100TempLastName);
      } else if (req.session.userCase[dataReference].length && !c100TempFirstName && !c100TempLastName) {
        req.session.errors = req.session.errors.filter(
          error => !['c100TempFirstName', 'c100TempLastName'].includes(error.propertyName)
        );
      }

      return this.parent.redirect(req, res);
    } else if (saveAndComeLater) {
      req.session.userCase[dataReference] = transformAddPeople(context, rest, req.session.userCase[dataReference]);

      if (fullName) {
        this.addPerson(c100TempFirstName, c100TempLastName);
      }

      this.parent.saveAndComeLater(req, res, req.session.userCase);
    }
  }
}
