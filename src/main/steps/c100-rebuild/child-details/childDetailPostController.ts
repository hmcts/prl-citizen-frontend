/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CaseWithId } from '../../../app/case/case';
import { ChildrenDetails, PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../people/util';

import { getFormFields as getChildMatters } from './child-matters/content';
import { getFormFields as getChildParentalResponsibility } from './parental-responsibility/content';
import { getFormFields as getChildPersonalDetails } from './personal-details/content';

type ContextReference = { formRef: (caseData: Partial<CaseWithId>, childId: ChildrenDetails['id'],language) => FormContent };
type FeatureContext = { [key: string]: ContextReference };
@autobind
export default class ChildDetailsPostController {
  private parent;
  private featureContext: FeatureContext;
  private contextReference: ContextReference;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
    this.featureContext = {
      pd: {
        formRef: getChildPersonalDetails,
      },
      pr: {
        formRef: getChildParentalResponsibility,
      },
      cm: {
        formRef: getChildMatters,
      },
    };
    this.contextReference = {} as ContextReference;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId;
    const { _ctx, onlycontinue, saveAndComeLater, ...formFields } = req.body;

    this.contextReference = this.featureContext[_ctx as string];
    const { formRef } = this.contextReference;
    let language=req.acceptsLanguages();
    const form = new Form(formRef(req.session.userCase, childId,language).fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    let data;

    if (_ctx === 'pd') {
      data = {
        personalDetails: transformPartyDetails(
          PartyType.CHILDREN,
          PartyDetailsVariant.PERSONAL_DETAILS,
          formData
        ) as ChildrenDetails['personalDetails'],
      };
    } else if (_ctx === 'pr') {
      data = {
        parentialResponsibility: transformPartyDetails(
          PartyType.CHILDREN,
          PartyDetailsVariant.PARENTAL_RESPONSIBILITY,
          formData
        ) as ChildrenDetails['parentialResponsibility'],
      };
    } else if (_ctx === 'cm') {
      data = {
        childMatters: transformPartyDetails(
          PartyType.CHILDREN,
          PartyDetailsVariant.CHILD_MATTERS,
          formData
        ) as ChildrenDetails['childMatters'],
      };
    }

    req.session.userCase.cd_children = updatePartyDetails(
      {
        ...getPartyDetails(childId, req.session.userCase.cd_children!),
        ...data,
      },
      req.session.userCase.cd_children
    ) as ChildrenDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.parent.redirect(req, res);
    } else if (saveAndComeLater) {
      this.parent.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    }
  }
}
