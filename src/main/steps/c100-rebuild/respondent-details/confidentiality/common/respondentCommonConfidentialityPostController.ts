/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';

@autobind
export default class RespondentCommonConfidentialityController {
  private readonly parent;
  private request: AppRequest<AnyObject>;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
    this.request = {} as AppRequest<AnyObject>;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    this.request = req;
    const form = new Form(<FormFields>this.fields);
    const { onlycontinue, saveAndComeLater, ...formFields } = this.request.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    this.request.session.errors = form.getErrors(formData);

    if (this.request.session.errors.length) {
      return this.parent.redirect(this.request, res);
    }

    const respondentId = this.request.params.respondentId;
    const respondents = this.request.session.userCase.resp_Respondents ?? [];
    const existing = getPartyDetails(respondentId, respondents) as C100RebuildPartyDetails;

    if (!existing) {
      return this.parent.redirect(this.request, res);
    }

    const rawAddressConfidentialValue = (this.request.body['isRespondentAddressConfidential'] ??
      this.request.body['confidentiality'] ??
      this.request.body['startAlternative']) as string | undefined;

    const rawTelephoneNumberConfidentialValue = (this.request.body['isResponentTelephoneNumberConfidential'] ??
      this.request.body['confidentiality'] ??
      this.request.body['startAlternative']) as string | undefined;

    const rawEmailAddressConfidentialValue = (this.request.body['isRespondentEmailAddressConfidential'] ??
      this.request.body['confidentiality'] ??
      this.request.body['startAlternative']) as string | undefined;

    const finalAddressConfidentialValue = (rawAddressConfidentialValue as YesOrNo) ?? existing.isRespondentAddressConfidential ?? YesOrNo.NO;
    const finalTelephoneNumberConfidentialValue = (rawTelephoneNumberConfidentialValue as YesOrNo) ?? existing.isResponentTelephoneNumberConfidential ?? YesOrNo.NO;
    const finalEmailAddressConfidentialValue = (rawEmailAddressConfidentialValue as YesOrNo) ?? existing.isRespondentEmailAddressConfidential ?? YesOrNo.NO;

    const updatedRespondent: C100RebuildPartyDetails = {
      ...existing,
      isRespondentAddressConfidential: finalAddressConfidentialValue,
      isResponentTelephoneNumberConfidential: finalTelephoneNumberConfidentialValue,
      isRespondentEmailAddressConfidential: finalEmailAddressConfidentialValue,
    };

    this.request.session.userCase.resp_Respondents = updatePartyDetails(
      updatedRespondent,
      respondents
    ) as C100RebuildPartyDetails[];

    this.request.session.save(() => {
      this.parent.redirect(this.request, res);
    });
  }
}
